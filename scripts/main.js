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
        this.totalRemainingCards = function() {
            let total = this.deck.length + this.winPile.length
            return total;
        }
    };

    let player1 = new Player('you');
    let player2 = new Player('computer');

    //SHUFFLES YOUR WIN CARDS WHEN YOU RUN OUT IN YOUR DECK

    function reset() {
        while (this.winPile.length > 0) {
            let index = (Math.floor(Math.random() * this.winPile.length));
            let card = this.winPile.splice(index, 1);
            this.deck.push(card);
        };
        this.deck = this.deck.flat();
    };

    //DRAWS 1 CARD AND RETURNS IT

    function draw1() {
        let card = this.deck.shift();
        this.active.unshift(card);
    }


    //--MAKES A DECK
    function Deck() {
        for (let i = 2; i < 5; i++) {
            deck.push(new Card(i, 'heart'));
            deck.push(new Card(i, 'spade'));
            deck.push(new Card(i, 'diamond'));
            deck.push(new Card(i, 'club'));
        };
    };
    Deck();

    //---SHUFFLES THE DECK

    function shuffle(arr) {
        while (arr.length > 0) {
            let index = (Math.floor(Math.random() * arr.length));
            let removed = deck.splice(index, 1);
            shuffledDeck.push(removed);
        };
        shuffledDeck = shuffledDeck.flat();
    };
    shuffle(deck);

    //--DEALS THE DECK

    function dealDeck(arr) {
        player1.deck = arr.slice(0, (arr.length / 2));
        player2.deck = arr.slice(arr.length / 2, arr.length);
    }
    dealDeck(shuffledDeck);

    const drawButton = document.querySelector('.draw');
    drawButton.addEventListener('click', draw);

    //----LARGER OVERALL DRAW PROCESS

    function drawplayer() {
        if (this.deck.length < 2) {
            reset.call(this);
        };
            draw1.call(this);
        }

    function hasmoreCards() {
       let results = this.totalRemainingCards() > 0;
        console.log(results)
        return results;
    }

    function draw() {

        //-----checks to see if you need to reshuffle the win pile or not and then draws 1 card. 

        drawplayer.call(player1);
        drawplayer.call(player2);

        //-------tells you want you drew

        console.log(`\nYou drew the ${player1.active[0].value} of ${player1.active[0].suit}s`);
        console.log(`The computer drew the ${player2.active[0].value} of ${player2.active[0].suit}s`);
        
        //------compares the values of the drawn cards. 

        if (player1.active[0].value > player2.active[0].value) {
            if(hasmoreCards.call(player2)===false) {
                console.log(`!!!!!!You win the game!!!!!!`);
            } else {
            console.log(`You win!`)
            player1.winPile.push(...player2.active.concat(player1.active));
            player1.active = [];
            player2.active = [];
            };
        } else if (player1.active[0].value < player2.active[0].value) {
            if(hasmoreCards.call(player1)===false) {
                console.log(`You lose the game :((((((`)
            } else {
            console.log(`You lose :(`)
            player2.winPile.push(...player2.active.concat(player1.active));
            player1.active = [];
            player2.active = [];  
            };    
        } else if (player1.active[0].value === player1.active[0].value){
            if (player1.totalRemainingCards() >= 4 && player2.totalRemainingCards() >= 4) {
            console.log('ITS WAR')
            drawplayer.call(player1);
            drawplayer.call(player2);
            drawplayer.call(player1);
            drawplayer.call(player2);
            drawplayer.call(player1);
            drawplayer.call(player2);
            } else if (player1.totalRemainingCards() < 4) {
                console.log(`You lose the game :((((((`);
            } else if (player2.totalRemainingCards() < 4) {
                console.log(`You win the game!!!!!`);
        };
    };
        //logs the totals for both players

        console.log(`Player1 total remaining cards: ${player1.totalRemainingCards()}`);
        console.log(`Player2 total remaining cards: ${player2.totalRemainingCards()}`);
};








})();