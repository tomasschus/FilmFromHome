const express = require('express')
const http = require('http');
const app = express()
const port = 8000
const path = require('path')
const server = http.createServer(app);

const { Server } = require("socket.io");
const io = new Server(server);


app.use(express.static(path.join(__dirname, 'public')))

server.listen(port, () => {
  console.log(`App listening on port ${port}`)
})

const NodeMediaServer = require('node-media-server');
const config = {
  rtmp: {
    port: 1935,
    chunk_size: 60000,
    gop_cache: true,
    ping: 30,
    ping_timeout: 60
  },
  http: {
    port: 5500,
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
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
  socket.on('chat-message', (msg) => {
    io.emit('new-message', {msg})
  });
});
