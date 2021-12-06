const express = require('express')
const app = express()
const port = 80

app.get('/',function(req,res) {
    res.sendFile(__dirname + '/index.html');
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
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
    port: 8000,
    allow_origin: '*'
  }
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