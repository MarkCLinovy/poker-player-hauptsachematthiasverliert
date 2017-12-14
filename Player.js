class Player {
  static get VERSION() {
    return '0.2';
  }

  static betRequest(gameState, bet) {
    let player = gameState.players.find(player => player.name === 'HauptsacheMatthiasVerliert');

    if (Player.isCurrentlyPreflop(gameState)) {
      if (Player.preFlopAllin(player, gameState)) {
        bet(player.stack);
        return;
      } else if (gameState.players[gameState.in_action].bet < 100) {
        Player.call(bet, gameState);
        return;
      } else {
        bet(0);
        return;
      }
    } else if (Player.hasFlush(gameState, player)) {
      bet(player.stack);
      return;
    } else if (Player.isPairedWithBoard(gameState, player)) {
      if (Player.hasActivePlayerRaised(gameState)) {
        if (gameState.players[gameState.in_action].bet <= gameState.pot * 0.75) {
          bet(gameState.players[gameState.in_action].bet);
          return;
        } else {
          bet(0);
          return;
        }
      } else {
        bet(gameState.pot / 2);
        return;
      }
    } else {
      bet(0);
    }
  }

  static hasFlush(gameState, player) {
    let cardOneSuit = player.hole_cards[0].suit;
    let cardTwoSuit = player.hole_cards[1].suit;
    
    let firstSuitMatches = 0;
    let secondSuitMatches = 0;

    if (cardTwoSuit === cardOneSuit) {
      firstSuitMatches++;
      secondSuitMatches++;
    }

    for (let card in gameState.community_cards) {
      if (card.suit === cardOneSuit) {
        firstSuitMatches++;
      }
    }
    for (let card in gameState.community_cards) {
      if (card.suit === cardTwoSuit) {
        secondSuitMatches++;
      }
    }

    return firstSuitMatches >= 5 || secondSuitMatches >= 5;
  }
  static isPairedWithBoard(gameState, player) {
    let matchingCard = gameState.community_cards.find(card => card.rank === player.hole_cards[0].rank || card.rank === player.hole_cards[1].rank);
    
    return matchingCard !== undefined && matchingCard !== null;
  }

  static isCurrentlyPreflop(gameState) {
    return gameState.community_cards === null || gameState.community_cards === undefined || gameState.community_cards.length === 0;
  }

  static preFlopAllin(player, gameState) {
    let hasPocketPairOrHighCardAce = Player.hasPocketPair(player) || Player.hasHighCardAce(player);
    let existsAlliningPlayerAndHasRoyalCards = !Player.isAllin(gameState) && Player.areBothRoyal(player);

    return hasPocketPairOrHighCardAce || existsAlliningPlayerAndHasRoyalCards;
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
  
  static call(bet, gameState) {
    bet(gameState.current_buy_in - gameState.players[gameState.in_action].bet);
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
    let cardOneRoyal = player.hole_cards[0].rank === 'Q' || player.hole_cards[0].rank === 'K' || player.hole_cards[0].rank === 'A' || player.hole_cards[0].rank === '10' || player.hole_cards[0].rank === 'J';
    let secondCardRoyal = player.hole_cards[1].rank === 'Q' || player.hole_cards[1].rank === 'K' || player.hole_cards[1].rank === 'A' || player.hole_cards[1].rank === '10' || player.hole_cards[1].rank === 'J';
    return cardOneRoyal && secondCardRoyal;  
  }

  static isConnected(gameState) {

  }

  static hasHighCardAce(player) {
    return player.hole_cards[0].rank === 'A' || player.hole_cards[1].rank === 'A';
  }



  static hasActivePlayerRaised(gameState) {
    return true;
    // if (gameState.players[gameState.in_action].bet > gameState.minimum_raise) {
    //   return true;
    // }
    // return false;
  }
}

module.exports = Player;
