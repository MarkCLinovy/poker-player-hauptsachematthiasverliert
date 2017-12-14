class Player {
  static get VERSION() {
    return '0.2';
  }

  static betRequest(gameState, bet) {
    let player = gameState.players.find(player => player.name === 'HauptsacheMatthiasVerliert');

    if (Player.isCurrentlyPreflop(gameState)) {
      if (Player.preFlopAllin(player, gameState)) {
        bet(player.stack);
        console.log("preflop: all in");
        return;
      } else if (gameState.players[gameState.in_action].bet < 100 && Player.hasLowPocket(player)) {
        bet(16);
        console.log("lowpocket bet 16");
        return;
      } else if (gameState.players[gameState.in_action].bet < 100 && Player.isOneRoyal(player)) {
        bet(16);
        console.log("one royal 3b");
        return;
      } else if (gameState.players[gameState.in_action].bet < 100) {
        Player.call(bet, gameState);
        console.log("preflop: < 16");
        return;
      } else if (Player.hasHighCardsJunge || Player.hasHighCardsKing || Player.hasHighCardsQueen) {
        bet(100);
        console.log("preflop-highcards: bet 100")
        return;
      } else {
        bet(0);
        console.log("preflop-else: bet 0");
        return;
      }
    } else if (Player.hasFlush(gameState, player)) {
      bet(player.stack);
      console.log("hasFlush");
      return;
    } else if (Player.hasTwoPairsWithBoard(gameState, player)) {
      bet(player.stack);
      console.log("hasTwoPairsWithBoard");
      return;
    } else if (Player.isPairedWithBoard(gameState, player)) {
      if (Player.hasActivePlayerRaised(gameState)) {
        if (gameState.players[gameState.in_action].bet <= gameState.pot * 0.75) {
          bet(gameState.players[gameState.in_action].bet);
          console.log("isPairedWithBoard && hasActivePlayerRaised");
          return;
        } else if (Player.hasTopPair(gameState, player)) {
          Player.call(bet, gameState);
          console.log("hasTopPair");
          return;
        } else {
          bet(0);
          console.log("bet 0");
          return;
        }
      } else {
        bet(gameState.pot / 2);
        return;
      }
    } else if (Player.hasFlushDraw(gameState, player) && gameState.players[gameState.in_action].bet <= gameState.pot) {
      Player.call(bet, gameState);   
      return;   
    } else {
      bet(0);
    }
  }

  static hasTopPair(gameState, player) {
    let highestCard = '1';

    for (let card in gameState.community_cards) {
      if (card.rank === 'A') {
        highestCard = 'A';
        break;
      } else if (card.rank === 'K') {
        if (highestCard !== 'A')
          highestCard = 'K';
      } else if (card.rank === 'Q') {
        if (highestCard !== 'A' && highestCard !== 'K')
          highestCard = 'Q';
      } else if (card.rank === 'J') {
        if (highestCard !== 'A' && highestCard !== 'K' && highestCard !== 'Q')
          highestCard = 'J';
      } else if (card.rank > highestCard) {
        highestCard = card.rank;
      }
    }

    let matchingCard = gameState.community_cards.find(card => card.rank === player.hole_cards[0].rank || card.rank === player.hole_cards[1].rank);
    
    return matchingCard.rank === highestCard;
  }

  static hasFlushDraw(gameState, player) {
    let cardOneSuit = player.hole_cards[0].suit;
    let cardTwoSuit = player.hole_cards[1].suit;
    
    let firstSuitMatches = 1;
    let secondSuitMatches = 1;

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

    return firstSuitMatches >= 4 || secondSuitMatches >= 4;
  }

  static hasFlush(gameState, player) {
    let cardOneSuit = player.hole_cards[0].suit;
    let cardTwoSuit = player.hole_cards[1].suit;
    
    let firstSuitMatches = 1;
    let secondSuitMatches = 1;

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

  static hasTwoPairsWithBoard(gameState, player) {
    let matchingFirstCard = gameState.community_cards.find(card => card.rank === player.hole_cards[0].rank);
    let matchingSecondCard = gameState.community_cards.find(card => card.rank === player.hole_cards[1].rank);

    return matchingFirstCard && matchingSecondCard;
  }

  static isPairedWithBoard(gameState, player) {
    let matchingCard = gameState.community_cards.find(card => card.rank === player.hole_cards[0].rank || card.rank === player.hole_cards[1].rank);
    
    return matchingCard !== undefined && matchingCard !== null;
  }

  static isCurrentlyPreflop(gameState) {
    return gameState.community_cards === null || gameState.community_cards === undefined || gameState.community_cards.length === 0;
  }

  static preFlopAllin(player, gameState) {
    let hasPocketPairOrHighCardAce = Player.hasPocketPair(player) || Player.hasHighCardAceAndSolidKicker(player);
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
  static hasLowPocket(player) {
    if (player.hole_cards[0].rank > 9) {
      return;
    }
    return player.hole_cards[0].rank === player.hole_cards[1].rank;
  }

  static hasPocketPair(player) {
    if (player.hole_cards[0].rank <= 9) {
      return;
    }
    return player.hole_cards[0].rank === player.hole_cards[1].rank;
  }

  static isSuited(player) {
    return player.hole_cards[0].suit === player.hole_cards[1].suit;
  }

  static isOneRoyal(player) {
    let cardOneRoyal = player.hole_cards[0].rank === 'Q' || player.hole_cards[0].rank === 'K' || player.hole_cards[0].rank === 'A';
    let secondCardRoyal = player.hole_cards[1].rank === 'Q' || player.hole_cards[1].rank === 'K' || player.hole_cards[1].rank === 'A';
    return cardOneRoyal || secondCardRoyal;  
  }

  static areBothRoyal(player) {
    let cardOneRoyal = player.hole_cards[0].rank === 'Q' || player.hole_cards[0].rank === 'K' || player.hole_cards[0].rank === 'A';
    let secondCardRoyal = player.hole_cards[1].rank === 'Q' || player.hole_cards[1].rank === 'K' || player.hole_cards[1].rank === 'A';
    return cardOneRoyal && secondCardRoyal;  
  }

  static isConnected(gameState) {

  }

  static isRoyal(card) {
    return card.rank === 'Q' || card.rank === 'K' || card.rank === 'J' || card.rank === '10';
  }

  static hasHighCardAceAndSolidKicker(player) {
    let solidKickerAndHighCardAce = false;
    
    if (player.hole_cards[0].rank === 'A') {
      solidKickerAndHighCardAce = Player.isRoyal(player.hole_cards[1]);
    } else if (player.hole_cards[1].rank === 'A') {
      solidKickerAndHighCardAce = Player.isRoyal(player.hole_cards[0]);
    }

    return solidKickerAndHighCardAce;
  }

  static hasHighCardsKing(player) {
    return player.hole_cards[0].rank === 'K' || player.hole_cards[1].rank === 'K';
  }

  static hasHighCardsJunge(player) {
    return player.hole_cards[0].rank === 'J' || player.hole_cards[1].rank === 'J';
  }

  static hasHighCardsQueen(player) {
    return player.hole_cards[0].rank === 'Q' || player.hole_cards[1].rank === 'Q';
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
