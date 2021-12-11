const express = require('express')
const http = require('http');
const app = express()
const path = require('path')
const server = http.createServer(app);

const { Server } = require("socket.io");
const io = new Server(server);

const port1 = process.env.PORT||80
const port2 = process.env.PORT||1935
const port3 = process.env.PORT||5501

app.use(express.static(path.join(__dirname, 'public')))

server.listen(port1, () => {
  console.log(`App listening on port ${port1}`)
})

const NodeMediaServer = require('node-media-server');

const config = {
  rtmp: {
    port: port2,
    chunk_size: 60000,
    gop_cache: true,
    ping: 30,
    ping_timeout: 60
  },
  http: {
    port: port3,
    allow_origin: '*'
  },
  
};

/* https config requiere 
https: {
    port: 8443,
    key:'./privatekey.pem',
    cert:'./certificate.pem',
  }
  
*/
var historialChat = []
var usersConnected = 0

var nms = new NodeMediaServer(config)
nms.run();

io.on('connection', (socket) => {
  console.log('a user connected');
  usersConnected = usersConnected + 1
  io.emit('usersConnected', usersConnected)
  io.emit("historialChat",historialChat)

  socket.on('disconnect', () => {
    console.log('user disconnected');
    usersConnected = usersConnected - 1
    io.emit('usersConnected', usersConnected)
  });

  socket.on('chat-message', (msg) => {
    if(msg.mensaje == "!vaciar"){
      usersConnected = []
      io.emit('!vaciar', {})
    }else{
      var t = new Date();
      var time = t.getHours() + ":" + t.getMinutes()
      msg.time = time
      historialChat.push(msg)
      io.emit('new-message', {msg})
    }
  });

});
