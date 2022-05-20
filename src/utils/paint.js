const paintCtrl = {};

const chalk = require("chalk");

paintCtrl.paint_matrix = (matrix) => {
  console.log("  " + " 0  a  1  b  2  c  3  d  4  e  5  f  6  g  7  h  8 ");

  const walls = ["a", "b", "c", "d", "e", "f", "g", "h"];
  const pawns = ["0", "1", "2", "3", "4", "5", "6", "7", "8"];
  let wall_indicator = 0;
  let pawns_indicator = 0;

  for (let i = 0; i < 17; i++) {
    //17 = 9 columns and 8 walls

    let tittle = "";
    if (i % 2) {
      tittle = walls[wall_indicator];
      wall_indicator++;

      console.log(
        tittle +
          "|" +
          chalk.bgGray(" " + matrix[i][0] + " ") +
          chalk.bgGray(" " + matrix[i][1] + " ") +
          chalk.bgGray(" " + matrix[i][2] + " ") +
          chalk.bgGray(" " + matrix[i][3] + " ") +
          chalk.bgGray(" " + matrix[i][4] + " ") +
          chalk.bgGray(" " + matrix[i][5] + " ") +
          chalk.bgGray(" " + matrix[i][6] + " ") +
          chalk.bgGray(" " + matrix[i][7] + " ") +
          chalk.bgGray(" " + matrix[i][8] + " ") +
          chalk.bgGray(" " + matrix[i][9] + " ") +
          chalk.bgGray(" " + matrix[i][10] + " ") +
          chalk.bgGray(" " + matrix[i][11] + " ") +
          chalk.bgGray(" " + matrix[i][12] + " ") +
          chalk.bgGray(" " + matrix[i][13] + " ") +
          chalk.bgGray(" " + matrix[i][14] + " ") +
          chalk.bgGray(" " + matrix[i][15] + " ") +
          chalk.bgGray(" " + matrix[i][16] + " ")
      );
    } else {
      tittle = pawns[pawns_indicator];
      pawns_indicator++;
      console.log(
        tittle +
          "|" +
          chalk.bgGreen(" " + matrix[i][0] + " ") +
          chalk.bgGray(" " + matrix[i][1] + " ") +
          chalk.bgGreen(" " + matrix[i][2] + " ") +
          chalk.bgGray(" " + matrix[i][3] + " ") +
          chalk.bgGreen(" " + matrix[i][4] + " ") +
          chalk.bgGray(" " + matrix[i][5] + " ") +
          chalk.bgGreen(" " + matrix[i][6] + " ") +
          chalk.bgGray(" " + matrix[i][7] + " ") +
          chalk.bgGreen(" " + matrix[i][8] + " ") +
          chalk.bgGray(" " + matrix[i][9] + " ") +
          chalk.bgGreen(" " + matrix[i][10] + " ") +
          chalk.bgGray(" " + matrix[i][11] + " ") +
          chalk.bgGreen(" " + matrix[i][12] + " ") +
          chalk.bgGray(" " + matrix[i][13] + " ") +
          chalk.bgGreen(" " + matrix[i][14] + " ") +
          chalk.bgGray(" " + matrix[i][15] + " ") +
          chalk.bgGreen(" " + matrix[i][16] + " ")
      );
    }
  }
};

paintCtrl.paintboard = (board_parameter) => {
  /*const board = {
      event: "your_turn",
      data: {
        remaining_moves: 199.0,
        player_1: "eldalai@gmail.com",
        board:
          "  N     N     N                                                                                                                                                                                                                                                                   S     S     S  ",
        score_2: 0.0,
        player_2: "letyfunes@gmail.com",
        score_1: 2.0,
        walls: 10.0,
        side: "S",
        turn_token: "ccbf4588-3487-4917-b6ee-c1b0c62e7271",
        game_id: "3b74101c-cd3b-11ec-aef0-7ecdf393f9cc",
      },
    };*/

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
