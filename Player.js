class Player {
  static get VERSION() {
    return '0.2';
  }

  static betRequest(gameState, bet) {
    let player = gameState.players.find(player => player.name === 'HauptsacheMatthiasVerliert');
    Player.preFlopAllin(player, gameState);
    Player.preFlopCall(player, gameState);
     

    bet(50);
  }

  static preFlopCall(player, gameState) {
    if (gameState.players[gameState.in_action].bet <= 3 * gameState.minimum_raise) {
      bet(gameState.players[gameState.in_action].bet);
    }
  }

  static preFlopAllin(player, gameState) {
    if (Player.hasPocketPair(player) || Player.hasHighCardAce(player)) {
      bet(player.stack);
      console.log("allin because pocket pair or high card ace");
      return;
    } else if (!Player.isAllin(gameState) && Player.areBothRoyal(player)) {
      console.log("going allin with 2 royals because noone else went allin before");
      bet(player.stack);
    }
  }
  static isAllin(gameState) {
    let isAllin = false;
    
    for (let player in gameState.players) {
      if (player.bet > 0 && player.stack === 0) {
        isAllin = true;
        break;
      }
    }

    return isAllin;
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
    let cardOneRoyal = player.hole_cards[0].rank === 'Q' || player.hole_cards[0].rank === 'K' || player.hole_cards[0].rank === 'A' || player.hole_cards[0].rank === 'T' || player.hole_cards[0].rank === 'J';
    let secondCardRoyal = player.hole_cards[1].rank === 'Q' || player.hole_cards[1].rank === 'K' || player.hole_cards[1].rank === 'A' || player.hole_cards[1].rank === 'T' || player.hole_cards[1].rank === 'J';
    return cardOneRoyal && secondCardRoyal;  
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
