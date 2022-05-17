
const matrixCtrl = {};

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

  matrixCtrl.suma =  (a,b) => {
      return a+b;
  }

module.exports = matrixCtrl;


