// In the name of ALLAH!
// Mahdi Salehi

const UserSession = require("../model/user_session/schema");
const privateChatExist = require("../chat_handlers/privateChatExist");
const startNewChat = require("../chat_handlers/startNewChat");
const registerNewMessage = require("../chat_handlers/registerNewMessage");

async function insertMessage(otherUserId, content) {
  // Check whether a private chat already exists for the target receiver.
  // Ensure the privateChatExist function returns a promise (or wrap it with Promise.resolve if needed).
  const chatExists = await privateChatExist(parsedMessage.data.userId);

  // Assuming UserSession.findOne returns the sender’s session; adjust query as needed.
  const userSession = await UserSession.findOne({});
  const userId = userSession.userId;

  if (!chatExists) {
    // If no private chat exists, start a new one.
    await startNewChat(userId, parsedMessage.data.userId);
  }

  // Register (save) the new message.
  await registerNewMessage(userId, parsedMessage.data.userId, parsedMessage.data.content);
}


module.exports = insertMessage