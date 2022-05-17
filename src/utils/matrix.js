const matrixCtrl = {};
let { load_matrix } = require("../utils/paint");

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

  //console.log(board_elements);
  return board_elements;
}
/*
matrixCtrl.find_paws = (matrix)=>  {
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

  //console.log(board_elements);
  return board_elements;
}*/


matrixCtrl.find_nexts = (paws, matrix) => {
  //find_forward(paws, matrix);

  //find_right(paws, matrix);

  //find_left(paws, matrix);
  //find_behind(paws, matrix);
  //find_forward_jump(paws, matrix);
  //find_behind_jump(paws, matrix);
  //console.log(paws);

  return paws;
};

function find_forward(paws, matrix) {
  paws.forEach(nexts_fordward);

  //call back element, index, array
  function nexts_fordward(paw, index, paws) {
    if (paw.type === "N") {
      let forward_row = paw.row + 1;

      if (
        forward_row < 17 &&
        nowall(matrix[paw.row + 1][paw.col]) &&
        permitted(matrix[paw.row + 2][paw.col])
      ) {
        paws[index].forward = {
          row: paw.row + 2,
          col: paw.col,
        };
      }
    } else {
      let forward_row = paw.row - 1;
      if (
        forward_row >= 0 &&
        nowall(matrix[paw.row - 1][paw.col]) &&
        permitted(matrix[paw.row - 2][paw.col])
      ) {
        paws[index].forward = {
          row: paw.row - 2,
          col: paw.col,
        };
      }
    }
  }
}

function find_forward_jump(paws, matrix) {
  paws.forEach(nexts_fordward_jump);

  //call back element, index, array
  function nexts_fordward_jump(paw, index, paws) {
    if (paw.type === "N") {
      let forward_row_jump = paw.row + 4;

      if (
        forward_row_jump < 17 &&
        taken(matrix[paw.row + 2][paw.col], "S") &&
        paw.row + 3 < 17 &&
        nowall(matrix[paw.row + 3][paw.col]) &&
        permitted(matrix[paw.row + 4][paw.col])
      ) {
        paws[index].forward_jump = {
          row: paw.row + 4,
          col: paw.col,
        };
      } else {
        let forward_row_jump = paw.row + 2;
        let forward_col_jump_right = paw.col + 2;
        let forward_col_jump_left = paw.col - 2;

        if (
          forward_row_jump < 17 &&
          forward_col_jump_right < 17 &&
          taken(matrix[paw.row + 2][paw.col], "S") &&
          paw.row + 3 < 17 &&
          !nowall(matrix[paw.row + 3][paw.col]) &&
          permitted(matrix[forward_row_jump][forward_col_jump_right])
        ) {
          paws[index].forward_jump_right = {
            row: forward_row_jump,
            col: forward_col_jump_right,
          };
        } else {
          if (
            forward_row_jump < 17 &&
            forward_col_jump_left >= 0 &&
            taken(matrix[paw.row + 2][paw.col], "S") &&
            paw.row + 3 < 17 &&
            !nowall(matrix[paw.row + 3][paw.col]) &&
            permitted(matrix[forward_row_jump][forward_col_jump_left])
          ) {
            paws[index].forward_jump_left = {
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
        nowall(matrix[paw.row - 3][paw.col]) &&
        permitted(matrix[forward_row_jump][paw.col])
      ) {
        paws[index].forward_jump = {
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
          !nowall(matrix[paw.row - 3][paw.col]) &&
          permitted(matrix[forward_row_jump][forward_col_jump_right]) &&
          nowall(matrix[forward_row_jump - 1][forward_col_jump_right - 1])
        ) {
          paws[index].forward_jump_right = {
            row: forward_row_jump,
            col: forward_col_jump_right,
          };
        } else {
          if (
            forward_row_jump >= 0 &&
            forward_col_jump_left >= 0 &&
            taken(matrix[paw.row - 2][paw.col], "N") &&
            paw.row - 3 >= 0 &&
            !nowall(matrix[paw.row - 3][paw.col]) &&
            permitted(matrix[forward_row_jump][forward_col_jump_left]) &&
            nowall(matrix[forward_row_jump + 1][forward_col_jump_left + 1])
          ) {
            paws[index].forward_jump_left = {
              row: forward_row_jump,
              col: forward_col_jump_left,
            };
          }
        }
      }
    }
  }
}

function find_right(paws, matrix) {
  paws.forEach(nexts_right);

  //call back element, index, array
  function nexts_right(paw, index, paws) {
    let right_col = paw.col + 1;

    if (
      right_col < 17 &&
      nowall(matrix[paw.row][paw.col + 1]) &&
      permitted(matrix[paw.row][paw.col + 2])
    ) {
      paws[index].right = {
        row: paw.row,
        col: paw.col + 2,
      };
    }
  }
}

function find_left(paws, matrix) {
  paws.forEach(nexts_left);

  //call back element, index, array
  function nexts_left(paw, index, paws) {
    let left_col = paw.col - 1;
    if (
      left_col >= 0 &&
      nowall(matrix[paw.row][paw.col - 1]) &&
      permitted(matrix[paw.row][paw.col - 2])
    ) {
      paws[index].left = {
        row: paw.row,
        col: paw.col - 2,
      };
    }
  }
}

function find_behind(paws, matrix) {
  paws.forEach(nexts_behind);

  //call back element, index, array
  function nexts_behind(paw, index, paws) {
    if (paw.type === "N") {
      let behind_row = paw.row - 1;

      if (
        behind_row >= 0 &&
        nowall(matrix[paw.row - 1][paw.col]) &&
        permitted(matrix[paw.row - 2][paw.col])
      ) {
        paws[index].behind = {
          row: paw.row - 2,
          col: paw.col,
        };
      }
    } else {
      let behind_row = paw.row + 1;

      if (
        behind_row < 17 &&
        nowall(matrix[paw.row + 1][paw.col]) &&
        permitted(matrix[paw.row + 2][paw.col])
      ) {
        paws[index].behind = {
          row: paw.row + 2,
          col: paw.col,
        };
      }
    }
  }
}

function find_behind_jump(paws, matrix) {
  paws.forEach(nexts_behind_jump);

  //call back element, index, array
  function nexts_behind_jump(paw, index, paws) {
    if (paw.type === "N") {
      let behind_row_jump = paw.row - 4;

      if (
        behind_row_jump >= 0 &&
        taken(matrix[paw.row - 2][paw.col], "S") &&
        nowall(matrix[paw.row - 3][paw.col]) &&
        permitted(matrix[behind_row_jump][paw.col])
      ) {
        paws[index].behind_jump = {
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
          taken(matrix[paw.row - 2][paw.col], "S") &&
          !nowall(matrix[paw.row - 3][paw.col]) &&
          permitted(matrix[behind_row_jump][behind_col_jump_right])
        ) {
          paws[index].forward_jump_right = {
            row: behind_row_jump,
            col: behind_col_jump_right,
          };
        } else {
          if (
            behind_row_jump >= 0 &&
            behind_col_jump_left >= 0 &&
            taken(matrix[paw.row - 2][paw.col], "S") &&
            !nowall(matrix[paw.row - 3][paw.col]) &&
            permitted(matrix[behind_row_jump][behind_col_jump_left])
          ) {
            paws[index].forward_jump_left = {
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
        nowall(matrix[paw.row + 3][paw.col]) &&
        permitted(matrix[behind_row_jump][paw.col])
      ) {
        paws[index].behind_jump = {
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
          !nowall(matrix[paw.row + 3][paw.col]) &&
          permitted(matrix[behind_row_jump][behind_col_jump_right]) &&
          nowall(matrix[behind_row_jump - 1][behind_col_jump_right - 1])
        ) {
          paws[index].behind_jump_right = {
            row: behind_row_jump,
            col: behind_col_jump_right,
          };
        } else {
          if (
            behind_row_jump >= 0 &&
            behind_col_jump_left >= 0 &&
            taken(matrix[paw.row + 2][paw.col], "N") &&
            !nowall(matrix[paw.row + 3][paw.col]) &&
            permitted(matrix[behind_row_jump][behind_col_jump_left]) &&
            nowall(matrix[behind_row_jump - 1][behind_col_jump_left] - 1)
          ) {
            paws[index].forward_jump_left = {
              row: behind_row_jump,
              col: behind_col_jump_left,
            };
          }
        }
      }
    }
  }
}

function permitted(paw) {
  if (paw === " ") {
    return true;
  } else {
    return false;
  }
}

function nowall(paw) {
  if (paw === " ") {
    return true;
  } else {
    return false;
  }
}

function taken(paw, symbol) {
  if (paw === symbol) {
    return true;
  } else {
    return false;
  }
}

function inside(element, array_elements) {
  let result = false;

  for (let i = 0; i < array_elements.length; i++) {
    if (
      element.row == array_elements[i].row &&
      element.col == array_elements[i].col
    ) {
      return true;
    }
  }
  return result;
}

matrixCtrl.select_move = (board, player) => {
  //paintboard(server_message.data.board);
  

  const matrix = load_matrix(board);
  const paws = matrixCtrl.find_paws(matrix);
  
  


  //const paws_nexts = find_nexts (matrix, paws);
  //console.log (paws)

  let ways = [];
  let final_way = [];

   // let promise1 = new Promise((resolve, reject) => {
  //for (let i = 0; i < 4; i++) {
  for (let i = 0; i < paws.length; i++) {
    //for (let i = 0; i < 1; i++) {
    if (paws[i].type === player) {
      const trace = [];
      final_way = find_way(paws[i], trace, player, matrix);
      if (final_way) {
        console.log (final_way)
        ways.push(final_way);
      }
    }
  }
  console.log (paws)
  console.log (ways)
  if (ways.length > 0) {
    let shortest = 0;
    
    for (let i = 1; i < ways.length; i++) {
        if (ways[shortest].length > ways[i].length) {
          shortest = i;
      }
    } 


    console.log (ways)

    const next_move = {
      trace_length: ways[shortest].length,
      row_orig: ways [shortest][0].row,
      col_orig: ways [shortest][0].col,
      row_dest: ways [shortest][1].row,
      col_dest: ways [shortest][1].col,
    };
    
    return next_move;
  } else {
    console.log("There are no paths enabled");
    return null;
  }
};

function find_way (paw, trace, player, matrix) {

  let in_trace = false;
  in_trace = inside(paw, trace);

  if (
    (player === "N" && (paw.row === 16 || in_trace)) ||
    (player === "S" && (paw.row === 0 || in_trace))
  ) {
    
  
      trace.push(paw);
    
 
   
    return trace;
  } else {
    let next_cell = null;
    next_cell = find_forward_cell(paw, player, matrix);

    if (!next_cell) {
      next_cell = find_forward_jump_cell(paw, player, matrix);

      if (!next_cell) {
       
        next_cell = find_right_left(paw, player, trace, matrix);


      }
    }

    if (next_cell) {
      let in_trace = false;
      in_trace = inside(next_cell, trace);
      if (!(in_trace)) {
        trace.push(paw);
        const the_way = find_way(next_cell, trace, player, matrix);
        return the_way;
      }
      else {
        return null;
      }

    } else {
      if (!next_cell) {
        next_cell = find_behind_cell(paw, player, matrix);

        if (!next_cell) {
          next_cell = find_behind_jump_cell(paw, player, matrix);
        }

        if (next_cell) {

          let in_trace = false;
          in_trace = inside(next_cell, trace);
          if (!(in_trace)) {
            trace.push(paw);
            const the_way = find_way(next_cell, trace, player, matrix);
            if (the_way) {
              return the_way;
            }
            else {
              return null;
            }
          }
          else {
            return null;
          }

  
         
        } 
        else {
          return null;
        }
      }
    }
  }
}

function find_forward_cell(paw, paw_type, matrix) {
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
}

function find_forward_jump_cell(paw, paw_type, matrix) {
  let cell = null;
  if (paw_type === "N") {
    let forward_row_jump = paw.row + 4;

    if (
      forward_row_jump < 17 &&
      taken(matrix[paw.row + 2][paw.col], "S") &&
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

  //console.log (cell)

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
    in_trace = inside(next_cell_right, trace);

    if (!in_trace) {
      trace_right = [...trace];
      trace_right.push(paw);
      right_way = find_way(next_cell_right, trace_right, player, matrix);

    } else {
      right_way = null;
    }
  }

  next_cell_left = find_left_cell(paw, player, matrix);


  if (next_cell_left) {
    let in_trace = false;
    in_trace = inside(next_cell_left, trace); //Aca esta fallando. No lo encuentra en el camino y lo deberia llevar
    if (!in_trace) {
      trace_left = [...trace];
      trace_left.push(paw);
      left_way = find_way(next_cell_left, trace_left, player, matrix);

   
    } else {
      left_way = null;
    }
  }

  let response = null;

  if (right_way && left_way) {
    if (right_way.length <= left_way.length) {
      trace = [...trace_left];
      response = next_cell_right;
    } else {
      response = next_cell_left;
    }
  } else {
    if (!right_way && left_way) {
      trace = [...trace_left];
      response = next_cell_left;
    } else {
      if (right_way && !left_way) {
        trace = [...trace_right];
        response = next_cell_right;
      }
    }
  }
  return response;
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
        permitted(matrix[forward_row_jump][behind_col_jump_right])
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
        permitted(matrix[behind_row_jump][behind_col_jump_right]) &&
        nowall(matrix[behind_row_jump-1][behind_col_jump_right - 1])
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

module.exports = matrixCtrl;
