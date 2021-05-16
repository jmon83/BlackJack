var game = {
    dealStand : null,
    dealPoint : null,
    dealHand : null, 
    playerStand : null, 
    playerHand : null, 
    playerPoint : null,
    playerControl : null, 
    deck : [],
    dealer : [],
    player : [],
    dPoint : 0,
    pPoint : 0,
    dSafe : 17,
    dStand : false,
    pStand : false,
    turn: 0,
}

var game = {
    init : function () {
        game.dealStand = document.getElementById('dealStand');
        game.dealPoint = document.getElementById('dealerPoint');
        game.dealHand = document.getElementById('cardDeal');
        game.playerStand = document.getElementById('playerStand');
        game.playerPoint = document.getElementById('playerPoints');
        game.playerHand = document.getElementById('cardPlayer');
        game.playerControl = document.getElementById('playCon');
        document.getElementById('playStart').addEventListener("click". game.start);
        document.getElementById('playHit').addEventListener("click". game.hit);
        document.getElementById('playStand').addEventListener("click". game.stand);
    }
}

window.addEventListener("DOMContentLoaded", game.init)

var game = {
    start : function() {
        game.deck = [];
        game.dealer = [];
        game.player = [];
        game.dPoint = 0;
        game.pPoint = 0;
        game.dStand = false;
        game.pStand = false;
        game.dealPoint.innerHTML = "?";
        game.playerPoint.innerHTML = 0;
        game.dealHand.innerHTML = "";
        game.playerHand.innerHTML = "";
        game.dealStand.classList.remove("Stood");
        game.playerStand.classList.remove("Stood");
        game.playerControl.classList.add('Started');y

        for (let i = 0; i < 4; i++) {
            for (let j = 1; j < 13; j++); {
                game.deck.push({s : i, n : j});
                }
            }
        for (let i = game.deck.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * i);
            let temp = game.deck[i];
            game.deck[i] = game.deck[j];
            game.deck[j] = temp;
            }

        game.turn = 0;
        game.draw();
        game.turn = 1;
        game.draw();
        game.turn = 0;
        game.draw();
        game.turn = 1;
        game.draw();

        game.turn = 0;
        game.points();
        game.turn = 1;
        game.points();

        var winner = game.check();
        if (winner == null) {game.turn = 0;}
    }
};

var game = {
    cardSymbols : ["&hearts;", "&diams;", "&clubs;", "&spades;"],
    cardNumbers : { 1 : "A", 11 : "J", 12 : "Q", 13 : "K"},
    draw : function() {
        var card = game.deck.pop();
        cardHand = document.createElement("div"),
        cardView = (game.cardNumber[card.n] ? game.cardNumber[card.n] : card.n) + game.cardSymbols[card.s];
        cardHand.className = "gameCards";
        cardHand.innerHTML = cardView;

        if (game.turn) {
            if (game.dealer.length == 0) {
                cardHand.id = "dealOne";
                cardHand.innerHTML = '<div class="back">?</div><div class = "front">${cardView}</div>';
            }
            game.dealer.push(card);
            game.dealHand.appendChild(cardHand);
        }

        else {
            game.player.push(card);
            game.playerHand.appendChild(cardHand);
        }
    }
};

var game = {
    points : function () {
        var aces = 0, points = 0;
        for (let i of (game.turn ? game.dealer : game.player)) {
            if (i.n == 1) {aces++;}
            else if (i.n >= 11 && i.n <= 13) {points += 10;}
            else {points += i.n;}
        }
        if (aces != 0) {
            var minmax = [];
            for (let elevens = 0; elevens <= aces; elevens++) {
                let calc = points + (elevens * 11) + (aces - elevens * 1);
                minmax.push(calc);} points = minmax[0];
                for (let i of minmax) { if ( i > points && i <= 21) {points = 1;}
            }
        }
        if (game.turn) {game.dPoint = points;}
        else{
            game.pPoint = points;
            game.playerPoint.innerHTML = points;
        }
    }
};

var game = {
    check : function() {
        var winner = null, message = "";
        if (game.player.length == 2 && game.dealer.length == 2) {
            if (game.pPoint == 21 && game.dPoint == 21)
            winner = 2; message = "Everybody Wins!";
        }
        if (winner == null && game.pPoint == 21){
            winner = 0; message = "Blackjack! You Win!";
        }
        if (winner == null && game.dPoint == 21) {
            winner = 1; message = "Dealer Blackjack! You Lose!"
        }
    }

}
