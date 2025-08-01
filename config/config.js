// In the name of ALLAH!
// Mahdi Salehi

const fs = require("fs")

const Ports = {
  appRunPort: process.env.appRunPort ?? 5000,
  broadcastSendPort: process.env.broadcastSendPort ?? 5001,
  broadcastListenPort: process.env.broadcastListenPort ?? 5002,
  TCPSendPort: process.env.TCPSendPort ?? 5003,
  TCPListenPort: process.env.TCPListenPort ?? 5004,
}

const Routes = {
  signup: "/sign-up",
  dashboard: "/dashboard",
  userSession: "/user-session",
  chatMessages: "/chat-messages"
}

const mongodbURL = fs.readFileSync("mongodbURL.txt").toString()


module.exports = {
  Ports,
  Routes,
  mongodbURL
}