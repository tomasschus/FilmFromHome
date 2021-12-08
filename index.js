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

var usuariosConectados = 0;

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
var nms = new NodeMediaServer(config)
nms.run();

io.on('connection', (socket) => {
  console.log('a user connected');
  usuariosConectados = usuariosConectados + 1
  io.emit('usersConnected', usuariosConectados)

  socket.on('disconnect', () => {
    console.log('user disconnected');
    usuariosConectados = usuariosConectados - 1
    io.emit('usersConnected', usuariosConectados)
  });

  socket.on('chat-message', (msg) => {
    io.emit('new-message', {msg})
  });
});
