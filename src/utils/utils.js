const utilsCtrl = {};
let { paint_matrix } = require("./paint");

utilsCtrl.opponent_player = (player) => {
  let opponent = "S";
  if (player === "S") {
    opponent = "N";
  }
  return opponent;
};

utilsCtrl.shortest_way = (ways) => {
  let shortest_way = {};

  if (ways.length > 0) {
    let shortest_way_index = 0;

    for (let i = 1; i < ways.length; i++) {
      if (ways[shortest_way_index].length > ways[i].length) {
        //   if ( ways[shortest_way_index][1].row <= ways[i][1].row) {

        shortest_way_index = i;
        //  }
      }
    }
    const next_move = {
      trace_length: ways[shortest_way_index].length,
      row_orig: ways[shortest_way_index][0].row,
      col_orig: ways[shortest_way_index][0].col,
      row_dest: ways[shortest_way_index][1].row,
      col_dest: ways[shortest_way_index][1].col,
    };

    return ways[shortest_way_index];
  } else {
    setTimeout(function () {
      console.log("There are no paths enabled");
    }, 7000);
    return null;
  }
};

utilsCtrl.load_matrix = (board_parameter) => {
  //const board_par = '  N     N     N  -*-' + ' '.repeat(232)+'S                     S     S        '

  let matrix = [];
  let board_string = board_parameter;
  let start = 0;
  let end = 17;

  for (let board_row = 0; board_row < 17; board_row++) {
    let column = Array.from(board_string.substring(start, end));
    matrix[(0, board_row)] = column;
    start = end;
    end = end + 17;
  }

  paint_matrix(matrix);
  return matrix;
};

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
      obj = {};
      var params = lineas[i];
      var KeyVal = params.split(",");

      var j;
      for (j in KeyVal) {
        KeyVal[j] = KeyVal[j].split(":");
        console.log("KeyVal[j][0]");
        console.log(KeyVal[j][0]);
        console.log(KeyVal[j][0].replace(/(')/gm, "").trim());
        console.log("KeyVal[j][1]");
        console.log(KeyVal[j][1]);
        obj[KeyVal[j][0]] = KeyVal[j][1];

        if (KeyVal[j][0].replace(/(')/gm, "").trim() == "current_player") {
          console.log(KeyVal[j][1]);
        }

        if (KeyVal[j][0].replace(/(')/gm, "").trim() == "board") {
          let objeto = KeyVal[j][1].replace(" ", "");
          let board = objeto.replace(/(')/gm, "");

          paintboard(board);
        }
      }
    }
  }, 7000);
};
module.exports = utilsCtrl;
