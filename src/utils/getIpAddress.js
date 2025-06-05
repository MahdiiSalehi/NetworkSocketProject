// In the name of ALLAH!
// Mahdi Salehi

const os = require('os');

const interfaces = os.networkInterfaces();

function getIpAddress() {
  let ipAdress = ''

  Object.keys(interfaces).some((ifaceName) => {
    interfaces[ifaceName].some((iface) => {
      if (ifaceName == "WiFi" && iface.family === 'IPv4' && !iface.internal) {
        ipAdress = iface.address
        return 1
      }
    });

    return ipAdress
  });

  return ipAdress
}

module.exports = getIpAddress