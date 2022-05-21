const matrixCtrl = {};
const fs = require("fs");

let { opponent_player, shortest_way, load_matrix } = require("./utils");

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


function javascript_abort() {
  throw new error("This is not an error. This is just to abort javascript");
}




module.exports = matrixCtrl;
