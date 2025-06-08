// // In the name of ALLAH!
// // Mahdi Salehi

const { BroadcastSender } = require("../broadcast_handlers/broadcastHandlers");
const getIpAddress = require("../utils/getIpAddress")
const UserSession = require("../model/user_session/schema")
const { publicKey } = require("../cryption/cryption")

const sender = new BroadcastSender()
let ipAddress = getIpAddress()
let userInfo = {};

(async function() {
  const userSession = await UserSession.findOne({})

  if (!userSession) {
    console.log("Any User Not Registered")
    return
  }

  userInfo = {
    username: userSession.userData.username,
    userId: userSession.userId,
    // ipAddress,
    publicKey
  }
})()

function sendMyInfoPeriodically(timeout) {
  setInterval(() => {
    sender.send(userInfo)
  }, timeout)
}


module.exports = sendMyInfoPeriodically