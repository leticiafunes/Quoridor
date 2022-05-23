const ctrlMoves = {};

const { find_way, shortest_way } = require("./ways_controller.js");
const { opponent_player } = require("./players_controller");
const { load_matrix, find_paws } = require("./matrix_controller");
const {findWallPlace} = require ('./walls_controller.js')

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

 
  

  if (ways.length > 0) {
    shortest_player = shortest_way(ways);
  }

  if (ways_opponent.length > 0) {
    shortest_opponent = shortest_way(ways_opponent);
  }
 
  let next_move  = null;

  console.log ('shortest_opponent: ')  
  console.log (shortest_opponent)  
  console.log (remaining_walls)

  if ( (remaining_walls > 0) && 
  ((shortest_opponent.length <= shortest_player.length ) ||
  (((shortest_opponent[0].row) < 12) && (player === "N")) ||
  (((shortest_opponent[0].row) > 6) && (player === "S")))

  )
   
  {
  
    
   
    let paw = {
      row: shortest_opponent[0].row ,
      col:shortest_opponent[0].col 
    }
    
    console.log ('Select mve')
    console.log (paw)
    console.log (shortest_opponent)
    console.log (shortest_player)
    console.log (shortest_opponent[0].row)

    let wall = findWallPlace (matrix, paw, opponent)
    
    if (wall) {
      console.log (wall)
    //revisar que vaya dividido 
    //revisar que aun me queden paredes
   
    next_move = {
      type: 'wall', 
      trace_length: shortest_opponent.length,
      row_dest: Math.trunc(wall.row/2),
      col_dest: wall.col/2,
      orientation: 'h'
      
    }
    console.log ('A wall')
    console.log ( next_move)

    }
    else {
      if (shortest_player) {
        next_move = {
          type: 'move', 
          trace_length: shortest_player.length,
          row_orig: shortest_player[0].row/2,
          col_orig: shortest_player[0].col/2,
          row_dest: shortest_player[1].row/2,
          col_dest: shortest_player[1].col/2,
        };
        
        console.log(`next move ${next_move}`);
        console.log(next_move);
    
        return next_move;
    
      } else {
        console.log(`There are no paths enabled`);
        return null;
      }
    }
    
    
    
    console.log ('next move: ' + next_move)
    return next_move;

  }
  else {
    if (shortest_player) {
      next_move = {
        type: 'move', 
        trace_length: shortest_player.length,
        row_orig: shortest_player[0].row/2,
        col_orig: shortest_player[0].col/2,
        row_dest: shortest_player[1].row/2,
        col_dest: shortest_player[1].col/2,
      };
      
      console.log(`next move ${next_move}`);
      console.log(next_move);
  
      return next_move;
  
    } else {
      console.log(`There are no paths enabled`);
      return null;
    }
  }


 
 
};

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
