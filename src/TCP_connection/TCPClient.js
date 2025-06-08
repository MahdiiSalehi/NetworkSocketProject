// In the name of ALLAH!
// Mahdi Salehi

const net = require('net');
const { Ports } = require("../../config/config") 

class TCPClient {
  /**
   * Creates a new TCPClient instance.
   * @param {string} ip - The IP address of the server to connect to.
   */
  constructor(ip) {
    this.ip = ip;
    this.port = Ports.TCPSendPort;
    // Create a new TCP client socket.
    this.client = new net.Socket();
  }

  /**
   * Connects to the server.
   */
  connect() {
    this.client.connect(this.port, this.ip, () => {
      console.log(`Connected to server ${this.ip}:${this.port}`);
    });

    // Set up event handlers.
    this.client.on('data', data => this.handleData(data));
    this.client.on('close', () => this.handleClose());
    this.client.on('error', error => this.handleError(error));
  }

  /**
   * Handles incoming data from the server.
   * @param {Buffer} data - The received data.
   */
  handleData(data) {
    console.log(`Received from server: ${data.toString()}`);
  }

  /**
   * Handles the server closing the connection.
   */
  handleClose() {
    console.log('Connection closed by server.');
  }

  /**
   * Handles errors on the client socket.
   * @param {Error} error - The error that occurred.
   */
  handleError(error) {
    console.error('Client encountered an error:', error);
  }

  /**
   * Sends a message to the connected server.
   * @param {string|Object} message - The message to send. If not a string, it will be JSON-stringified.
   */
  sendMessage(message) {
    const messageString = typeof message === 'string' ? message : JSON.stringify(message);
    this.client.write(messageString);
  }

  /**
   * Closes the connection to the server.
   */
  disconnect() {
    this.client.end();
  }
}

module.exports = TCPClient;
