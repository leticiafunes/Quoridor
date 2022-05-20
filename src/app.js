
import express from "express";

import { Server as WebSocketServer } from "socket.io"; //Servidor de websockets
import https from "http";

const app = express();
const server = https.createServer(app); //htts server uses express configuration
const io = new WebSocketServer(server); //WSServer has a http server parameter.

app.use(express.static(__dirname + "/public"));

//settings - - -
app.set ('port', process.env.PORT || 8000);

io.on("connection", (socket) => {
  console.log("New connection" + socket);
});

server.listen(3000, () => {
  console.log("Listening on port 3000");
});

const routes = require('./routes/routes');


  function sendNumber() {
    if (connection.connected) {
      var number = Math.round(Math.random() * 0xffffff);
      connection.sendUTF(number.toString());
      setTimeout(sendNumber, 1000);
    }
  }
  //sendNumber();






module.exports = app;