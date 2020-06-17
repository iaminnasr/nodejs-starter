const express = require('express');

const uploadController = require('./../controllers/uploadController');
const multerConfig = require('../middleware/multerConfigMiddleware');
const resize = require('../middleware/resizePicture');
const router = express.Router();

router.post(
  '/productCover',
  multerConfig({ folderName: 'product', resize: true }),
  resize({
    folderName: 'product',
    format: 'jpg',
    size: [
      { width: 250, height: 400 },
      { width: 200, height: 190 },
    ]
  }),
  uploadController.uploadSingle
);

router.post(
  '/productPictures',
  multerConfig({ folderName: 'product', resize: true }),
  resize({
    folderName: 'product',
    format: 'jpg',
    size: [
      { width: 110, height: 110 },
      { width: 700, height: 700 },
    ]
  }),
  uploadController.uploadSingle
);

router.post(
  '/profile',
  multerConfig({ folderName: 'abc', resize: false }),
  uploadController.uploadSingle
);

router.post(
  '/storelogo',
  multerConfig({ folderName: 'storeLogo', resize: true }),
  resize({
    folderName: 'storeLogo',
    format: 'jpg',
    width: 110,
    height: 110
  }),
  uploadController.uploadSingle
);
module.exports = router;

// const MIME_TYPE_MAP = {
//     'image/png': 'png',
//     'image/jpeg': 'jpeg',
//     'image/jpg': 'jpg'
//   };
