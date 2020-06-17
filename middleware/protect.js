const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const User = require('./../models/userModel');
const UserLog = require('../models/userLog');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');

const protect = catchAsync(async (req, res, next) => {
  // 1) Getting token and check of it's there
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  } else if (req.cookies.token) {
    token = req.cookies.token;
  }

  if (!token || token=="undefined") {
    return next(
      new AppError('You are not logged in! Please log in to get access.', 401)
    );
  }

  // 2) Verification token
  const decoded = await promisify(jwt.verify)(
    token,
    process.env.JWT_SECRET
  ).catch(err =>
    next(
      new AppError('You are not logged in! Please log in to get access.', 401)
    )
  );
  if (!decoded) return ;
  // 3) Check if user still exists
  const currentUser = await User.findById(decoded.id);
  if (!currentUser) {
    return next(
      new AppError(
        'The user belonging to this token does no longer exist.',
        401
      )
    );
  }
  // 4) Check if user changed password after the token was issued
  if (currentUser.changedPasswordAfter(decoded.iat)) {
    return next(
      new AppError('User recently changed password! Please log in again.', 401)
    );
  }
  // GRANT ACCESS TO PROTECTED ROUTE
  req.user = currentUser;

  /* ------------------------------ for user Log ------------------------------ */
  await UserLog.create({
    name: currentUser.name,
    email: currentUser.email,
    photo: currentUser.photo,
    role: currentUser.role,
    request: {
      requestBody: req.body,
      originalUrl: req.originalUrl,
      method: req.method
    }
  });
  // res.locals.user = currentUser;
  next();
});
module.exports = protect;
