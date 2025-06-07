// In the name of ALLAH!
// Mahdi Salehi

const Chat = require('../model/chats/schema'); // Adjust the path as needed
const ChatParticipant = require('../model/chat_participants/schema');

/**
 * Registers a new private chat between two users.
 *
 * @param {String} userId1 - The ID of the first user (e.g., the chat creator).
 * @param {String} userId2 - The ID of the second user.
 * @returns {Promise<Object>} The newly created chat document.
 */
async function startNewChat(userId1, userId2) {
  try {
    const newChat = await Chat.create({
      chatType: 'private',
      createdBy: userId1
    });

    const newChatParticipant = await ChatParticipant.create([
      {
        chatId: newChat._id,
        userId: userId1
      },
      {
        chatId: newChat._id,
        userId: userId2
      }
    ]);

    console.log('New chat successfully registered:', newChat);
    console.log('New chat Participant successfully registered:', newChatParticipant);
    return newChat;
  } catch (error) {
    console.error('Error registering new chat:', error);
    throw error;
  }
}


module.exports = startNewChat