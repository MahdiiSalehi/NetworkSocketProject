// In the name of ALLAH!
// Mahdi Salehi

const ChatParticipant = require('../model/chat_participants/schema');

/**
 * Checks whether a private chat exists for the provided userId.
 *
 * @param {String} userId - The user ID to check.
 * @returns {Promise<Boolean>} - Returns true if at least one private chat exists for the user; otherwise false.
 */
async function privateChatExist(userId) {
  try {
    const participants = await ChatParticipant.find({ userId: userId }).populate({
      path: 'chatId',
      match: { chatType: 'private' }
    });

    const privateChats = participants.filter(participant => participant.chatId !== null);

    return privateChats.length > 0;
  } catch (error) {
    console.error("Error checking for private chat:", error);
    throw error;
  }
}


module.exports = privateChatExist