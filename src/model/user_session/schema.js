// In the name of ALLAH!
// Mahdi Salehi

const mongoose = require("mongoose")
const { v4: uuidv4 } = require("uuid")

const userSessionSchema = new mongoose.Schema({
  userId: {
    type: String,
    unique: true,
    default: uuidv4
  },

  userData: {
    username: { type: String }
  },

  loginTime: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model("UserSession", userSessionSchema)