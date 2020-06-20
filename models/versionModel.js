const mongoose = require('mongoose');

const versionSchema = new mongoose.Schema({
  category: {
    type: Number,
    default: 11111
  },
  attribute: {
    type: Number,
    default: 11111
  },
  attributeItem: {
    type: Number,
    default: 11111
  },
  province: {
    type: Number,
    default: 11111
  },
  color: {
    type: Number,
    default: 11111
  },
  brand:{
    type:Number,
    default:11111
  }
});

const Version = mongoose.model('Version', versionSchema);

module.exports = Version;
