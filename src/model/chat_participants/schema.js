// In the name of ALLAH!
// Mahdi Salehi

const mongoose = require("mongoose")

const chatParticipantSchema = new mongoose.Schema({
  chatId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Chats',
    required: true
  },
  userId: {
    type: String,
    required: true
  },
  joinedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('ChatParticipants', chatParticipantSchema);
