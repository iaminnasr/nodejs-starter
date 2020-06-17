// const MIME_TYPE_MAP = {
//     'image/png': 'png',
//     'image/jpeg': 'jpeg',
//     'image/jpg': 'jpg'
//   };
const uuid = require('uuid/v4');
const multer = require('multer');
const AppError = require('./../utils/appError');
const fs = require('fs');
module.exports = upload = ({ folderName, mime_type, resize } = options) => {
  const dir = `upload/${folderName}`;
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }
  return multer({
    storage: resize
      ? multer.memoryStorage()
      : multer.diskStorage({
          destination: (req, file, cb) => {
          
            cb(null, dir);
          },
          filename: (req, file, cb) => {
            const ext = file.mimetype.split('/')[1];
            cb(null, `${uuid()}.${ext}`);
          }
        }),
    fileFilter: (req, file, cb) => {
      if (!mime_type) return cb(null, true);
      const isValid = !!mime_type[file.mimetype];
      let error = isValid ? null : new AppError('Invalid file type!',400);
      cb(error, isValid);
    }
  }).single('image');
};
