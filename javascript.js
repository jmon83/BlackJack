
var game = {     dealStand: null,
    dealPoint: null,
    dealHand: null,
    dealStand: null,
    playerStand: null,
    playerPoint: null,
    playerHand: null,
    playCon: null,
    deck: [],
    dealer: [],
    player: [],
    dPoint: 0,
    pPoint: 0,
    dSafe: 17,
    dStand: !1,
    pStand: !1,
    turn: 0,
    init: function() {
        game.dealStand = document.getElementById("dealStand"),
        game.dealPoint = document.getElementById("dealerPoint"),
        game.dealHand = document.getElementById("cardDeal"),
        game.playerStand = document.getElementById("playerStand"),
        game.playerPoint = document.getElementById("playerPoints"),
        game.playerHand = document.getElementById("cardPlayer"),
        game.playCon = document.getElementById("playCon"),
        document.getElementById("playStart").addEventListener("click", game.start),
        document.getElementById("playHit").addEventListener("click", game.hit),
        document.getElementById("playStand").addEventListener("click", game.stand)
    },
    start: function() {
        game.deck = [],
        game.dealer = [],
        game.player = [],
        game.dPoint = 0,
        game.pPoint = 0,
        game.dStand = !1,
        game.pStand = !1,
        game.dealPoint.innerHTML = "?",
        game.playerPoint.innerHTML = 0,
        game.dealHand.innerHTML = "",
        game.playerHand.innerHTML = "",
        game.dealStand.classList.remove("standing"),
        game.playerStand.classList.remove("standing"),
        game.playCon.classList.add("started");
        for (let n = 0; n < 4; n++)
            for (let t = 1; t < 14; t++)
                game.deck.push({
                    s: n,
                    n: t
                });
        for (let n = game.deck.length - 1; n > 0; n--) {
            let t = Math.floor(Math.random() * n)
              , d = game.deck[n];
            game.deck[n] = game.deck[t],
            game.deck[t] = d
        }
        game.turn = 0,
        game.draw(),
        game.turn = 1,
        game.draw(),
        game.turn = 0,
        game.draw(),
        game.turn = 1,
        game.draw(),
        game.turn = 0,
        game.points(),
        game.turn = 1,
        game.points(),
        null == game.check() && (game.turn = 0)
    },
    dsymbols: ['<span style="color: red">&hearts;</span>', '<span style="color: red">&diams;</span>', "&clubs;", "&spades;"],
    dnum: {
        1: "A",
        11: "J",
        12: "Q",
        13: "K"
    },
    draw: function() {
        var n = game.deck.pop()
          , t = document.createElement("div")
          , d = (game.dnum[n.n] ? game.dnum[n.n] : n.n) + game.dsymbols[n.s];
        t.className = "gameCards",
        t.innerHTML = d,
        game.turn ? (0 == game.dealer.length && (t.id = "dealOne",
        t.innerHTML = `<div class="back">?</div><div class="front">${d}</div>`),
        game.dealer.push(n),
        game.dealHand.appendChild(t)) : (game.player.push(n),
        game.playerHand.appendChild(t))
    },
    points: function() {
        var n = 0
          , t = 0;
        for (let d of game.turn ? game.dealer : game.player)
            1 == d.n ? n++ : d.n >= 11 && d.n <= 13 ? t += 10 : t += d.n;
        if (0 != n) {
            var d = [];
            for (let e = 0; e <= n; e++) {
                let s = t + 11 * e + (n - 1 * e);
                d.push(s)
            }
            t = d[0];
            for (let n of d)
                n > t && n <= 21 && (t = n)
        }
        game.turn ? game.dPoint = t : (game.pPoint = t,
        game.playerPoint.innerHTML = t)
    },
    check: function() {
        var n = null;
        if (game.player.length && 2 == game.dealer.length && (21 == game.pPoint && 21 == game.dPoint)) {
            game.dealPoint.innerHTML = game.dPoint;
            document.getElementById("dealOne").classList.add("show");
            document.getElementById("infoMessage").classList.add("show");
            document.getElementById("playHit").remove();

        return $('<h2><a class="none" href="">Push! Play Again?</a></h2>').hide().appendTo('#infoMessage').delay(250).fadeIn(250);
    } else {
        if (21 == game.pPoint) {
            game.dealPoint.innerHTML = game.dPoint;
            document.getElementById("dealOne").classList.add("show");
            document.getElementById("infoMessage").classList.add("show");
            document.getElementById("playHit").remove();
    return $('<h2><a class="none" href="">Blackjack! You Win! Deal Again?</a></h2>').hide().appendTo('#infoMessage').delay(250).fadeIn(250);
    } else {
        if (game.dPoint == 21) {
            game.dealPoint.innerHTML = game.dPoint;
            document.getElementById("dealOne").classList.add("show");
            document.getElementById("infoMessage").classList.add("show");
            document.getElementById("playHit").remove();
    return $('<h2><a class="none" href="">Dealer Blackjack! You Lose! Deal Again?</a></h2>').hide().appendTo('#infoMessage').delay(250).fadeIn(250);
    } else {
        if (game.pPoint > 21) {
            game.dealPoint.innerHTML = game.dPoint;
            document.getElementById("dealOne").classList.add("show");
            document.getElementById("infoMessage").classList.add("show");
            document.getElementById("playHit").remove();
            return $('<h2><a class="none" href="">Bust! You Lose! Deal Again?</a></h2>').hide().appendTo('#infoMessage').delay(250).fadeIn(250);
        } else {
            if (game.dPoint > 21) {
                game.dealPoint.innerHTML = game.dPoint;
                document.getElementById("dealOne").classList.add("show");
                document.getElementById("infoMessage").classList.add("show");
                document.getElementById("playHit").remove();
                return $('<h2><a class="none" href="">Dealer Bust! You Win! Deal Again?</a></h2>').hide().appendTo('#infoMessage').delay(250).fadeIn(250);
            } else {
                if (game.dStand && game.pStand && (game.dPoint > game.pPoint)) {
                    game.dealPoint.innerHTML = game.dPoint;
                    document.getElementById("dealOne").classList.add("show");
                    document.getElementById("infoMessage").classList.add("show");
                    document.getElementById("playHit").remove();
                    return $('<h2><a class="none" href="">Dealer Wins! Deal Again?</a></h2>').hide().appendTo('#infoMessage').delay(250).fadeIn(250);
                } else {
                    if (game.dStand && game.pStand && (game.dPoint < game.pPoint)) {
                        game.dealPoint.innerHTML = game.dPoint;
                        document.getElementById("dealOne").classList.add("show");
                        document.getElementById("infoMessage").classList.add("show");
                        document.getElementById("playHit").remove();
                        return $('<h2><a class="none" href="">You Win! Deal Again?</a></h2>').hide().appendTo('#infoMessage').delay(250).fadeIn(250);
                    }
                }
            }
        }}}}},
    

    hit: function() {
        game.draw(),
        game.points(),
        0 != game.turn || 21 != game.pPoint || game.pStand || (game.pStand = !0,
        game.playerStand.classList.add("standing")),
        1 != game.turn || 21 != game.dPoint || game.dStand || (game.dStand = !0,
        game.dealStand.classList.add("standing"), document.getElementById("dealOne").classList.add("show")),
        null == game.check() && game.next()
    },
    stand: function() {
        game.turn ? (game.dStand = !0,
        game.dealStand.classList.add("standing")) : (game.pStand = !0,
        game.playerStand.classList.add("standing"), document.getElementById("dealOne").classList.add("show")),
        null == (game.pStand && game.dStand ? game.check() : null) && game.next()
    },
    next: function() {
        game.turn = 0 == game.turn ? 1 : 0,
        1 == game.turn ? game.dStand ? game.turn = 0 : game.ai() : game.pStand && (game.turn = 1,
        game.ai())
    },
    ai: function() {
        game.turn && (game.dPoint >= game.dSafe ? game.stand() : game.hit())
    }
    };
    window.addEventListener("DOMContentLoaded", game.init);
    

