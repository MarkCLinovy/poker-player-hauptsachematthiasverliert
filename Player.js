class Player {
  static get VERSION() {
    return '0.2';
  }

  static betRequest(gameState, bet) {
    if (hasPocketPair(gameState) || hasHighCardAce(gameState)) {
      let currentPlayer = gameState.players.find(player => {
        return players.name === 'HauptsacheMatthiasVerliert';
      });

      console.log(currentPlayer);
      bet(currentPlayer.stack);
      return;
    }

    if (hasActivePlayerRaised(gameState)) {
    } else {
      bet(gameState.current_buy_in - gameState.players[gameState.in_action]['bet'] + gameState.minimum_raise);
    }
  }

  static showdown(gameState) {

  }

  static hasPocketPair(gameState) {
    let player = gameState.players.find(player => players.name === 'HauptsacheMatthiasVerliert');

    return player['hole_cards'][0].rank === player['hole_cards'][1].rank;
  }

  static isSuited(gameState) {
  }

  static isConnected(gameState) {
  }

  static hasHighCardAce(gameState) {

  }



  static hasActivePlayerRaised(gameState) {
    if (gameState.players[gameState.in_action]['bet'] > gameState.minimum_raise) {
      return true;
    }
    return false;
  }
}

module.exports = Player;
