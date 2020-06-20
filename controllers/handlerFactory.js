const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const APIFeatures = require('./../utils/apiFeatures');
const Version = require('../models/versionModel');

exports.createOne = (Model, versionName) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.create(req.body);
    if (versionName) {
      let generateNumber = Math.floor(Math.random() * 90000) + 10000;
      let newVersion = await Version.findOne({});
      if (!newVersion) {
        return await Version.create({ [versionName]: generateNumber });
      }
      await newVersion.updateOne({ [versionName]: generateNumber });
    }
    res.status(201).json({
      status: 'success',
      data: {
        result: doc
      }
    });
  });
exports.updateOne = (Model, versionName) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    if (!doc) {
      return next(new AppError('No document found with that ID', 404));
    }
    if (versionName) {
      let generateNumber = Math.floor(Math.random() * 90000) + 10000;
      let newVersion = await Version.findOne({});
      console.log(newVersion);
      if (!newVersion) {
        return await Version.create({ [versionName]: generateNumber });
      }
      await newVersion.updateOne({ [versionName]: generateNumber });
    }
    res.status(200).json({
      status: 'success',
      data: {
        result: doc
      }
    });
  });

exports.deleteOne = (Model, versionName) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndDelete(req.params.id);

    if (!doc) {
      return next(new AppError('No document found with that ID', 404));
    }
    if (versionName) {
      let generateNumber = Math.floor(Math.random() * 90000) + 10000;
      let newVersion = await Version.findOne({});
      console.log(newVersion);
      if (!newVersion) {
        return await Version.create({ [versionName]: generateNumber });
      }
      await newVersion.updateOne({ [versionName]: generateNumber });
    }
    res.status(204).json({
      status: 'success',
      data: null
    });
  });

exports.getOne = (Model, popOptions) =>
  catchAsync(async (req, res, next) => {
    let query = Model.findById(req.params.id);
    if (popOptions) query = query.populate(popOptions);
    const doc = await query;

    if (!doc) {
      return next(new AppError('No document found with that ID', 404));
    }

    res.status(200).json({
      status: 'success',
      data: {
        result: doc
      }
    });
  });

exports.getAll = Model =>
  catchAsync(async (req, res, next) => {
    // console.log(req.query)
    const features = new APIFeatures(Model.find(), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();
    // const doc = await features.query.explain();
    const doc = await features.query;
    const totalCount = await Model.countDocuments(doc);

    // SEND RESPONSE
    res.status(200).json({
      status: 'success',
      results: doc.length,
      totalCount,
      // data: {
      result: doc
      // }
    });
  });

exports.uploadSingle = catchAsync(async (req, res, next) => {
  console.log(req.file);
  res.status(201).json({
    message: 'با موفقیت اپلود شد',
    path: req.file.path
  });
});

exports.uniqueValidate = (Model, popOptions) =>
  catchAsync(async (req, res, next) => {
    console.log(req.query)
    if (!req.query) {
      return next(new AppError('لطفا آیتم را وارد کنید', 400));
    }
    let query = Model.findOne(req.query);
    let doc = await query;

    if (doc) {
      /* -------------------------------- مجاز نیست ------------------------------- */
      doc = false;
    } else {
      /* -------------------------------- مجاز هست -------------------------------- */
      doc = true;
    }

    res.status(200).json({
      status: 'success',
      data: {
        result: doc
      }
    });
  });
