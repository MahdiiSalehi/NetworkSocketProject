// In the name of ALLAH!
// Mahdi Salehi

const mongoose = require("mongoose")

const chatSchema = new mongoose.Schema({
  chatType: {
    type: String,
    enum: ['private', 'group'],
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  createdBy: {
    type: String, // معمولاً شناسه کاربری که از UserSession گرفته شده است
    required: true
  }
});

module.exports = mongoose.model('Chats', chatSchema);