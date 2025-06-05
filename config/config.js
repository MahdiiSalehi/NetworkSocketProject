// In the name of ALLAH!
// Mahdi Salehi

const Ports = {
  appRunPort: process.env.appRunPort ?? 5000,
  broadcastSenderPort: process.env.broadcastSenderPort ?? 5001,
  broadcastListenPort: process.env.broadcastListenPort ?? 5002
}

const Routes = {
  signup: "/sign-up",
  dashboard: "/dashboard",
  userSession: "/user-session"
}


module.exports = {
  Ports,
  Routes
}