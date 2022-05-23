const playersCtrl = {}

playersCtrl.opponent_player = (player) => {
    let opponent = "S";
    if (player === "S") {
      opponent = "N";
    }
    return opponent;
  };

module.exports = playersCtrl;