// In the name of ALLAH!
// Mahdi Salehi

const dgram = require('dgram');
const { EventEmitter } = require('stream');

const { Ports } = require('../../config/config');



class BroadcastSender extends EventEmitter {
  constructor() {
    super()

    this.BROADCAST_ADDR = '255.255.255.255';
    this.PORT_TO_RUN = Ports.broadcastSenderPort;
    this.PORT_TO_SEND = Ports.broadcastListenPort;

    this.sender = dgram.createSocket('udp4');

    this.sender.bind(this.PORT_TO_RUN)
  }

  error(err) {
    this.emit("error", err)
    this.close()
  }

  close() {
    this.sender.close()
  }

  send(data) {
    this.sender.setBroadcast(true)
    let stringifiedMessage
    
    try {
      stringifiedMessage = Buffer.from(JSON.stringify(data), 'utf8');
    } catch (err) {
      this.error(err)
      return
    }

    this.sender.send(stringifiedMessage, this.PORT_TO_SEND, this.BROADCAST_ADDR, err => {
      if (err) {
        this.error(err)
      }
    })
  }
}


class BroadcastReceiver extends EventEmitter {
  constructor() {
    super()

    this.receiver = dgram.createSocket('udp4')
    this.PORT_LISTEN = Ports.broadcastListenPort

    this.receiver.on("message", (msg, rinfo) => {
      let parsedMessage

      try {
        parsedMessage = JSON.parse(msg.toString())
      } catch (err) { 
        this.error(err)
        return  
      }

      const data = {
        ip: rinfo.address,
        message: parsedMessage
      }

      this.emit("data", data)
    })

    this.receiver.on("error", (err) => {
      this.error(err)
    })

    this.receiver.bind(this.PORT_LISTEN)
  }


  error(err) {
    this.emit("error", err)
    this.close()
  }

  close() {
    this.receiver.close()
  }
}

module.exports = {
  BroadcastReceiver,
  BroadcastSender
}


// const broadcastRec = new BroadcastReceiver()
// const broadcastSender = new BroadcastSender()

// broadcastRec.on("data", data => {
//   console.log(data)
// })

// broadcastRec.on("error", err => {
//   console.log(err)
// })

// broadcastSender.on("error", err => {
//   console.log(err)
// })

// setInterval(() => broadcastSender.send({name: "Mahdi"}), 2000)