// In the name of ALLAH!
// Mahdi Salehi

const sendMyInfoPeriodically = require("../find_users/sendMyInfo")
const receiveUserInfo = require("../find_users/receiveUserInfo")
const getIpAddress = require("../utils/getIpAddress")


let onlineUsers = []
let tmpOnlineUsers = []

sendMyInfoPeriodically(5000)
receiveUserInfo(data => {
  if ((data.ip != getIpAddress() && data.ip != "127.0.0.1")) {
    console.log("founded User: ", data.ip)

    let isExists = false

    tmpOnlineUsers.some(user => {
      if (user.userId == data.message.userId) {
        isExists = true
        return true
      }
    })

    if (!isExists) {
      tmpOnlineUsers.push({
        username: data.message.username,
        userId: data.message.userId,
        ip: data.ip,
      })
    }

  }
})

setInterval(() => {
  onlineUsers.splice(0, onlineUsers.length, ...tmpOnlineUsers);
  tmpOnlineUsers.length = 0;
}, 10000)



module.exports = onlineUsers