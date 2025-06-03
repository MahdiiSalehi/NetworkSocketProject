// In the name of ALLAH!
// Mahdi Salehi

const mongoose = require("mongoose")

const userSessionSchema = new mongoose.Schema({
  userData: {
    username: { type: String }
  },

  loginTime: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model("UserSession", userSessionSchema)