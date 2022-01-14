(function () {
    'use strict'

    let deck = [];
    let shuffledDeck = [];


    // const newgameButton = document.querySelector('.new-game');
    // newgameButton.addEventListener('click', startGame);

    //---CARDS

    function Card(value, suit) {
        this.value = value;
        this.suit = suit;
    };

    //-PLAYER

    function Player(name, deck = [], winPile = [], active = [], total = 0) {
        this.name = name
        this.deck = deck
        this.winPile = winPile
        this.active = active
         this.totalCard = function() {
            let total = this.deck.length + this.winPile.length + this.active.length
            return total
        }
    };

    let player1 = new Player('you');
    let player2 = new Player('computer');

    //CARD SHUFFLE WHEN YOU RUN OUT IN YOUR DECK

    function reset() {
        while (this.winPile.length > 0) {
            let index = (Math.floor(Math.random() * this.winPile.length));
            let card = this.winPile.splice(index, 1);
            this.deck.push(card);
        };
        this.deck = this.deck.flat();
    };

    //DRAW 1 CARD AND RETURN A VALUE

    function draw1() {
        let card = this.deck.shift();
        this.active.unshift(card);
    }

    //----LARGER OVERALL DRAW PROCESS

    function drawplayer() {
        if (this.deck.length < 2) {
            reset.call(this);
        };
            draw1.call(this);
        }


    function draw() {

        //checks to see if you need to reshuffle the winpile or not. 

        drawplayer.call(player1);
        drawplayer.call(player2);

        console.log(`You drew the ${player1.active[0].value} of ${player1.active[0].suit}s`);
        console.log(`The computer drew the ${player2.active[0].value} of ${player2.active[0].suit}s`);
        
        //compares the value of the drawn cards. 

        if (player1.active[0].value > player2.active[0].value) {
            console.log('You win!')
            player1.winPile.push(...player2.active.concat(player1.active));
            player1.active = [];
            player2.active = [];
        } else if (player1.active[0].value < player2.active[0].value) {
            console.log(`You lose :(`)
            player2.winPile.push(...player2.active.concat(player1.active));
            player1.active = [];
            player2.active = [];      
        } else if (player1.active[0].value === player1.active[0].value){
            console.log('ITS WAR')
            drawplayer.call(player1);
            drawplayer.call(player2);
            drawplayer.call(player1);
            drawplayer.call(player2);
        };
        console.log(`You have ${player1.totalCard()} total cards.`);
        console.log(`The computer has ${player2.totalCard()} total cards`);
    console.log(`There are ${player1.deck.length + player1.active.length + player1.winPile.length + player2.deck.length + player2.active.length + player2.winPile.length} total cards in play`)
        console.log(`your deck: ${player1.deck.length}`);
        console.log(`the computer's deck: ${player2.deck.length}`);
    };

    //--DECK
    function Deck() {
        for (let i = 2; i < 15; i++) {
            deck.push(new Card(i, 'heart'));
            deck.push(new Card(i, 'spade'));
            deck.push(new Card(i, 'diamond'));
            deck.push(new Card(i, 'club'));
        };
    };
    Deck();

    //---SHUFFLE

    function shuffle(arr) {
        while (arr.length > 0) {
            let index = (Math.floor(Math.random() * arr.length));
            let removed = deck.splice(index, 1);
            shuffledDeck.push(removed);
        };
        shuffledDeck = shuffledDeck.flat();
    };
    shuffle(deck);

    //--DEAL THE DECK

    function dealDeck(arr) {
        player1.deck = arr.slice(0, (arr.length / 2));
        player2.deck = arr.slice(arr.length / 2, arr.length);
    }
    dealDeck(shuffledDeck);

    const drawButton = document.querySelector('.draw');
    drawButton.addEventListener('click', draw);

    //--DRAW












})();