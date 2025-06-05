// In the name of ALLAH!
// Mahdi Salehi

const WebSocket = require("ws")


class MyWebSocket {
  constructor(server) {
    this.wsServer = new WebSocket.Server({ server })

    this.wsServer.on("connection", ws => {
      console.log("websocket Connected!")

      ws.on("message", async message => {
        let response

        try {
          response = JSON.parse(message.toString())
        } catch (err) {
          console.log("Error Parsing Received Data:", err)
          return
        }

        switch (response.action) {
          case "sendMessage":
            let chatExists = privateChatExist(response.data.userId)
            const userSession = await UserSession.findOne({})
            const userId = userSession.userId

            if (!chatExists) {
              startNewChat(userId, response.data.userId)
            }

            registerNewMessage(userId, response.data.userId, response.data.content)

            // send it over TCP to receiver
            break
          
          default:
            console.log("Undefined Command!, ", response)
        }
      })

      ws.on('close', () => {
        console.log("یک کلاینت قطع اتصال کرد")
      })

      ws.on('error', (err) => {
        console.error("خطای وب‌سوکت:", err)
      })

      this.send = (data) => {
        if (ws.readyState == ws.OPEN) {
          ws.send(JSON.stringify(data))
        }
      }
    })
  }
}


module.exports = MyWebSocket