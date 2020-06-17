const mongoose = require('mongoose');

const userLogSchema = new mongoose.Schema({
  name: {
    type: String
  },
  email: {
    type: String
  },
  photo: {
    type: String,
    default: 'default.jpg'
  },
  requestedAt: { type: Date, default: Date.now() },
  role: {
    type: String,
    // enum: ['user', 'guide', 'lead-guide', 'Admin',"seller"],
    default: 'user'
  },
  request: Object,
  createdAt: {
    type: Date,
    default: Date.now(),
    select: false
  },
});

const UserLog = mongoose.model('UserLog', userLogSchema);
module.exports = UserLog;
