const quoridorCtrl = {};
const chalk = require("chalk");
const { join } = require("path");
const { server } = require("websocket");
const fs = require('fs')

let { find_paws} = require("../utils/matrix");
let { select_move} = require("../controllers/moves_controller");
const { paintboard } = require("../utils/paint");
const {from_matrix_to_board} = require ("../utils/testing")
const {writeLog} = require ("../utils/utils")


quoridorCtrl.connectError = (error) => {
  console.log("Connect Error: " + error.toString());
};

quoridorCtrl.connectOk = (connection) => {
  
  console.log("WebSocket Client Connected");

  connection.on("error", quoridorCtrl.connectOk_error);

  connection.on("close", quoridorCtrl.connectOK_close);

  connection.on("message", (message) => {

    
    if (message.type === "utf8") {
      let server_message = JSON.parse(message.utf8Data);
      console.log (server_message.event );

      if (server_message.event == "list_users") {
        list_users(server_message);
      }
      
      if (server_message.event == "challenge") {
        challenge(server_message, connection);
      }

      if (server_message.event == "your_turn") {
        your_turn(server_message, connection);
      }
    } else {
      console.log("No valid message type");
    }
  });
};


quoridorCtrl.connectOk_error = (error) => {
  console.log("Connection Error: " + error.toString());
}

quoridorCtrl.connectOK_close = () => {
  console.log("echo-protocol Connection Closed");
}

const list_users = function (server_message) {
  let console_message = "Users connected: ";
  console.log(chalk.blue("Connected users: ") + server_message.data.users);
};

const challenge = function (server_message, connection) {
  const challenge_answer = JSON.stringify({
    action: "accept_challenge",
    data: {
      challenge_id: server_message.data.challenge_id,
    },
  });

  try {
    const answer = connection.sendUTF(challenge_answer);
    console.log(
      chalk.yellowBright("Challenge accepted to: ") +
        server_message.data.opponent
    );
  } catch (error) {
    console.log(error);
  }
};

const your_turn = function (server_message, connection) {

  let your_turn_answer = "";

  
  if (server_message.data.side === "N") {
   
    
    const board = server_message.data.board;
    const remaining_walls = server_message.data.walls
   
    const move = select_move(board, "N", remaining_walls);

    console.log ('move: ' + move);

    if (move) {
      if(move.type === 'move') {
     
        console.log("Movement N");
       // console.log(move);
  
        your_turn_answer = JSON.stringify({
          action: "move",
          data: {
            game_id: server_message.data.game_id,
            turn_token: server_message.data.turn_token,
            from_row: move.row_orig ,
            from_col: move.col_orig ,
            to_row: move.row_dest ,
            to_col: move.col_dest ,
          },
          hello: "Hi dear bot, I only know how to move paws N",
        });
      }
      else {
        your_turn_answer = JSON.stringify(
             
          {
              action: "wall",
              data: {
                game_id: server_message.data.game_id,
                turn_token: server_message.data.turn_token,
                row: move.row_dest,
                col: move.col_dest,
                orientation: "h",
              },
              hello: "Hi dear bot, I only know how to build a horizontal wall N",
            }
          );
      }
    } 
  

  } 
  else {

      const board = server_message.data.board;
      const remaining_walls = server_message.data.walls
      
      const move = select_move(board, "S",remaining_walls);
      if (move) {
        if (move.type === 'move') {
          console.log("Movement S");
         // console.log(move);
    
          your_turn_answer = JSON.stringify({
            action: "move",
            data: {
              game_id: server_message.data.game_id,
              turn_token: server_message.data.turn_token,
              from_row: move.row_orig,
              from_col: move.col_orig,
              to_row: move.row_dest,
              to_col: move.col_dest,
            },
            hello: "Hi dear bot, I only know how to move paws S",
          });
        }
        else {
          your_turn_answer = JSON.stringify(
               
            {
                action: "wall",
                data: {
                  game_id: server_message.data.game_id,
                  turn_token: server_message.data.turn_token,
                  row: move.row_dest,
                  col: move.col_dest,
                  orientation: "h",
                },
                hello: "Hi dear bot, I only know how to build a horizontal wall S",
              }
            );
    
        }
      }

      
  

    }
  
   
  if (your_turn_answer.length > 0) {
    const answer = connection.sendUTF(your_turn_answer);
    console.log(
      chalk.cyan(
        "My movement: " +
          server_message.data.player_1 +
          " " +
          server_message.data.player_2 +
          "-" +
          your_turn_answer
      )
    );
  } else {
    console.log("No next move");
    console.log (server_message.data.board);
  }
};

const matrix = [
  [
    'N', ' ', ' ', ' ', ' ', ' ', ' ', ' ', 'N', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '
  ],
  [
    ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '
  ],
  [
    ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '
  ],
  [
    ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '
  ],
  [
    ' ', ' ', ' ', ' ', ' ', ' ', 'S', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '
  ],
  [
    ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '
  ],
  [
    ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '
  ],
  [
    ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '
  ],
  [
    ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '
  ],
  [
    ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '
  ],
  [
    ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '
  ],
  [
    ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '-', '*', '-'
  ],
  [
    ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '
  ],
  [
    ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '
  ],
  
  [
    ' ', ' ', ' ', ' ', ' ', ' ', 'S', ' ', ' ', ' ', ' ', ' ', ' ', ' ', 'N', ' ', ' '
  ],
  [
    '-', '*', '-', ' ', '-', '*', '-', ' ', '-', '*', '-', ' ', '-', '*', '-', ' ', ' '
  ],
  [
    ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', 'S', ' ', ' ', ' ', ' ', ' ', ' '
  ]
]

  //writeLog ("fede2.txt")
  //const board = from_matrix_to_board (matrix)
  //console.log ('A'+ board+'A')
  //const paws_nexts = find_nexts (paws, matrix);

 // const move = select_move (board,  'S')  
   


module.exports = quoridorCtrl;
