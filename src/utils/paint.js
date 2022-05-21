const paintCtrl = {};

const chalk = require("chalk");

paintCtrl.paintboard = (board_parameter) => {

  const board_string = board_parameter;
  let start = 0;
  let end = 17;

  console.log("   0a1b2c3d4e5f6g7h8");
  const walls = [" a ", " b ", " c ", " d ", " e ", " f ", " g ", " h "];
  const pawns = [" 0 ", " 1 ", " 2 ", " 3 ", " 4 ", " 5 ", " 6 ", " 7 ", " 8 "];
  let wall_indicator = 0;
  let pawns_indicator = 0;

  for (let i = 0; i < 17; i++) {
    //17 = 9 columns and 8 walls

    let tittle = "";
    if (i % 2) {
      tittle = walls[wall_indicator];
      wall_indicator++;

      console.log(
        tittle + "|" + chalk.bgGray(board_string.substring(start, end))
      );
    } else {
      tittle = pawns[pawns_indicator];
      pawns_indicator++;
      console.log(
        tittle + "|" + chalk.bgRed(board_string.substring(start, end))
      );
    }

    start = end;
    end = end + 17;
  }
};

module.exports = paintCtrl;
