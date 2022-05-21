const testingCtrl = {}

testingCtrl.from_matrix_to_board = (matrix) => {
    let board = "";
    for (let i = 0; i < matrix.length; i++) {
      for (let j = 0; j < matrix.length; j++) {
        board = board + matrix[i][j];
      }
    }
    return board;
  };

module.exports = testingCtrl;