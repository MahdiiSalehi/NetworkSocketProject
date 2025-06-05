// In the name of ALLAH!
// Mahdi Salehi

const Chat = require('../model/chats/schema'); // Chats model
const ChatParticipant = require('../model/chat_participants/schema'); // ChatParticipants model
const Message = require('../model/messages/schema'); // Messages model

/**
 * Registers a new message in an existing private chat between the sender and receiver.
 *
 * @param {String} senderId - The user ID of the sender.
 * @param {String} receiverId - The user ID of the receiver.
 * @param {String} messageType - The type of message ('text' or 'media').
 * @param {String} content - The message content.
 * @returns {Promise<Object>} - Returns the created message document.
 * @throws {Error} - Throws an error if no private chat is found.
 */
async function registerNewMessage(senderId, receiverId, content) {
  try {
    const senderChats = await ChatParticipant.find({ userId: senderId });
    
    let privateChatId = null;

    for (const participant of senderChats) {
      const receiverParticipant = await ChatParticipant.findOne({
        chatId: participant.chatId,
        userId: receiverId
      });
      
      if (receiverParticipant) {
        const chatRecord = await Chat.findById(participant.chatId);
        if (chatRecord && chatRecord.chatType === 'private') {
          privateChatId = chatRecord._id;
          break;
        }
      }
    }

    if (!privateChatId) {
      throw new Error('No private chat exists between these two users.');
    }

    const newMessage = await Message.create({
      chatId: privateChatId,
      senderId,
      content
    });

    console.log('New message registered successfully:', newMessage);
    return newMessage;
  } catch (error) {
    console.error('Error registering new message:', error);
    throw error;
  }
}


module.exports = registerNewMessage