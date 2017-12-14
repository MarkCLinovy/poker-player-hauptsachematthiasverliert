class Player {
  static get VERSION() {
    return '0.2';
  }

  static betRequest(gameState, bet) {
    bet(0);
    return;
    if (hasActivePlayerRaised(gameState)) {
    } else {
      bet(gameState.current_buy_in - gameState.players[gameState.in_action]['bet'] + gameState.minimum_raise);
    }
  }

  static showdown(gameState) {
    //let currentPlayer = gameState.players.find(player => {
    //  return players.name === 'HauptsacheMatthiasVerliert');
    //}
  }

  static hasActivePlayerRaised(gameState) {
    if (gameState.players[gameState.in_action]['bet'] > gameState.minimum_raise) {
      return true;
    }
    return false;
  }
}

module.exports = Player;
