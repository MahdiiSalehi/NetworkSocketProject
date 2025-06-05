// In the name of ALLAH!
// Mahdi Salehi

const path = require("path")
const express = require("express")
const mongoose = require("mongoose")
const WebSocket = require("ws")

const { Ports, Routes } = require("./config/config")
const checkAuthentication = require("./src/auth/checkAuthentication")
const signup = require("./src/auth/sign-up")

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


app.use((req, res) => {
  res.status(404).sendFile("404.html", { root: viewsPath })
})


const port = process.env.PORT ?? Ports.appRunPort
const server = app.listen(port)

const wsServer = new WebSocket.Server({ server })

wsServer.on("connection", ws => {
  console.log("websocket Connected!")

  ws.on("message", message => {
    console.log("New Message:", message.toString())

    ws.send(`Received Message: ${message}`)
  })

  ws.on('close', () => {
    console.log("یک کلاینت قطع اتصال کرد")
  })

  ws.on('error', (err) => {
    console.error("خطای وب‌سوکت:", err)
  })
})