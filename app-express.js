// In the name of ALLAH!
// Mahdi Salehi

const express = require("express")

const { broadcastIp } = require("./utils/findBroadcastIp")
const { defaultPort } = require("./src/config/config")


const app = express()

app.use(express.json())








const dgram = require('dgram');
const client = dgram.createSocket('udp4');


client.bind(() => {
  let targetPort = (port == defaultPort)? 5001 : defaultPort

  client.setBroadcast(true);

  const message = Buffer.from('Hello, broadcast message!');
  client.send(message, 0, message.length, targetPort, broadcastIp, (err) => {
    if (err) {
      console.error('Error sending broadcast:', err);
    } else {
      console.log('Broadcast message sent!');
    }
    client.close();
  });
});










function sendMessage(message) {
  let targetPort = (port == defaultPort)? 5001 : defaultPort

  fetch(`http://${broadcastIp}:${targetPort}/reciveMessage`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    }, body: JSON.stringify({ message }),
  })
}

app.get('/', (req, res) => {
  res.send("Hello WOrld!")
})


app.post('/reciveMessage', (req, res) => {
  const { message } = req.body

  console.log("Reciving... :", message)

  res.send({ message })
})


app.post("/sendMessage", (req, res) => {
  const { message } = req.body

  console.log("Sending... :", message)

  sendMessage(message)

  res.send({ message })
})


const port = process.env.PORT ?? defaultPort
app.listen(port)