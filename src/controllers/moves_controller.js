const ctrlMoves = {};

const { find_way, shortest_way } = require("./ways_controller.js");
const { opponent_player } = require("./players_controller");
const { load_matrix, find_paws } = require("./matrix_controller");
const { findWallPlace } = require("./walls_controller.js");

ctrlMoves.select_move = (board, player, remaining_walls, wall_turn) => {
  
  let  wallturn = true;
  if (wall_turn) {
    wallturn = wall_turn
  }
  const opponent = opponent_player(player);
  const matrix = load_matrix(board);
  console.log (board)
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

  let shortest_way_player = null;
  let shortest_way_opponent = null;

  if (ways.length > 0) {
    shortest_way_player = shortest_way(ways);
  }
  if (ways_opponent.length > 0) {
    shortest_way_opponent = shortest_way(ways_opponent);
  }

  let next_move = null;



  if (shortest_way_opponent.way_length> 0) {
    if (
      remaining_walls > 0 &&  wall_turn &&
      shortest_way_opponent.way_length < shortest_way_player.way_length &&
      ((shortest_way_opponent.row_dest < Number(process.env.CROSS_LINE_N)  &&
        player === "N") ||
        (shortest_way_opponent.row_dest > Number (process.env.CROSS_LINE_S) &&
          player === "S"))
    ) {
      let paw = {
        row: shortest_way_opponent.row_orig,
        col: shortest_way_opponent.col_orig,
      };

      let wallplace = findWallPlace(matrix, paw, opponent);

      if (wallplace) {
        next_move = {
          type: "wall",
          way_length: shortest_way_opponent.way_length,
          row_dest: Math.trunc(wallplace.row / 2),
          col_dest: wallplace.col / 2,
          orientation: "h",
        };

        return next_move;
      }
    }
  } else {
    console.log(`There are no opponent paths enabled`);
    
  }

  if (!next_move) {
    if (shortest_way_player) {
      next_move = {
        type: "move",
        way_length: shortest_way_player.way_length,
        row_orig: shortest_way_player.row_orig / 2,
        col_orig: shortest_way_player.col_orig / 2,
        row_dest: shortest_way_player.row_dest / 2,
        col_dest: shortest_way_player.col_dest / 2,
      };
      return next_move;
    } else {
      console.log(`There are no paths enabled`);


      return null;
    }
  }
};

function find_paw_way(paw, player, matrix, ways) {
  const trace = [];
  let paw_way = [];

  paw_way = find_way(paw, trace, player, matrix, ways);

  if (paw_way) {
    ways.push(paw_way);
  } else {
    console.log("No way for " + paw.id);
  }
}

module.exports = ctrlMoves;
