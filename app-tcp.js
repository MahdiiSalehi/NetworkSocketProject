// In the name of ALLAH!
// Mahdi Salehi

// tcp-server.js
const net = require('net');

const port = 5000
const targetPort = 5001

// Create a server instance
const server = net.createServer((socket) => {
  console.log('Client connected.');

  // When data is received from a client.
  socket.on('data', (data) => {
    console.log(`Received from client: ${data}`);
    // Echo the message back to the client.
    socket.write(`Server Echo: ${data}`);
  });

  // When the connection is closed.
  socket.on('end', () => {
    console.log('Client disconnected.');
  });

  // Handle any socket errors.
  socket.on('error', (err) => {
    console.error('Socket error:', err);
  });
});

// Handle server errors.
server.on('error', (err) => {
  console.error('Server error:', err);
});


// Listen on port 8124 (or any port you prefer)
// server.listen(port, () => {
//   console.log('TCP server is listening on port 8124.');
// });





////////////////////////////////////////


// Create a client connection to the server on port 8124.
const client = net.createConnection({ port: targetPort, host: "192.168.1.103" }, () => {
  console.log('Connected to server.');
  // Send data to the server.
  client.write('Hello from client!');
});

// When data is received from the server.
client.on('data', (data) => {
  console.log(`Received from server: ${data}`);
  // Optionally, close the client connection after receiving data.
  client.end();
});

// When the connection is closed.
client.on('end', () => {
  console.log('Disconnected from server.');
});

// Handle errors on the client.
client.on('error', (err) => {
  console.error('Client error:', err);
});
