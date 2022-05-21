const matrixCtrl = {}

const chalk = require("chalk");

matrixCtrl.load_matrix = (board_parameter) => {
    
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
  
    matrixCtrl.paint_matrix(matrix);
    return matrix;
  };

matrixCtrl.paint_matrix = (matrix) => {
    console.log("  " + " 0  a  1  b  2  c  3  d  4  e  5  f  6  g  7  h  8 ");
  
    const walls = ["a", "b", "c", "d", "e", "f", "g", "h"];
    const pawns = ["0", "1", "2", "3", "4", "5", "6", "7", "8"];
    let wall_indicator = 0;
    let pawns_indicator = 0;
  
    for (let i = 0; i < 17; i++) {
      //17 = 9 columns and 8 walls
  
      let tittle = "";
      if (i % 2) {
        tittle = walls[wall_indicator];
        wall_indicator++;
  
        console.log(
          tittle +
            "|" +
            chalk.bgGray(" " + matrix[i][0] + " ") +
            chalk.bgGray(" " + matrix[i][1] + " ") +
            chalk.bgGray(" " + matrix[i][2] + " ") +
            chalk.bgGray(" " + matrix[i][3] + " ") +
            chalk.bgGray(" " + matrix[i][4] + " ") +
            chalk.bgGray(" " + matrix[i][5] + " ") +
            chalk.bgGray(" " + matrix[i][6] + " ") +
            chalk.bgGray(" " + matrix[i][7] + " ") +
            chalk.bgGray(" " + matrix[i][8] + " ") +
            chalk.bgGray(" " + matrix[i][9] + " ") +
            chalk.bgGray(" " + matrix[i][10] + " ") +
            chalk.bgGray(" " + matrix[i][11] + " ") +
            chalk.bgGray(" " + matrix[i][12] + " ") +
            chalk.bgGray(" " + matrix[i][13] + " ") +
            chalk.bgGray(" " + matrix[i][14] + " ") +
            chalk.bgGray(" " + matrix[i][15] + " ") +
            chalk.bgGray(" " + matrix[i][16] + " ")
        );
      } else {
        tittle = pawns[pawns_indicator];
        pawns_indicator++;
        console.log(
          tittle +
            "|" +
            chalk.bgGreen(" " + matrix[i][0] + " ") +
            chalk.bgGray(" " + matrix[i][1] + " ") +
            chalk.bgGreen(" " + matrix[i][2] + " ") +
            chalk.bgGray(" " + matrix[i][3] + " ") +
            chalk.bgGreen(" " + matrix[i][4] + " ") +
            chalk.bgGray(" " + matrix[i][5] + " ") +
            chalk.bgGreen(" " + matrix[i][6] + " ") +
            chalk.bgGray(" " + matrix[i][7] + " ") +
            chalk.bgGreen(" " + matrix[i][8] + " ") +
            chalk.bgGray(" " + matrix[i][9] + " ") +
            chalk.bgGreen(" " + matrix[i][10] + " ") +
            chalk.bgGray(" " + matrix[i][11] + " ") +
            chalk.bgGreen(" " + matrix[i][12] + " ") +
            chalk.bgGray(" " + matrix[i][13] + " ") +
            chalk.bgGreen(" " + matrix[i][14] + " ") +
            chalk.bgGray(" " + matrix[i][15] + " ") +
            chalk.bgGreen(" " + matrix[i][16] + " ")
        );
      }
    }
  };

matrixCtrl.find_paws = (matrix) => {
    let board_element = {
      id: "",
      type: "",
      row: "",
      col: "",
    };
  
    let row = [];
    var board_elements = [];
    let idxN = "";
    let idxS = "";
    let index = 0;
  
    index = 1;
    for (let board_row = 0; board_row < 17; board_row++) {
      row = matrix[board_row];
  
      idxN = row.indexOf("N");
  
      while (idxN != -1) {
        board_element = {
          id: "N" + index,
          type: "N",
          row: board_row,
          col: idxN,
        };
        board_elements.push(board_element);
        idxN = row.indexOf("N", idxN + 1);
        index++;
      }
  
      idxS = row.indexOf("S");
      while (idxS != -1) {
        board_element = {
          id: "S" + index,
          type: "S",
          row: board_row,
          col: idxS,
        };
        board_elements.push(board_element);
        idxS = row.indexOf("S", idxS + 1);
        index++;
      }
    }
  
  
    return board_elements;
  };
  matrixCtrl.convert_to_board = (matrix) => {
    let board = "";
    for (let i = 0; i < matrix.length; i++) {
      for (let j = 0; j < matrix.length; j++) {
        board = board + matrix[i][j];
      }
    }
    return board;
  };


module.exports = matrixCtrl;