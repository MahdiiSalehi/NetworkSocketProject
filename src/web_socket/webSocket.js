// In the name of ALLAH!
// Mahdi Salehi

const WebSocket = require("ws");

const TCPClient = require("../TCP_connection/TCPClient");
const onlineUsers = require("../online_users_handler/onlineUsersHandler");
const insertMessage = require("../chat_handlers/insertMessage");

class MyWebSocket {
  constructor(server) {
    this.wsServer = new WebSocket.Server({ server });

    // Bind the messageReceiveHandler to ensure correct `this` context.
    this.messageReceiveHandler = this.messageReceiveHandler.bind(this);

    this.wsServer.on("connection", (ws) => {
      console.log("WebSocket connected!");

      // Use the bound handler for all incoming messages.
      ws.on("message", this.messageReceiveHandler);

      ws.on("close", () => {
        console.log("یک کلاینت قطع اتصال کرد");
      });

      ws.on("error", (err) => {
        console.error("خطای وب‌سوکت:", err);
      });

      // Attach a helper method for sending JSON data over this connection.
      this.send = (data) => {
        if (ws.readyState === WebSocket.OPEN) {
          ws.send(JSON.stringify(data));
        }
      };
    });
  }

  async messageReceiveHandler(message) {
    let parsedMessage;
    try {
      parsedMessage = JSON.parse(message.toString());
    } catch (err) {
      console.error("Error parsing received data:", err);
      return;
    }

    if (!parsedMessage.action) {
      console.warn("No action specified in the message:", parsedMessage);
      return;
    }

    try {
      switch (parsedMessage.action) {
        case "sendMessage": {
          insertMessage(parsedMessage.data.userId, parsedMessage.data.content)

          // Optionally, send confirmation back to the caller, or forward message to receiver via TCP, etc.
          let targetIp
          onlineUsers.some(user => {
            if (user.userId == parsedMessage.data.userId) {
              targetIp = user.ip
              return true
            }
          })

          if (!targetIp) {
            return
          }

          const TCPMessage = {
            content: parsedMessage.data.content
          }

          const client = new TCPClient(targetIp)
          client.connect()
          client.sendMessage(TCPMessage)
          client.disconnect()

          break;
        }
        default:
          console.warn("Undefined command:", parsedMessage);
      }
    } catch (error) {
      console.error("Error processing message:", error);
    }
  }
}

module.exports = MyWebSocket;
