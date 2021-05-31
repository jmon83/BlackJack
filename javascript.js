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
    dsymbols: ["&hearts;", "&diams;", "&clubs;", "&spades;"],
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
        var n = null
          , t = "";
        return 2 == game.player.length && 2 == game.dealer.length && (21 == game.pPoint && 21 == game.dPoint && (n = 2,
        t = "It's a tie with Blackjacks"),
        null == n && 21 == game.pPoint && (n = 0,
        t = "Player wins with a Blackjack!"),
        null == n && 21 == game.dPoint && (n = 1,
        t = "Dealer wins with a Blackjack!")),
        null == n && (game.pPoint > 21 && (n = 1,
        t = "Player has gone bust - Dealer wins!"),
        game.dPoint > 21 && (n = 0,
        t = "Dealer has gone bust - Player wins!")),
        null == n && game.dStand && game.pStand && (game.dPoint > game.pPoint ? (n = 1,
        t = "Dealer wins with " + game.dPoint + " !") : game.dPoint < game.pPoint ? (n = 0,
        t = "Player wins with " + game.pPoint + " !") : (n = 2,
        t = "It's a tie.")),
        null != n && (game.dealPoint.innerHTML = game.dPoint,
        document.getElementById("dealOne").classList.add("show"),
        game.playCon.classList.remove("started"),
        alert(t)),
        n
    },
    hit: function() {
        game.draw(),
        game.points(),
        0 != game.turn || 21 != game.pPoint || game.pStand || (game.pStand = !0,
        game.playerStand.classList.add("standing")),
        1 != game.turn || 21 != game.dPoint || game.dStand || (game.dStand = !0,
        game.dealStand.classList.add("standing")),
        null == game.check() && game.next()
    },
    stand: function() {
        game.turn ? (game.dStand = !0,
        game.dealStand.classList.add("standing")) : (game.pStand = !0,
        game.playerStand.classList.add("standing")),
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
    

