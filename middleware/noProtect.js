const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const User = require('./../models/userModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');

const noProtect = catchAsync(async (req, res, next) => {
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
    return next();
  }

   // 2) Verification token
   const decoded = await promisify(jwt.verify)(
    token,
    process.env.JWT_SECRET
  ).catch(err =>
    next()
  );
  if (!decoded) return next() ;
  console.log("1")

  // 3) Check if user still exists
  const currentUser = await User.findById(decoded.id);
  if (!currentUser) {
    return next();
  }

  // 4) Check if user changed password after the token was issued
  if (currentUser.changedPasswordAfter(decoded.iat)) {
    return next();
  }
  // GRANT ACCESS TO PROTECTED ROUTE
  req.user = currentUser;

  // res.locals.user = currentUser;
  next();
});
module.exports = noProtect;
