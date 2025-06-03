// In the name of ALLAH!
// Mahdi Salehi

const UserSession = require("../model/user_session/schema")

async function signup(username) {
  try {
    const newUser = new UserSession({ userData: { username } })
    await newUser.save()
    return { newUser }
  } catch (err) {
    return { err }
  }
}


module.exports = signup