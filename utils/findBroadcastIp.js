// In the name of ALLAH!
// Mahdi Salehi

const os = require('os');

const interfaces = os.networkInterfaces();

let broadcastIp = ''

// Function to calculate the broadcast address from IP and netmask
function calculateBroadcastAddress(ip, netmask) {
  const ipParts = ip.split('.').map(Number);
  const maskParts = netmask.split('.').map(Number);
  const broadcastParts = ipParts.map((part, i) => {
    return (part) | (~maskParts[i] & 0xFF);
  });
  return broadcastParts.join('.');
}

Object.keys(interfaces).forEach((ifaceName) => {
  interfaces[ifaceName].forEach((iface) => {
    // Only consider non-internal IPv4 addresses
    if (iface.family === 'IPv4' && !iface.internal) {
      const ip = iface.address;
      const netmask = iface.netmask;

      broadcastIp = calculateBroadcastAddress(ip, netmask);

      // console.log(`Interface: ${ifaceName}`);
      // console.log(`IP Address: ${ip}`);
      // console.log(`Netmask: ${netmask}`);
      // console.log(`Broadcast Address: ${broadcastIp}`);
      // console.log('---------------------------');
    }
  });
});


module.exports = { broadcastIp }