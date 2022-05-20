const matrixCtrl = {};
const fs = require("fs");

let { opponent_player, shortest_way, load_matrix } = require("./utils");

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
};
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

  if (!element) {
    return true;
  }

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

  const opponent = opponent_player(player);
  const matrix = load_matrix(board);
  const paws = matrixCtrl.find_paws(matrix);

  //const paws_nexts = find_nexts (matrix, paws);
  //console.log (paws)

  let ways = [];
  let final_way = [];
  let ways_opponent = [];
  let final_way_opponent = [];

  for (let i = 0; i < paws.length; i++) {
    if (paws[i].type === player) {
      const trace = [];
      final_way = find_way(paws[i], trace, player, matrix);
      if (final_way) {
        ways.push(final_way);
      } else {
      }
    } else {
      const trace_opponent = [];
      final_way_opponent = find_way(paws[i], trace_opponent, opponent, matrix);
      if (final_way_opponent) {
        ways_opponent.push(final_way_opponent);
      } else {
        console.log("No way for " + i + ": opponent");
      }
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

  if (shortest_player) {
    const next_move = {
      trace_length: shortest_player.length,
      row_orig: shortest_player[0].row,
      col_orig: shortest_player[0].col,
      row_dest: shortest_player[1].row,
      col_dest: shortest_player[1].col,
    };

    return next_move;
  } else {
    console.log("There are no paths enabled");
    setTimeout(function () {
      console.log("There are no paths enabled");
    }, 7000);
    return null;
  }
};

function find_way(paw, trace, player, matrix) {
  const camino = trace.toString();
  const content = paw.id + ":" + paw.row + "-" + paw.col + "\n";

  let in_trace = false;
  in_trace = inside(paw, trace);

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

    if (next_cell && !inside(next_cell, trace)) {
      trace.push(paw);
      const the_way = find_way(next_cell, trace, player, matrix);

      return the_way;
    } else {
      next_cell = find_forward_jump_cell(paw, player, matrix);

      if (next_cell && !inside(next_cell, trace)) {
        trace.push(paw);
        const the_way = find_way(next_cell, trace, player, matrix);
        return the_way;
      } else {
        next_cell = find_right_left(paw, player, trace, matrix);

        if (next_cell && !inside(next_cell, trace)) {
          trace.push(paw);
          const the_way = find_way(next_cell, trace, player, matrix);
          return the_way;
        } else {
          next_cell = find_behind_cell(paw, player, matrix);
          if (next_cell && !inside(next_cell, trace)) {
            trace.push(paw);
            trace.push(next_cell);
            return trace;
          } else {
            next_cell = find_behind_jump_cell(paw, player, matrix);
            if (next_cell && !inside(next_cell, trace)) {
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
}

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
    in_trace = inside(next_cell_right, trace);

    if (!in_trace) {
      trace_right = [...trace];
      trace_right.push(paw);
      right_way = find_way(next_cell_right, trace_right, player, matrix);
    } else {
      right_way = null;
    }
  } else {
    right_way = null;
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

function javascript_abort() {
  throw new error("This is not an error. This is just to abort javascript");
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

matrixCtrl.convertir_a_board = (matrix) => {
  let board = "";
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix.length; j++) {
      board = board + matrix[i][j];
    }
  }
  return board;
};

module.exports = matrixCtrl;
