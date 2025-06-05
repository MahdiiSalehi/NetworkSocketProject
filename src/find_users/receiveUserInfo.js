// In the name of ALLAH!
// Mahdi Salehi

const { BroadcastReceiver } = require("../broadcast_handlers/broadcastHandlers")


const receiver = new BroadcastReceiver()

function receiveUserInfo(fncallback) {
  receiver.on("data", fncallback)
}


module.exports = receiveUserInfo