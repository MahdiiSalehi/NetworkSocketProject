// In the name of ALLAH!
// Mahdi Salehi

const mongoose = require("mongoose")

const mediaSchema = new mongoose.Schema({
  messageId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Messages',
    required: true
  },
  mediaType: {
    type: String,
    enum: ['image', 'video', 'audio', 'file'],
    required: true
  },
  fileAddress: {
    type: String,
    required: true
  },
  thumbnailAddress: {
    type: String  // در صورت وجود تصویر بند انگشتی یا پیشنمایش
  },
  uploadedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Media', mediaSchema);
