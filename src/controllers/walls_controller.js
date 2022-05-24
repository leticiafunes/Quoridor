const wallsCtrl = {};

const { register } = require("ts-node");
const { nextLine, empty, insideBoard } = require("./common");
const { opponent_player } = require("./players_controller");

wallsCtrl.findWallPlace = (matrix, paw, player) =>  {




let forward_wall_pos = null;



forward_wall_pos = find_forward_wall_pos (matrix, paw, player, 1)

if (forward_wall_pos) {
  return forward_wall_pos;
}

return forward_wall_pos;


} 


function find_forward_wall_pos (matrix, paw, player, row_steps) {
      
      let wall_pos = null;
      let orientation = 'h';
      let sign = 1;

      if (player === "S" ) {
        sign = -1
          
      }



      let possible_row = paw.row;
      let steps = 1;

      while ( steps < (row_steps+1)) {
        
      
            possible_row = nextLine(paw.row, paw.col, "forward", steps * sign);

        
        if (insideBoard (possible_row,paw.col )) {

        wall_pos = wall_position (possible_row, paw.col, matrix, player, orientation);
        if (wall_pos) {
        
            return wall_pos;
        }
       
        }
        steps = steps + 2;
    }

 
    return wall_pos;
    



}

function wall_position (row, col, matrix, player, orientation){
    
    let next_column = 0;
    let wall_position = null;

    if (player === 'S') {
        const direction = -1;
    }
   
    next_column = nextLine (row, col, "right", 2)
   

    
    if ((empty (matrix [row][col])) && 
    (empty (matrix [row][next_column])))
    {
        
        wall_position = {
            row: row,
            col: col,
            orientation: orientation 
        }
        return  wall_position;

    }
    else {
        next_column = nextLine (row, col, "left", 2)
        if ((empty (matrix [row][col])) && 
        (empty (matrix [row][next_column])))
        {

           wall_position = {
            row: row,
            col: next_column,
            orientation: orientation 
        }
        return  wall_position;
        
    }
    return wall_position;
    }


    
}


module.exports = wallsCtrl;