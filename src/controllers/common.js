const ctrlCommon = {};

ctrlCommon.nextLine = (row, col, direction, steps, player) => {
  let sign = 1;
  if (player === "S") {
    sign = -1;
  }

  let line = -1;
  switch (direction) {
    case "forward":
      line = row + (steps*sign);
      break;
    case "right":
      line = col + steps;
      break;
    case "left":
      line = col - steps;
      break;
    case "behind":
      line = row - (steps*sign);
      break;
    default:
      console.log(`Wrong line`);
  }
  return line;
};


ctrlCommon.empty = (paw_value) => {
  let result = false;

  if (paw_value === " ") {
    result = true;
  }

  return result;
};

ctrlCommon.insideBoard = (row, col) => {
  let result = false;

  if (row >= 0 && row < 17 && col >= 0 && col < 17) {
    result = true;
  }

  return result;
};

module.exports = ctrlCommon;
