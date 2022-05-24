const ctrlMoves = {};

const { find_way, shortest_way } = require("./ways_controller.js");
const { opponent_player } = require("./players_controller");
const { load_matrix, find_paws } = require("./matrix_controller");
const { findWallPlace } = require("./walls_controller.js");

ctrlMoves.select_move = (board, player, remaining_walls) => {
  const opponent = opponent_player(player);
  const matrix = load_matrix(board);
  const paws = find_paws(matrix);

  let ways = [];
  let ways_opponent = [];

  for (const index in paws) {
    if (paws[index].type === player) {
      find_paw_way(paws[index], player, matrix, ways);
    } else {
      find_paw_way(paws[index], opponent, matrix, ways_opponent);
    }
  }

  if (ways.length < 1 || ways_opponent.length < 1) {
    setTimeout(function () {
      console.log("Waiting for ways");
    }, 7000);
  }

  let shortest_player = null;
  let shortest_opponent = null;

  console.log (ways)

  if (ways.length > 0) {
    shortest_player = shortest_way(ways);
  }
  if (ways_opponent.length > 0) {
    shortest_opponent = shortest_way(ways_opponent);
  }

  let next_move = null;

  if (shortest_opponent)  {
    if (
      remaining_walls > 0 &&
      shortest_opponent.length < shortest_player.length &&
      ((shortest_opponent[0].row < 12 && player === "N") ||
        (shortest_opponent[0].row > 6 && player === "S"))
    ) {
      let paw = {
        row: shortest_opponent[0].row,
        col: shortest_opponent[0].col,
      };
  
      let wall = findWallPlace(matrix, paw, opponent);
  
      if (wall) {
        next_move = {
          type: "wall",
          trace_length: shortest_opponent.length,
          row_dest: Math.trunc(wall.row / 2),
          col_dest: wall.col / 2,
          orientation: "h",
        };

        return next_move;
      }
    }
  }
  else {
  
    console.log(`There are no opponent paths enabled`);
    return null;

  }
  
  if (!(next_move)) {

    if (shortest_player) {
      next_move = {
        type: "move",
        trace_length: shortest_player.trace_length,
        row_orig: shortest_player.row_orig / 2,
        col_orig: shortest_player.col_orig / 2,
        row_dest: shortest_player.row_dest / 2,
        col_dest: shortest_player.col_dest/ 2,
      };
       console.log (next_move)
       return next_move;

    } else {
      console.log(`There are no paths enabled`);
      return null;
    }

  }
}


function find_paw_way(paw, player, matrix, ways) {
  const trace = [];
  let final_way = [];

  final_way = find_way(paw, trace, player, matrix, ways);

  if (final_way) {
    ways.push(final_way);
  } else {
    console.log("No way for " + paw.id);
  }
}

module.exports = ctrlMoves;
