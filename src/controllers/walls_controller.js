const wallsCtrl = {};

const { register } = require("ts-node");
const { nextLine, empty, insideBoard } = require("./common");


wallsCtrl.findWallPlace = (matrix, paw, player) => {
  let forward_wall_pos = null;
  let max_steps = Number(process.env.MAX_STEPS);

  forward_wall_pos = find_forward_wall_pos(matrix, paw, player, max_steps);

  if (forward_wall_pos) {
    return forward_wall_pos;
  }

  return forward_wall_pos;
};

function find_forward_wall_pos(matrix, paw, player, max_steps) {
 
  let wall_pos = null;
  let orientation = "h";
  let possible_row = paw.row;
  let steps = 1;
  if (max_steps) {
    let steps = max_steps;
  }
  
 
    possible_row = nextLine(paw.row, paw.col, "forward", steps , player);

    if (insideBoard(possible_row, paw.col)) {


      wall_pos = wall_position(
        possible_row,
        paw.col,
        matrix,
        player,
        orientation
      );


      if (wall_pos) {
        return wall_pos;
      }
    }


  return wall_pos;
}

function wall_position(row, col, matrix, player, orientation) {
  let next_column = 0;
  let wall_position = null;
  let  direction = 1;

  if (player === "S") {
    direction = -1;
  }

  next_column = nextLine(row, col, "right", 2 , player);


  if ( (insideBoard(row, next_column)) &&
  
  
  (empty(matrix[row][col]) && empty(matrix[row][next_column]))) {
    wall_position = {
      row: row,
      col: col,
      orientation: orientation,
    };
    return wall_position;
  } else {
    next_column = nextLine(row, col, "left", 2, player);

    if ((insideBoard(row, next_column)) && empty(matrix[row][col]) && 
       empty(matrix[row][next_column])) {
      wall_position = {
        row: row,
        col: next_column,
        orientation: orientation,
      };
      return wall_position;
    }

    return wall_position;
  }
}




module.exports = wallsCtrl;
