
import express from "express";




import { Server as WebSocketServer } from "socket.io"; //Servidor de websockets
import https from "http";




const app = express();
const server = https.createServer(app); //Creo un servidor que utliza la configurcion de express
const io = new WebSocketServer(server); //Le paso como parametro un OBJETO servidor http.



app.use(express.static(__dirname + "/public"));

//settings - - -
app.set ('port', process.env.PORT || 8000);




io.on("connection", (socket) => {
  console.log("Nueva Conexión" + socket);
});

server.listen(6000, () => {
  console.log("Listening on port 6000");
});



const routes = require('./routes/routes');


const connections = require('./connection/connections');




  function sendNumber() {
    if (connection.connected) {
      var number = Math.round(Math.random() * 0xffffff);
      connection.sendUTF(number.toString());
      setTimeout(sendNumber, 1000);
    }
  }
  //sendNumber();






module.exports = app;