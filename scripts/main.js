(function () {
    'use strict'

    // let deck = [];
    // let shuffledDeck = [];


    const newgameButton = document.querySelector('.new-game');
    newgameButton.addEventListener('click', startGame);

    //---GAME

    function Game(deck = [], player1, player2) {
        this.deck = new Deck;
        this.player1 = new Player('you');
        this.player2 = new Player('computer');
    }

    //---CARDS

    function Card(value, suit) {
        this.value = value;
        this.suit = suit;
    };

    //-PLAYER

    function Player(name, hand = [], winPile = [], drawnCards = []) {
        this.name = name
        this.hand = hand
        this.winPile = winPile
        this.drawnCards = drawnCards
        this.totalRemainingCards = function() {
            let total = this.hand.length + this.winPile.length
            return total;
        }
    };

    // let player1 = new Player('you');
    // let player2 = new Player('computer');

    //SHUFFLES YOUR WIN CARDS WHEN YOU RUN OUT IN YOUR DECK

    Player.prototype.reset = function () {
        while (this.winPile.length > 0) {
            let index = (Math.floor(Math.random() * this.winPile.length));
            let card = this.winPile.splice(index, 1);
            this.hand.push(card);
        };
        this.hand = this.hand.flat();
    };

    //----DRAWS 1 CARD AND RETURNS IT

    function draw1() {
        let card = this.hand.shift();
        this.drawnCards.unshift(card);
    }

    //----DECK

    function Deck(cards, shuffled) {
        this.cards = [];
        this.shuffled = [];
    };

    Deck.prototype.makeCards = function() {
        for (let i = 2; i < 5; i++) {
            this.cards.push(new Card(i, 'heart'));
            this.cards.push(new Card(i, 'spade'));
            this.cards.push(new Card(i, 'diamond'));
            this.cards.push(new Card(i, 'club'));
        };
    }

    Game.prototype.dealDeck = function() {
        this.player1.hand = this.deck.shuffled.slice(0, (this.deck.shuffled.length / 2));
        this.player2.hand = this.deck.shuffled.slice(this.deck.shuffled.length / 2, this.deck.shuffled.length);
    };

    //---SHUFFLES THE DECK

     Deck.prototype.shuffle = function() {
        while (this.cards.length > 0) {
            let index = (Math.floor(Math.random() * this.cards.length));
            let removed = this.cards.splice(index, 1);
            this.shuffled.push(removed);
        };
        this.shuffled = this.shuffled.flat();
    };

    // //--DEALS THE DECK

    // function dealDeck(arr) {
    //     player1.deck = arr.slice(0, (arr.length / 2));
    //     player2.deck = arr.slice(arr.length / 2, arr.length);
    // }
    // dealDeck(shuffledDeck);

    const drawButton = document.querySelector('.draw');
    drawButton.addEventListener('click', draw);

    const currentGame = new Game;

    function startGame() {
        // const currentGame = new Game;
        currentGame.deck.makeCards();
        currentGame.deck.shuffle();
        currentGame.dealDeck();
        console.log(`good to go`);
        console.log(currentGame.player1);
        console.log(currentGame.player2);
    };

    //----LARGER OVERALL DRAW PROCESS

    function drawplayer() {
        if (this.hand.length < 2) {
            this.reset.call(this);
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

        drawplayer.call(currentGame.player1);
        drawplayer.call(currentGame.player2);

        //-------tells you want you drew

        console.log(`\nYou drew the ${currentGame.player1.drawnCards[0].value} of ${currentGame.player1.drawnCards[0].suit}s`);
        console.log(`The computer drew the ${currentGame.player2.drawnCards[0].value} of ${currentGame.player2.drawnCards[0].suit}s`);
        
        //------compares the values of the drawn cards. 

        if (currentGame.player1.drawnCards[0].value > currentGame.player2.drawnCards[0].value) {
            if(hasmoreCards.call(currentGame.player2)===false) {
                console.log(`!!!!!!You win the game!!!!!!`);
            } else {
            console.log(`You win!`)
            currentGame.player1.winPile.push(...currentGame.player2.drawnCards.concat(currentGame.player1.drawnCards));
            currentGame.player1.drawnCards = [];
            currentGame.player2.drawnCards = [];
            };
        } else if (currentGame.player1.drawnCards[0].value < currentGame.player2.drawnCards[0].value) {
            if(hasmoreCards.call(currentGame.player1)===false) {
                console.log(`You lose the game :((((((`)
            } else {
            console.log(`You lose :(`)
            currentGame.player2.winPile.push(...currentGame.player2.drawnCards.concat(currentGame.player1.drawnCards));
            currentGame.player1.drawnCards = [];
            currentGame.player2.drawnCards = [];  
            };    
        } else if (currentGame.player1.drawnCards[0].value === currentGame.player1.drawnCards[0].value){
            if (currentGame.player1.totalRemainingCards() >= 4 && currentGame.player2.totalRemainingCards() >= 4) {
            console.log('ITS WAR')
            drawplayer.call(currentGame.player1);
            drawplayer.call(currentGame.player2);
            drawplayer.call(currentGame.player1);
            drawplayer.call(currentGame.player2);
            drawplayer.call(currentGame.player1);
            drawplayer.call(currentGame.player2);
            } else if (currentGame.player1.totalRemainingCards() < 4) {
                console.log(`You lose the game :((((((`);
            } else if (currentGame.player2.totalRemainingCards() < 4) {
                console.log(`You win the game!!!!!`);
        };
    };
        //logs the totals for both players

        console.log(`Player1 total remaining cards: ${currentGame.player1.totalRemainingCards()}`);
        console.log(`Player2 total remaining cards: ${currentGame.player2.totalRemainingCards()}`);
};








})();