const fs = require('fs');
const uuid = require('uuid/v4');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

module.exports = resizeMiddleware = options =>
  catchAsync(async (req, res, next) => {
    const { fileName, folderName, format, size } = options;
    if (!req.file) return next();

    let arr = [];
    let uid=uuid()
    req.file.path = arr[0];
    next();
  });
