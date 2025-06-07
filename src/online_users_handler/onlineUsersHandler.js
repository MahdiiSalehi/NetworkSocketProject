// In the name of ALLAH!
// Mahdi Salehi

const sendMyInfoPeriodically = require("../find_users/sendMyInfo")
const receiveUserInfo = require("../find_users/receiveUserInfo")
const getIpAddress = require("../utils/getIpAddress")


let onlineUsers = []
let tmpOnlineUsers = []

sendMyInfoPeriodically(5000)
receiveUserInfo(data => {
  if (data.ip != getIpAddress()) {
    console.log("founded User: ", data.ip)

    tmpOnlineUsers.push(data)
  }
})

setInterval(() => {
  onlineUsers = []

  tmpOnlineUsers.forEach(item => {
    onlineUsers.push({
      username: item.message.username,
      userId: item.message.userId,
      ip: item.ip,
    })
  })

  tmpOnlineUsers = []
}, 10000)



module.exports = onlineUsers