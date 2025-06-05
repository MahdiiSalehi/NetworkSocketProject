// In the name of ALLAH!
// Mahdi Salehi

const mongoose = require("mongoose")

const messageSchema = new mongoose.Schema({
  chatId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Chats',
    required: true
  },
  senderId: {
    type: String,
    required: true
  },
  messageType: {
    type: String,
    enum: ['text', 'media'],
    required: true
  },
  content: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    enum: ['sent', 'read'],
    default: 'sent'
  }
});

module.exports = mongoose.model('Messages', messageSchema);
