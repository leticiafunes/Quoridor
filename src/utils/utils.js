const utilsCtrl = {};

const { paintboard } = require("./paint");

utilsCtrl.writeLog = (file_name) => {
  const readline = require("readline"),
    fs = require("fs")
    

  let lector = readline.createInterface({
    input: fs.createReadStream(file_name),
  });

  let lineas = [];
  lector.on("line", (linea) => {
    lineas.push(linea);
  });
  
  console.log("Waiting for lines");

  setTimeout(function () {
    for (let i = 0; i < lineas.length; i++) {
      let obj = {};
      var params = lineas[i];
      var KeyVal = params.split(",");

      var j;
      for (j in KeyVal) {
        KeyVal[j] = KeyVal[j].split(":");
      /*  console.log("KeyVal[j][0]");
        console.log(KeyVal[j][0]);
        console.log(KeyVal[j][0].replace(/(')/gm, "").trim());
        console.log("KeyVal[j][1]");
        console.log(KeyVal[j][1]);
        obj[KeyVal[j][0]] = KeyVal[j][1];*/

        if (KeyVal[j][0].replace(/(')/gm, "").trim() == "current_player") {
          //console.log(KeyVal[j][1]);
        }
     if ((i>50) && (i<100)) {
      if (KeyVal[j][0].replace(/(')/gm, "").trim() == "board") {
        let objeto = KeyVal[j][1].replace(" ", "");
        let board = objeto.replace(/(')/gm, "");

        paintboard(board);
      }


     }
        


      }
    }
  }, 7000);
};
module.exports = utilsCtrl;
