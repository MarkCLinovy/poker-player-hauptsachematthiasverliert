class Player {
  static get VERSION() {
    return '0.2';
  }

  static betRequest(gameState, bet) {
    let player = gameState.players.find(player => players.name === 'HauptsacheMatthiasVerliert');
    
    if (hasPocketPair(player) || hasHighCardAce(player)) {
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

  static hasPocketPair(player) {
    return player['hole_cards'][0].rank === player['hole_cards'][1].rank;
  }

  static isSuited(gameState) {
  }

  static isConnected(gameState) {
  }

  static hasHighCardAce(gameState) {
    return player['hole_cards'][0].rank === 'A' || player['hole_cards'][1].rank === 'A';
  }



  static hasActivePlayerRaised(gameState) {
    if (gameState.players[gameState.in_action]['bet'] > gameState.minimum_raise) {
      return true;
    }
    return false;
  }
}

module.exports = Player;
