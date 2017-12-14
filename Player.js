class Player {
  static get VERSION() {
    return '0.1';
  }

  static betRequest(gameState, bet) {
    bet(gameState.current_buy_in - gameState.players[gameState.in_action]['bet'] + gameState.minimum_raise);
  }

  static showdown(gameState) {
    //let currentPlayer = gameState.players.find(player => {
    //  return players.name === 'HauptsacheMatthiasVerliert');
    //}
  }
}

module.exports = Player;
