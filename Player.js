class Player {
  static get VERSION() {
    return '0.2';
  }

  static betRequest(gameState, bet) {
    let player = gameState.players.find(player => player.name === 'HauptsacheMatthiasVerliert');
    
    if (Player.hasPocketPair(player) || Player.hasHighCardAce(player)) {
      bet(player.stack);
      console.log("allin because pocket pair or high card ace");
      return;
    } else if(!Player.hasActivePlayerRaised(gameState)) {
      bet(100);
      return;
    }
  }

  static minRaise(gameState) {
    bet(gameState.current_buy_in - gameState.players[gameState.in_action]['bet'] + gameState.minimum_raise);
  }
  static showdown(gameState) {

  }

  static hasPocketPair(player) {
    return player.hole_cards[0].rank === player.hole_cards[1].rank;
  }

  static isSuited(player) {
    return player.hole_cards[0].suit === player.hole_cards[1].suit;
  }

  static isOneRoyal(player) {

  }

  static areBothRoyal(player) {
    if (player.hole_cards[0].rank === 'Q' || player.hole_cards[0].rank === 'K' || player.hole_cards[0].rank === 'A' || player.hole_cards[0].rank === 'T' || player.hole_cards[0].rank === 'J') 
  }

  static isConnected(gameState) {

  }

  static hasHighCardAce(player) {
    return player.hole_cards[0].rank === 'A' || player.hole_cards[1].rank === 'A';
  }



  static hasActivePlayerRaised(gameState) {
    if (gameState.players[gameState.in_action].bet > gameState.minimum_raise) {
      return true;
    }
    return false;
  }
}

module.exports = Player;
