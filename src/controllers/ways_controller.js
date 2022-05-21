const waysCtrl = {};

const {inTrace} = require ('./paws_controllers')

/*
waysCtrl.find_way = (paw, trace, player, matrix)  =>{
  
    let in_trace = false;
    in_trace = inTrace(paw, trace);
  
    if (
      (player === "N" && (paw.row === 16 || in_trace)) ||
      (player === "S" && (paw.row === 0 || in_trace))
    ) {
      if (in_trace) {
        return null;
      } else {
        trace.push(paw);
        return trace;
      }
    } else {
      let next_cell = null;
  
      next_cell = find_forward_cell(paw, player, matrix);
  
      if (next_cell && !inTrace(next_cell, trace)) {
        trace.push(paw);
        const the_way = waysCtrl.find_way(next_cell, trace, player, matrix);
  
        return the_way;
      } else {
        next_cell = find_forward_jump_cell(paw, player, matrix);
  
        if (next_cell && !inTrace(next_cell, trace)) {
          trace.push(paw);
          const the_way = waysCtrl.find_way(next_cell, trace, player, matrix);
          return the_way;
        } else {
          next_cell = find_right_left(paw, player, trace, matrix);
  
          if (next_cell && !inTrace(next_cell, trace)) {
            trace.push(paw);
            const the_way = waysCtrl.find_way(next_cell, trace, player, matrix);
            return the_way;
          } else {
            next_cell = find_behind_cell(paw, player, matrix);
            if (next_cell && !inTrace(next_cell, trace)) {
              trace.push(paw);
              trace.push(next_cell);
              return trace;
            } else {
              next_cell = find_behind_jump_cell(paw, player, matrix);
              if (next_cell && !inTrace(next_cell, trace)) {
                trace.push(paw);
                trace.push(next_cell);
                return trace;
              }
            }
          }
        }
      }
  
      return next_cell;
    }
}
*/
waysCtrl.find_way2 = (paw, trace, player, matrix)  =>{
  
    let in_trace = false;
    in_trace = inTrace(paw, trace);
  
    if (
      (player === "N" && (paw.row === 16 || in_trace)) ||
      (player === "S" && (paw.row === 0 || in_trace))
    ) {
      if (in_trace) {
        return null;
      } else {
        trace.push(paw);
        return trace;
      }
    } else {
      let next_cell = null;
      
      next_cell = waysCtrl.find_cell (paw ,player, matrix, 'forward') 
  
      if (next_cell && !inTrace(next_cell, trace)) {
        trace.push(paw);
        const the_way = waysCtrl.find_way2(next_cell, trace, player, matrix);
  
        return the_way;
      } else {
        next_cell = find_forward_jump_cell(paw, player, matrix);
  
        if (next_cell && !inTrace(next_cell, trace)) {
          trace.push(paw);
          const the_way = waysCtrl.find_way2(next_cell, trace, player, matrix);
          return the_way;
        } else {
          next_cell = find_right_left(paw, player, trace, matrix);
  
          if (next_cell && !inTrace(next_cell, trace)) {
            trace.push(paw);
            const the_way = waysCtrl.find_way2(next_cell, trace, player, matrix);
            return the_way;
          } else {
            next_cell = waysCtrl.find_cell (paw ,player, matrix, 'behind');
            if (next_cell && !inTrace(next_cell, trace)) {
              trace.push(paw);
              trace.push(next_cell);
              return trace;
            } else {
              next_cell = find_behind_jump_cell(paw, player, matrix);
              if (next_cell && !inTrace(next_cell, trace)) {
                trace.push(paw);
                trace.push(next_cell);
                return trace;
              }
            }
          }
        }
      }
  
      return next_cell;
    }
  }


 function  insideBoard (row, col){
   
    
    let result = false;
   
    if ((row >=0 ) &&
    (row < 17) && 
    (col >= 0 ) &&
    (col) < 17
    ){
      result = true;
    }
    
    //console.log ('inside board: ' + result)

    return result;

   
  }


  function nextLine (row, col, direction, steps) {
    let line = -1;
    switch (direction) {
      case 'forward':
        line = row + steps;
        break;
      case 'right':
        line = col + steps;
        break;
      case 'left':
        line = col - steps;
        break;
      case 'behind':
        line = row - steps;
        break;
      default:
        console.log(`Wrong line`);

    }
    return line;
  }

  
  waysCtrl.find_cell =  (paw, paw_type, matrix, direction ) =>  {
   
  let next_row = paw.row;
  let next_col = paw.col;
  let next_darkline_row = paw.row;
  let next_darkline_col = paw.col;
  let cell = null;
  let sign = 1;
  if (paw_type == 'S')
  {
    sign = -1;
  }
    
  
  
  switch (direction) {   
    case 'forward':
      next_row = nextLine (paw.row, paw.col, 'forward', 2*sign) 
      next_darkline_row = nextLine (paw.row, paw.col, 'forward', 1*sign) 
      break;
    case 'right':
      next_col = nextLine (paw.row, paw.col, 'right', 2) 
      next_darkline_col = nextLine (paw.row, paw.col, 'right', 1) 
      break;
    case 'left':
      next_col = nextLine (paw.row, paw.col, 'left', 2) 
      next_darkline_col = nextLine (paw.row, paw.col, 'left', 1) 
      break;
    case 'behind':
      next_row = nextLine (paw.row, paw.col, 'behind', 2*sign) 
      next_darkline_row = nextLine (paw.row, paw.col, 'behind', 1*sign) 
      break;
    default:

      console.log(`Wrong direction ${direction}`);
  }
  

  
  if (
    insideBoard (next_row, next_col) &&
    nowall(matrix[next_darkline_row][next_darkline_col]) &&
    permitted(matrix[next_row][next_col])
  ) {
    cell = {
      id: paw.id,
      row: next_row,
      col: next_col,
    };
    return cell;
  }

  return cell;
 }


/*
  function find_forward_cell(paw, paw_type, matrix, trace) {
    let cell = null;
  
    if (paw_type === "N") {
      let forward_row = paw.row + 2;
  
      if (
        forward_row < 17 &&
        nowall(matrix[paw.row + 1][paw.col]) &&
        permitted(matrix[forward_row][paw.col])
      ) {
        cell = {
          id: paw.id,
          row: forward_row,
          col: paw.col,
        };
      }
    } else {
      let forward_row = paw.row - 2;
  
      if (
        forward_row >= 0 &&
        nowall(matrix[paw.row - 1][paw.col]) &&
        permitted(matrix[forward_row][paw.col])
      ) {
        cell = {
          id: paw.id,
          row: forward_row,
          col: paw.col,
        };
      }
    }
  
    return cell;
  }*/
  

  function find_forward_jump_cell(paw, paw_type, matrix, trace) {
    let cell = null;
    if (paw_type === "N") {
      let forward_row_jump = paw.row + 4;
  
      if (
        forward_row_jump < 17 &&
        taken(matrix[paw.row + 2][paw.col], "S") &&
        nowall(matrix[paw.row + 1][paw.col]) &&
        nowall(matrix[paw.row + 3][paw.col]) &&
        permitted(matrix[paw.row + 4][paw.col])
      ) {
        cell = {
          id: paw.id,
          row: forward_row_jump,
          col: paw.col,
        };
      } else {
        let forward_row_jump = paw.row + 2;
        let forward_col_jump_right = paw.col + 2;
        let forward_col_jump_left = paw.col - 2;
  
        if (
          forward_row_jump < 17 &&
          forward_col_jump_right < 17 &&
          paw.row + 3 < 17 &&
          taken(matrix[paw.row + 2][paw.col], "S") &&
          nowall(matrix[paw.row + 1][paw.col]) &&
          !nowall(matrix[paw.row + 3][paw.col]) &&
          permitted(matrix[forward_row_jump][forward_col_jump_right])
        ) {
          cell = {
            id: paw.id,
            row: forward_row_jump,
            col: forward_col_jump_right,
          };
        } else {
          if (
            forward_row_jump < 17 &&
            forward_col_jump_left >= 0 &&
            paw.row + 3 < 17 &&
            taken(matrix[paw.row + 2][paw.col], "S") &&
            nowall(matrix[paw.row + 1][paw.col]) &&
            !nowall(matrix[paw.row + 3][paw.col]) &&
            permitted(matrix[forward_row_jump][forward_col_jump_left])
          ) {
            cell = {
              id: paw.id,
              row: forward_row_jump,
              col: forward_col_jump_left,
            };
          }
        }
      }
    } else {
      let forward_row_jump = paw.row - 4;
  
      if (
        forward_row_jump >= 0 &&
        taken(matrix[paw.row - 2][paw.col], "N") &&
        paw.row - 3 >= 0 &&
        nowall(matrix[paw.row - 1][paw.col]) &&
        nowall(matrix[paw.row - 3][paw.col]) &&
        permitted(matrix[forward_row_jump][paw.col])
      ) {
        cell = {
          id: paw.id,
          row: forward_row_jump,
          col: paw.col,
        };
      } else {
        let forward_row_jump = paw.row - 2;
        let forward_col_jump_right = paw.col + 2;
        let forward_col_jump_left = paw.col - 2;
  
        if (
          forward_row_jump >= 0 &&
          forward_col_jump_right < 17 &&
          taken(matrix[paw.row - 2][paw.col], "N") &&
          paw.row - 3 >= 0 &&
          nowall(matrix[paw.row - 1][paw.col]) &&
          !nowall(matrix[paw.row - 3][paw.col]) &&
          permitted(matrix[forward_row_jump][forward_col_jump_right]) &&
          nowall(matrix[forward_row_jump - 1][forward_col_jump_right - 1])
        ) {
          cell = {
            id: paw.id,
            row: forward_row_jump - 1,
            col: forward_col_jump_right - 1,
          };
        } else {
          if (
            forward_row_jump >= 0 &&
            forward_col_jump_left >= 0 &&
            taken(matrix[paw.row - 2][paw.col], "N") &&
            paw.row - 3 >= 0 &&
            !nowall(matrix[paw.row - 3][paw.col]) &&
            nowall(matrix[paw.row - 1][paw.col]) &&
            permitted(matrix[forward_row_jump][forward_col_jump_left]) &&
            nowall(matrix[forward_row_jump + 1][forward_col_jump_left + 1])
          ) {
            cell = {
              id: paw.id,
              row: forward_row_jump + 1,
              col: forward_col_jump_left + 1,
            };
          }
        }
      }
    }
  
    return cell;
  }
  
  function find_right_cell(paw, paw_type, matrix) {
    let cell = null;
    let right_col = paw.col + 1;
  
    if (
      right_col < 17 &&
      nowall(matrix[paw.row][paw.col + 1]) &&
      permitted(matrix[paw.row][paw.col + 2])
    ) {
      cell = {
        id: paw.id,
        row: paw.row,
        col: paw.col + 2,
      };
    }
  
    return cell;
  }
  
  function find_left_cell(paw, paw_type, matrix) {
    let cell = null;
  
    let left_col = paw.col - 1;
    if (
      left_col >= 0 &&
      nowall(matrix[paw.row][paw.col - 1]) &&
      permitted(matrix[paw.row][paw.col - 2])
    ) {
      cell = {
        id: paw.id,
        row: paw.row,
        col: paw.col - 2,
      };
    }
    return cell;
  }
  
  function find_right_left(paw, player, trace, matrix) {
  
    let next_cell_right = null;
    let next_cell_left = null;
    let right_way = null;
    let left_way = null;
    let trace_right = [];
    let trace_left = [];
  
    next_cell_right = find_right_cell(paw, player, matrix);
  
    if (next_cell_right) {
      let in_trace = false;
      in_trace = inTrace(next_cell_right, trace);
  
      if (!in_trace) {
        trace_right = [...trace];
        trace_right.push(paw);
        right_way = waysCtrl.find_way2(next_cell_right, trace_right, player, matrix);
      } else {
        right_way = null;
      }
    } else {
      right_way = null;
    }
  
    next_cell_left = find_left_cell(paw, player, matrix);
  
    if (next_cell_left) {
      let in_trace = false;
      in_trace = inTrace(next_cell_left, trace); //Aca esta fallando. No lo encuentra en el camino y lo deberia llevar
      if (!in_trace) {
        trace_left = [...trace];
        trace_left.push(paw);
        left_way = waysCtrl.find_way2(next_cell_left, trace_left, player, matrix);
      } else {
        left_way = null;
      }
    }
  
    if (right_way && left_way) {
      if (right_way.length <= left_way.length) {
        trace = [...trace_left];
  
        return next_cell_right;
      } else {
        return next_cell_left;
      }
    } else {
      if (!right_way && left_way) {
        trace = [...trace_left];
  
        return next_cell_left;
      } else {
        if (right_way && !left_way) {
          trace = [...trace_right];
  
          return next_cell_right;
        } else {
          if (!right_way && !left_way) {
            return null;
          }
        }
      }
    }
  }


  function find_behind_cell(paw, paw_type, matrix) {
    let cell = null;
  
    if (paw_type === "N") {
      let behind_row = paw.row - 2;
  
      if (
        behind_row >= 0 &&
        nowall(matrix[paw.row - 1][paw.col]) &&
        permitted(matrix[behind_row][paw.col])
      ) {
        cell = {
          id: paw.id,
          row: behind_row,
          col: paw.col,
        };
      }
    } else {
      let behind_row = paw.row + 2;
  
      if (
        behind_row < 17 &&
        nowall(matrix[paw.row + 1][paw.col]) &&
        permitted(matrix[behind_row][paw.col])
      ) {
        cell = {
          id: paw.id,
          row: behind_row,
          col: paw.col,
        };
      }
    }
  
    return cell;
  }
  
  function find_behind_jump_cell(paw, paw_type, matrix) {
    let cell = null;
    if (paw_type === "N") {
      let behind_row_jump = paw.row - 4;
  
      if (
        behind_row_jump >= 0 &&
        taken(matrix[paw.row - 2][paw.col], "S") &&
        nowall(matrix[paw.row - 1][paw.col]) &&
        nowall(matrix[paw.row - 3][paw.col]) &&
        permitted(matrix[paw.row - 4][paw.col])
      ) {
        cell = {
          id: paw.id,
          row: behind_row_jump,
          col: paw.col,
        };
      } else {
        let behind_row_jump = paw.row - 2;
        let behind_col_jump_right = paw.col + 2;
        let behind_col_jump_left = paw.col - 2;
  
        if (
          behind_row_jump >= 0 &&
          behind_col_jump_right < 17 &&
          paw.row - 3 >= 0 &&
          taken(matrix[paw.row - 2][paw.col], "S") &&
          !nowall(matrix[paw.row - 3][paw.col]) &&
          nowall(matrix[paw.row - 1][paw.col]) &&
          permitted(matrix[behind_row_jump][behind_col_jump_right])
        ) {
          cell = {
            id: paw.id,
            row: behind_row_jump,
            col: behind_col_jump_right,
          };
        } else {
          if (
            behind_row_jump >= 0 &&
            behind_col_jump_left >= 0 &&
            paw.row - 3 >= 0 &&
            taken(matrix[paw.row - 2][paw.col], "S") &&
            !nowall(matrix[paw.row - 3][paw.col]) &&
            nowall(matrix[paw.row - 1][paw.col]) &&
            permitted(matrix[behind_row_jump][behind_col_jump_left])
          ) {
            cell = {
              id: paw.id,
              row: behind_row_jump,
              col: behind_col_jump_left,
            };
          }
        }
      }
    } else {
      let behind_row_jump = paw.row + 4;
  
      if (
        behind_row_jump < 17 &&
        taken(matrix[paw.row + 2][paw.col], "N") &&
        paw.row + 3 >= 0 &&
        nowall(matrix[paw.row + 1][paw.col]) &&
        nowall(matrix[paw.row + 3][paw.col]) &&
        permitted(matrix[behind_row_jump][paw.col])
      ) {
        cell = {
          id: paw.id,
          row: behind_row_jump,
          col: paw.col,
        };
      } else {
        let behind_row_jump = paw.row + 2;
        let behind_col_jump_right = paw.col + 2;
        let behind_col_jump_left = paw.col - 2;
  
        if (
          behind_row_jump < 17 &&
          behind_col_jump_right < 17 &&
          taken(matrix[paw.row + 2][paw.col], "N") &&
          paw.row + 3 >= 0 &&
          !nowall(matrix[paw.row + 3][paw.col]) &&
          nowall(matrix[paw.row + 1][paw.col]) &&
          permitted(matrix[behind_row_jump][behind_col_jump_right]) &&
          nowall(matrix[behind_row_jump - 1][behind_col_jump_right - 1])
        ) {
          cell = {
            id: paw.id,
            row: behind_row_jump - 1,
            col: behind_col_jump_right - 1,
          };
        } else {
          if (
            behind_row_jump < 17 &&
            behind_col_jump_left >= 0 &&
            taken(matrix[paw.row + 2][paw.col], "N") &&
            paw.row + 3 >= 0 &&
            !nowall(matrix[paw.row + 3][paw.col]) &&
            nowall(matrix[paw.row + 1][paw.col]) &&
            permitted(matrix[behind_row_jump][behind_col_jump_left]) &&
            nowall(matrix[behind_row_jump + 1][behind_col_jump_left + 1])
          ) {
            cell = {
              id: paw.id,
              row: behind_row_jump + 1,
              col: behind_col_jump_left + 1,
            };
          }
        }
      }
    }
  
    return cell;
  }
  
  function nowall(paw) {
    
  let result = false;
    
    if (paw === " ") {
      result =  true;
    }

  //console.log ('nowall: ' + paw)
  return result;

  }

  function permitted(paw_value) {
    let result = false;

    if (paw_value === " ") {
      result = true;
    } else {
      result = false;
    }

    //console.log ('permitted: ' + result + 'paw_value' + paw_value)
   
    return result;
  }
  
  
  
  function taken(paw, symbol) {
    if (paw === symbol) {
      return true;
    } else {
      return false;
    }
  }

  waysCtrl.shortest_way = (ways) => {

    let shortest_way = {};
    let shortest_way_index = 0;
  
    if (ways.length > 0) {
      
  
      for (let i = 1; i < ways.length; i++) {
        if (ways[shortest_way_index].length > ways[i].length) {
          //   if ( ways[shortest_way_index][1].row <= ways[i][1].row) {
  
          shortest_way_index = i;
          //  }
        }
      }

      if (ways[shortest_way_index][0]) {
        const next_move = {
          trace_length: ways[shortest_way_index].length,
          row_orig: ways[shortest_way_index][0].row,
          col_orig: ways[shortest_way_index][0].col,
          row_dest: ways[shortest_way_index][1].row,
          col_dest: ways[shortest_way_index][1].col,
        };
      }
        return ways[shortest_way_index];

    } else {
      setTimeout(function () {
        console.log("There are no paths enabled");
      }, 7000);
      return null;
    }
  };
module.exports = waysCtrl;