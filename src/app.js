const express = require("express");
const { Server } = require("socket.io"); //Websocket Server
const https = require("http");
const WebSocketServer = Server;
const app = express();
const server = https.createServer(app); //htts server uses express configuration
const io = new WebSocketServer(server); //WSServer has a http server parameter.

app.use(express.static(__dirname + "/public"));

app.set("port", process.env.PORT || 5000);

try {
  io.on("connection", (socket) => {
    console.log(`New connection: ${socket}`);
  });
} catch (error) {
  console.log(`Connection error : ${error}`);
}

server.listen(process.env.PORT_SERVER, () => {
  console.log(`Listening on port : ${process.env.PORT_SERVER}`);
});

const routes = require("./routes/routes");

module.exports = app;
