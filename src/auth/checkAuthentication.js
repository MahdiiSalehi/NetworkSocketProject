// In the name of ALLAH!
// Mahdi Salehi

const UserSession = require("../model//user_session/schema")

async function checkAuthentication() {
  let userExists = await UserSession.countDocuments({})
  
  return Boolean(userExists);
}


module.exports = checkAuthentication