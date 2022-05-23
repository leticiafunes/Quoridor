const ctrlCommon = {}

ctrlCommon.nextLine = (row, col, direction, steps) => {
    let line = -1;
    switch (direction) {
      case "forward":
        line = row + steps;
        break;
      case "right":
        line = col + steps;
        break;
      case "left":
        line = col - steps;
        break;
      case "behind":
        line = row - steps;
        break;
      default:
        console.log(`Wrong line`);
    }
    return line;
  }

ctrlCommon.empty = (paw_value) =>  {
    let result = false;
  
    if (paw_value === " ") {
      result = true;
    } 
    //console.log ('empty: ' + result + 'paw_value' + paw_value)
  
    return result;
  }
  
  ctrlCommon.insideBoard = (row, col) =>  {
    let result = false;
  
    if (row >= 0 && row < 17 && col >= 0 && col < 17) {
      result = true;
    }
  
    //console.log ('inside board: ' + result)
  
    return result;
  }
  
module.exports = ctrlCommon;