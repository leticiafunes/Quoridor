const ctrlMoves = {};

const { find_way, find_way2, shortest_way } = require("./ways_controller.js");
const { opponent_player } = require("./players_controller");
const { load_matrix, find_paws } = require("./matrix_controller");

ctrlMoves.select_move = (board, player) => {
  const opponent = opponent_player(player);
  const matrix = load_matrix(board);
  const paws = find_paws(matrix);

  let ways = [];
  let ways_opponent = [];
  let final_way = [];
  let final_way_opponent = [];

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

  if (shortest_player) {
    const next_move = {
      trace_length: shortest_player.length,
      row_orig: shortest_player[0].row,
      col_orig: shortest_player[0].col,
      row_dest: shortest_player[1].row,
      col_dest: shortest_player[1].col,
    };
    
    console.log(`next move ${next_move}`);
    console.log( next_move);
    return next_move;

  } else {
    console.log(`There are no paths enabled`);
    return null;
  }
};

function find_paw_way(paw, player, matrix, ways) {
  const trace = [];
  let final_way = [];

  final_way = find_way2(paw, trace, player, matrix, ways);

  if (final_way) {
    ways.push(final_way);
  } else {
    console.log("No way for " + paw.id);
  }
}

module.exports = ctrlMoves;
