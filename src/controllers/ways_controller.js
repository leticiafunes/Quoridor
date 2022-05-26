const waysCtrl = {};

const { inTrace } = require("./paws_controllers");
const { opponent_player } = require("./players_controller");
const { nextLine, empty, insideBoard } = require("./common");

waysCtrl.find_way = (paw, trace, player, matrix) => {
  //console.log (trace)
  let the_way = null;
  let in_trace = false;
  in_trace = inTrace(paw, trace);

  if (
    (player === "N" &&
      (paw.row.toString() == process.env.MAX_BOARD_ROW || in_trace)) ||
    (player === "S" &&
      (paw.row.toString() == process.env.MIN_BOARD_ROW || in_trace))
  ) {
    if (in_trace) {
      return null;
    } else {
      trace.push(paw);
      return trace;
    }
  } else {
    let next_cell = null;

    the_way = find_forward_way(paw, player, matrix, trace);

    if (the_way) {
      return the_way;
    } else {
      the_way = find_lateral_way(paw, player, matrix, trace);

      if (the_way) {
        return the_way;
      } else {
        the_way = find_behind_way(paw, player, matrix, trace);
        if (the_way) {
          return the_way;
        } else {
          return the_way;
        }
      }
    }
  }
};

waysCtrl.shortest_way = (ways) => {
  let shortestway = null;
  let shortest_way_index = -1;

  if (ways.length > 0) {
    for (let i = 0; i < ways.length; i++) {
      if (way_with_final(ways[i])) {
        if (shortest_way_index < 0) {
          shortest_way_index = i;
        } else {
          if (ways[shortest_way_index].length > ways[i].length) {
            shortest_way_index = i;
          }
        }
      }
    }
    if (shortest_way_index < 0) {
      for (let i = 0; i < ways.length; i++) {
        if (!way_with_final(ways[i])) {
          if (shortest_way_index < 0) {
            shortest_way_index = i;
          } else {
            if (ways[shortest_way_index].length > ways[i].length) {
              
              shortest_way_index = i;
            }
          }
        }
      }
    }

    let shortestway = null;
    if (ways[shortest_way_index][0] && ways[shortest_way_index][1]) {
      if (
        ways[shortest_way_index][0].row === ways[shortest_way_index][1].row &&
        ways[shortest_way_index][0].col === ways[shortest_way_index][1].col &&
        ways[shortest_way_index][2]
      ) {
        shortestway = {
          way_length: ways[shortest_way_index].length,
          row_orig: ways[shortest_way_index][1].row,
          col_orig: ways[shortest_way_index][1].col,
          row_dest: ways[shortest_way_index][2].row,
          col_dest: ways[shortest_way_index][2].col,
        };
      } else {
        shortestway = {
          way_length: ways[shortest_way_index].length,
          row_orig: ways[shortest_way_index][0].row,
          col_orig: ways[shortest_way_index][0].col,
          row_dest: ways[shortest_way_index][1].row,
          col_dest: ways[shortest_way_index][1].col,
        };
      }

      return shortestway;
    }
  } else {
    return shortestway;
  }
};

waysCtrl.find_cell = (paw, player, matrix, direction) => {
  let next_row = paw.row;
  let next_col = paw.col;
  let next_darkline_row = paw.row;
  let next_darkline_col = paw.col;
  let cell = null;
  let sign = 1;
  if (player == "S") {
    sign = -1;
  }

  switch (direction) {
    case "forward":
      next_row = nextLine(paw.row, paw.col, "forward", 2, player);

      next_darkline_row = nextLine(paw.row, paw.col, "forward", 1, player);

      break;
    case "right":
      next_col = nextLine(paw.row, paw.col, "right", 2);
      next_darkline_col = nextLine(paw.row, paw.col, "right", 1, player);

      break;
    case "left":
      next_col = nextLine(paw.row, paw.col, "left", 2);
      next_darkline_col = nextLine(paw.row, paw.col, "left", 1, player);

      break;
    case "behind":
      next_row = nextLine(paw.row, paw.col, "behind", 2, player);
      next_darkline_row = nextLine(paw.row, paw.col, "behind", 1, player);

      break;
    default:
      console.log(`Wrong direction ${direction}`);
  }

  if (
    insideBoard(next_row, next_col) &&
    empty(matrix[next_darkline_row][next_darkline_col]) &&
    empty(matrix[next_row][next_col])
  ) {
    cell = {
      id: paw.id,
      row: next_row,
      col: next_col,
    };
    return cell;
  }

  return cell;
};

waysCtrl.find_cell_jump = (paw, player, matrix, direction) => {
  let next_row = paw.row;
  let next_col = paw.col;
  let next_darkline_row = paw.row;
  let next_darkline_col = paw.col;
  let after_next_darkline_row = paw.row;
  let after_next_darkline_col = paw.col;
  let taken_row = paw.row;
  let taken_col = paw.col;

  let next_col_right = paw.col;
  let next_col_left = paw.col;
  let next_darkline_col_right = paw.col;
  let next_darkline_col_left = paw.col;
  let after_next_darkline_col_right = paw.col;
  let after_next_darkline_col_left = paw.col;
  let taken_col_right = paw.col;
  let taken_col_left = paw.col;

  let cell = null;
  let sign = 1;

  if (player == "S") {
    sign = -1;
  }

  switch (direction) {
    case "forward":
      next_row = nextLine(paw.row, paw.col, "forward", 4, player);

      next_darkline_row = nextLine(paw.row, paw.col, "forward", 1, player);

      after_next_darkline_row = nextLine(
        paw.row,
        paw.col,
        "forward",
        3,
        player
      );

      taken_row = nextLine(paw.row, paw.col, "forward", 2, player);

      break;

    case "right":
      next_col = nextLine(paw.row, paw.col, "right", 4);
      next_darkline_col = nextLine(paw.row, paw.col, "right", 1);
      after_next_darkline_col = nextLine(paw.row, paw.col, "right", 3, player);

      taken_col = nextLine(paw.row, paw.col, "right", 2, player);

      break;
    case "left":
      next_col = nextLine(paw.row, paw.col, "left", 4);
      next_darkline_col = nextLine(paw.row, paw.col, "left", 1);
      after_next_darkline_col = nextLine(paw.row, paw.col, "left", 3, player);

      taken_col = nextLine(paw.row, paw.col, "left", 2, player);

      break;
    case "behind":
      next_row = nextLine(paw.row, paw.col, "behind", 4, player);

      next_darkline_row = nextLine(paw.row, paw.col, "behind", 1, player);

      after_next_darkline_row = nextLine(paw.row, paw.col, "behind", 3, player);

      taken_row = nextLine(paw.row, paw.col, "behind", 2, player);

      break;

    case "forward_diagonal":
      next_row = nextLine(paw.row, paw.col, "forward", 2, player);

      next_col_right = nextLine(paw.row, paw.col, "right", 2);
      next_col_left = nextLine(paw.row, paw.col, "left", 2);
      next_darkline_row = nextLine(paw.row, paw.col, "forward", 1, player);

      after_next_darkline_row = nextLine(
        paw.row,
        paw.col,
        "forward",
        3,
        player
      );

      taken_row = nextLine(paw.row, paw.col, "forward", 2, player);

      next_darkline_col_right = nextLine(paw.row, paw.col, "right", 1);
      next_darkline_col_left = nextLine(paw.row, paw.col, "left", 1);

      break;

    default:
      console.log(`Wrong direction ${direction}`);
  }

  if (
    insideBoard(next_row, next_col) &&
    taken(matrix[taken_row][taken_col], player) &&
    empty(matrix[next_darkline_row][next_darkline_col]) &&
    insideBoard(after_next_darkline_row, after_next_darkline_col) &&
    empty(matrix[after_next_darkline_row][after_next_darkline_col]) &&
    empty(matrix[next_row][next_col])
  ) {
    cell = {
      id: paw.id,
      row: next_row,
      col: next_col,
    };
    return cell;
  } else {
    if (
      insideBoard(next_row, next_col_right) &&
      taken(matrix[taken_row][taken_col_right], player) &&
      empty(matrix[next_darkline_row][next_col]) &&
      empty(matrix[next_row][next_col_right]) &&
      insideBoard(after_next_darkline_row, after_next_darkline_col_right) &&
      !empty(matrix[after_next_darkline_row][after_next_darkline_col_right]) &&
      empty(matrix[taken_row][next_darkline_col_right])
    ) {
      cell = {
        id: paw.id,
        row: next_row,
        col: next_col_right,
      };
      return cell;
    } else {
      if (
        insideBoard(next_row, next_col_left) &&
        taken(matrix[taken_row][taken_col_left], player) &&
        empty(matrix[next_darkline_row][next_darkline_col]) &&
        empty(matrix[next_row][next_col_left]) &&
        insideBoard(after_next_darkline_row, after_next_darkline_col_left) &&
        !empty(matrix[after_next_darkline_row][after_next_darkline_col_left]) &&
        empty(matrix[taken_row][next_darkline_col_left])
      ) {
        cell = {
          id: paw.id,
          row: next_row,
          col: next_col_left,
        };
        return cell;
      }
    }
  }

  return cell;
};

function find_forward_way(paw, player, matrix, trace) {
  let next_cell = null;
  let the_way = null;

  next_cell = waysCtrl.find_cell(paw, player, matrix, "forward");

  if (next_cell && !inTrace(next_cell, trace)) {
    trace.push(paw);
    the_way = waysCtrl.find_way(next_cell, trace, player, matrix);

    return the_way;
  } else {
    next_cell = waysCtrl.find_cell_jump(paw, player, matrix, "forward");

    if (next_cell && !inTrace(next_cell, trace)) {
      trace.push(paw);
      the_way = waysCtrl.find_way(next_cell, trace, player, matrix);
      return the_way;
    } else {
      next_cell = waysCtrl.find_cell_jump(
        paw,
        player,
        matrix,
        "forward_diagonal",
        player
      );
      if (next_cell && !inTrace(next_cell, trace)) {
        trace.push(paw);
        the_way = waysCtrl.find_way(next_cell, trace, player, matrix);
        return the_way;
      }
    }
  }
}

function find_lateral_way(paw, player, matrix, trace) {
  let next_cell = null;
  let the_way = null;

  next_cell = find_right_left(paw, player, trace, matrix);

  if (next_cell && !inTrace(next_cell, trace)) {
    trace.push(paw);
    the_way = waysCtrl.find_way(next_cell, trace, player, matrix);
    return the_way;
  }
  return the_way;
}

function find_behind_way(paw, player, matrix, trace) {
  let next_cell = null;
  let the_way = null;

  next_cell = waysCtrl.find_cell(paw, player, matrix, "behind");
  if (next_cell && !inTrace(next_cell, trace)) {
    trace.push(paw);
    trace.push(next_cell);
    trace.push(null);
    return trace;
  } else {
    next_cell = waysCtrl.find_cell_jump(paw, player, matrix, "behind", player);
    if (next_cell && !inTrace(next_cell, trace)) {
      trace.push(paw);
      trace.push(next_cell);
      return trace;
    }
  }
  return the_way;
}

function find_right_cell(paw, player, matrix) {
  let cell = null;
  let right_col = paw.col + 1;

  if (
    right_col < 17 &&
    empty(matrix[paw.row][paw.col + 1]) &&
    empty(matrix[paw.row][paw.col + 2])
  ) {
    cell = {
      id: paw.id,
      row: paw.row,
      col: paw.col + 2,
    };
  }

  return cell;
}

function find_left_cell(paw, player, matrix) {
  let cell = null;

  let left_col = paw.col - 1;
  if (
    left_col >= 0 &&
    empty(matrix[paw.row][paw.col - 1]) &&
    empty(matrix[paw.row][paw.col - 2])
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
      right_way = waysCtrl.find_way(
        next_cell_right,
        trace_right,
        player,
        matrix
      );
    } else {
      right_way = null;
    }
  } else {
    right_way = null;
  }

  next_cell_left = find_left_cell(paw, player, matrix);

  if (next_cell_left) {
    let in_trace = false;
    in_trace = inTrace(next_cell_left, trace);
    if (!in_trace) {
      trace_left = [...trace];
      trace_left.push(paw);
      left_way = waysCtrl.find_way(next_cell_left, trace_left, player, matrix);
    } else {
      left_way = null;
    }
  }

  if (right_way && left_way) {
    if (right_way.length <= left_way.length) {
      if (way_with_final(right_way)) {
        trace = [...trace_right];
        return next_cell_right;
      } else {
        if (way_with_final(left_way)) {
          trace = [...trace_left];
          return next_cell_left;
        }
      }
    } else {
      if (way_with_final(left_way)) {
        trace = [...trace_left];
        return next_cell_left;
      } else {
        trace = [...trace_right];
        return next_cell_right;
      }
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

function taken(paw, symbol) {
  const opponent = opponent_player(symbol);

  if (paw === opponent) {
    return true;
  } else {
    return false;
  }
}

function way_with_final(way) {
  const final = way[way.length - 1];

  if (final) {
    return true;
  } else {
    return false;
  }
}
module.exports = waysCtrl;
