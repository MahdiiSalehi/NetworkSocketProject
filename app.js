// In the name of ALLAH!
// Mahdi Salehi

const path = require("path")
const express = require("express")
const mongoose = require("mongoose")


const { Ports, Routes } = require("./config/config")
const checkAuthentication = require("./src/auth/checkAuthentication")
const signup = require("./src/auth/sign-up")
const UserSession = require("./src/model/user_session/schema")

const MyWebSocket = require("./src/web_socket/webSocket")
const onlineUsers = require("./src/online_users_handler/onlineUsersHandler")
const TCPServer = require("./src/TCP_connection/TCPServer")

mongoose.connect("mongodb://localhost:27017/")

const app = express()

app.use(express.json())
app.use(express.static("views/style")) // css files
app.use(express.static("views/script")) // js files

const viewsPath = path.join(__dirname, "views/html");


app.use(async (req, res, next) => {
  if (await checkAuthentication() || req.url == Routes.signup) {
    next()
  } else {
    res.status(302).redirect(Routes.signup)
  }
})

app.get("/", (req, res) => {
  res.status(302).redirect(Routes.dashboard)
})


app.get(Routes.signup, async (req, res) => {
  if (await checkAuthentication()) {
    res.redirect(Routes.dashboard)
  } else {
    res.sendFile("sign-up.html", { root: viewsPath })
  }
})

app.post(Routes.signup, async (req, res) => {
  const response = {
    redirectUrl: Routes.dashboard
  }

  if (!await checkAuthentication()) {
    const { username } = req.body
    const result = await signup(username)

    if (result.err) {
      response.success = false
      response.err = "مشکل در ثبت کاربر!"
    } else {
      response.success = true
    }

  } else {
    response.success = false
    response.err = "کاربری از قبل موجود است!"
  }

  res.send(response)
})

app.get(Routes.dashboard, (req, res) => {
  res.sendFile("dashboard.html", { root: viewsPath })
})

app.get(Routes.userSession, async (req, res) => {
  const data = (await UserSession.findOne({})).userData
  res.send(data)
})


app.use((req, res) => {
  res.status(404).sendFile("404.html", { root: viewsPath })
})


const port = Ports.appRunPort
const server = app.listen(port)

const ws = new MyWebSocket(server)
const TCPServerInstance = new TCPServer()
TCPServerInstance.listen()

/*
{
  action: {
    get: [sendMessage],
    send: [receivedMessage, onlineUsers]
  },
  data: data
}
*/

setInterval(() => {
  if (ws.send) {
    ws.send({
      action: "onlineUsers",
      data: onlineUsers
    })
  }
}, 10000)

TCPServerInstance.addListener("data", message => {
  if (ws.send) {
    ws.send({
      action: "receivedMessage",
      data: {
        userId: message.otherUserId,
        content: message.data.content,
      },
    })
  }
})