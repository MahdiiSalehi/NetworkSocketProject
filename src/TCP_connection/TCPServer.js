// In the name of ALLAH!
// Mahdi Salehi

// TCPServer.js
const net = require('net');
const { EventEmitter } = require('stream');
const { TCPListenPort } = require("../../config/config"); 
const onlineUsers = require('../online_users_handler/onlineUsersHandler');
const insertMessage = require('../chat_handlers/insertMessage');

class TCPServer extends EventEmitter {
  constructor() {
    this.port = TCPListenPort;
    // Create the TCP server and bind the connection callback.
    this.server = net.createServer(this.handleConnection.bind(this));
  }

  /**
   * Handles new incoming connections.
   * @param {net.Socket} socket - The connected socket.
   */
  handleConnection(socket) { 
    console.log(`Client connected: ${socket.remoteAddress}:${socket.remotePort}`);

    // Listen for data, close, and error events on the socket.
    socket.on('data', data => this.handleData(socket, data));
    socket.on('close', () => this.handleClose(socket));
    socket.on('error', error => this.handleError(socket, error));
  }

  /**
   * Handles incoming data from a connected client.
   * @param {net.Socket} socket - The socket on which data is received.
   * @param {Buffer} data - The received data.
   */
  handleData(socket, data) {
    const received = data.toString();
    let parsedMessage

    try {
      parsedMessage = JSON.parse(received)
    } catch (err) {
      console.error("ERROR PARSING, ", err)
      return
    }

    parsedMessage.ip = socket.remoteAddress

    onlineUsers.some(user => {
      if (user.ip == parsedMessage.ip) {
        parsedMessage.otherUserId = user.userId
        return true
      }
    })

    if (!parsedMessage.otherUserId) {
      console.error(`User Not Found By UserID:{${parsedMessage.otherUserId}}!`)
      return
    }

    insertMessage(parsedMessage.otherUserId, parsedMessage.content)

    console.log(`Received from ${socket.remoteAddress}:${socket.remotePort}: ${received}`);
    // Echo the received data back to the client.
    // socket.write(`Echo: ${received}`);
    this.emit("data", parsedMessage)
  }

  /**
   * Handles the closing of a connection.
   * @param {net.Socket} socket - The socket that was closed.
   */
  handleClose(socket) {
    console.log(`Connection closed: ${socket.remoteAddress}:${socket.remotePort}`);
  }

  /**
   * Handles errors that occur on a socket.
   * @param {net.Socket} socket - The socket that encountered an error.
   * @param {Error} error - The error that occurred.
   */
  handleError(socket, error) {
    console.error(`Error on ${socket.remoteAddress}:${socket.remotePort}:`, error);
  }

  /**
   * Starts the TCP server and begins listening on the specified port.
   */
  listen() {
    this.server.listen(this.port, () => {
      console.log(`TCP server listening on port ${this.port}`);
    });

    // Listen for server-level errors.
    this.server.on('error', error => {
      console.error(`Server error: ${error}`);
    });
  }
}

module.exports = TCPServer;
