// In the name of ALLAH!
// Mahdi Salehi

const http = require("http")
const { broadcastIp } = require("./utils/findBroadcastIp")


const port = process.env.PORT ?? 5000

function sendMessage(message) {
  let targetPort = (port == 5000)? 5001 : 5000

  fetch(`http://${broadcastIp}:${targetPort}/reciveMessage`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    }, body: message,
  })
}

const server = http.createServer((req, res) => {
  switch(req.url) {
    case '/sendMessage':
      sendMessage("Message from port " + port)
      break

    case '/reciveMessage':
      let body = ''

      req.on("data", chunk => {
        body += chunk
      })

      req.on("end", () => {
        console.log(body)
      })

      res.end()
      break

    default:
      res.write(`This server running on port ${port}`)
      res.end()
  }
})

server.on("connection", () => {
  console.log("Connecting...")
})

server.on("listening", () => {
  console.log(`Listening on port ${port}...`)
})


server.listen(port)