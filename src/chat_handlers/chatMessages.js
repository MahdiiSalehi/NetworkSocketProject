// In the name of ALLAH!
// Mahdi Salehi


const Chat = require("../model/chats/schema");                        // Chat model
const ChatParticipant = require("../model/chat_participants/schema");    // Chat participant model
const Message = require("../model/messages/schema");                    // Message model

async function getChatMessages(userId) {
  try {
    // 1. Find all chat participant records for the receiver,
    //    and populate the related chat document.
    const receiverChats = await ChatParticipant.find({ userId }).populate("chatId");

    // 2. Filter these to find a private chat.
    // For a chat to be considered a private chat between the two,
    let foundChat = null;
    for (const cp of receiverChats) {
      if (cp.chatId && cp.chatId.chatType === "private") {
        foundChat = cp.chatId;
        break;
      }
    }

    if (!foundChat) {
      console.error("No private chat exists between these users.");
      return []
    }

    // 3. Retrieve all messages for the found chat, sorted by creation time.
    // Here, we assume that messages are stored in the Messages collection.
    const messages = await Message.find({ chatId: foundChat._id }).sort({ createdAt: 1 });

    const mappedMessages = messages.map(message => ({
      userId: message.senderId,
      content: message.content
    }))

    return mappedMessages
  } catch (error) {
    console.error("Error retrieving chat messages:", error);
    return []
  }
}



module.exports = getChatMessages