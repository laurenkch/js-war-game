(function () {
    'use strict'

    //---CONSTANTS, VARIABLES, AND EVENT LISTENERS

    const youDrawDisplay = document.querySelector('.your-current-hand');
    const compDrawsDisplay = document.querySelector('.comp-current-hand');
    const yourTotalsDisplay = document.querySelector('.your-totals');
    const compTotalsDisplay = document.querySelector('.comp-totals');
    const resultsDisplay = document.querySelector('.results');

    const drawButton = document.querySelector('.draw');
    const newgameButton = document.querySelector('.new-game');
    newgameButton.addEventListener('click', startGame);

    let currentGame = new Game;
    let gameOver = true;

    //---GAME CONSTRUCTOR

    function Game(deck = [], player1, player2) {
        this.deck = new Deck;
        this.player1 = new Player('you');
        this.player2 = new Player('computer');
    }

    //----PLAYER CONSTRUCTOR

    function Player(name, dealtPile = [], winPile = [], drawnCards = []) {
        this.name = name
        this.dealtPile = dealtPile
        this.winPile = winPile
        this.drawnCards = drawnCards
        this.totalRemainingCards = function() {
            let total = this.dealtPile.length + this.winPile.length
            return total;
        }
    };

    //----DECK CONSTRUCTOR

    function Deck(cards, shuffled) {
        this.cards = [];
        this.shuffled = [];
    };

    //---CARD CONSTRUCTOR

    function Card(value, suit) {
        this.value = value;
        this.suit = suit;
    };

    // --------DECK PROTOTYPE FUNCTIONS

    Deck.prototype.makeCards = function() {
        for (let i = 2; i < 15; i++) {
            this.cards.push(new Card(i, 'heart'));
            this.cards.push(new Card(i, 'spade'));
            this.cards.push(new Card(i, 'diamond'));
            this.cards.push(new Card(i, 'club'));
        };
    }

     Deck.prototype.shuffle = function() {
        while (this.cards.length > 0) {
            let index = (Math.floor(Math.random() * this.cards.length));
            let removed = this.cards.splice(index, 1);
            this.shuffled.push(removed);
        };
        this.shuffled = this.shuffled.flat();
    };


    //-------PLAYER PROTOTYPE FUCTIONS


    //-----checks to see if you need to reshuffle the win pile or not and then calls draw 1. 

    Player.prototype.drawOne = function() {
        if (this.dealtPile.length < 2) {
            this.reset.call(this);
        };
            this.draw1.call(this);
        }

    //draw 1
    Player.prototype.draw1 = function () {
        let card = this.dealtPile.shift();
        this.drawnCards.unshift(card);
    };

    //shuffles your cards from your win pile when you run out. 
    
    Player.prototype.reset = function () {
        while (this.winPile.length > 0) {
            let index = (Math.floor(Math.random() * this.winPile.length));
            let card = this.winPile.splice(index, 1);
            this.dealtPile.push(card);
        };
        this.dealtPile = this.dealtPile.flat();
    };

    Player.prototype.hasmoreCards = function() {
       return this.totalRemainingCards() > 0;
    };

    
     Player.prototype.canGoToWar = function() {
        return this.totalRemainingCards() >= 4
     };

    //--------GAME PROTOTYPE FUNCTIONS

    Game.prototype.dealDeck = function() {
        this.player1.dealtPile = this.deck.shuffled.slice(0, (this.deck.shuffled.length / 2));
        this.player2.dealtPile = this.deck.shuffled.slice(this.deck.shuffled.length / 2, this.deck.shuffled.length);
    };

    Game.prototype.readDrawResults = function() {
        youDrawDisplay.textContent = (`You drew:\n\n\n${this.player1.drawnCards[0].value} of ${this.player1.drawnCards[0].suit}s`);

        compDrawsDisplay.textContent = (`The computer drew:\n\n\n ${this.player2.drawnCards[0].value} of ${this.player2.drawnCards[0].suit}s`);
    };

    Game.prototype.compare = function() {
     if (this.player1.drawnCards[0].value > this.player2.drawnCards[0].value) {
         return `You win!`
        } else if (this.player1.drawnCards[0].value < this.player2.drawnCards[0].value) {
         return `You lose :(`
        } else {
         return 'ITS WAR'
        }
     };

    Game.prototype.draw = function() {

        this.player1.drawOne();
        this.player2.drawOne();

        this.readDrawResults();

        if (this.compare() === 'You win!') {
            if(this.player2.hasmoreCards() === false) {
                youDrawDisplay.textContent =`!!!!!!You win the game!!!!!!`;
                compDrawsDisplay.textContent = ''
                gameOver = true;
            } else {
            resultsDisplay.textContent =`You win!`;
            this.player1.winPile.push(...this.player2.drawnCards.concat(this.player1.drawnCards));
            this.player1.drawnCards = [];
            this.player2.drawnCards = [];
            };
        } else if (this.compare() === 'You lose :(') {
            if(this.player1.hasmoreCards() === false) {
                youDrawDisplay.textContent =`You lose the game :((((((`
                compDrawsDisplay.textContent = ''
                gameOver = true;
            } else {
            resultsDisplay.textContent =`You lose :(`;
            this.player2.winPile.push(...this.player2.drawnCards.concat(this.player1.drawnCards));
            this.player1.drawnCards = [];
            this.player2.drawnCards = [];
            };
        } else {
            if (this.player1.canGoToWar() && this.player2.canGoToWar()) {
                resultsDisplay.textContent = 'ITS WAR';
                this.player1.drawOne();
                this.player2.drawOne();
                this.player1.drawOne();
                this.player2.drawOne();
                this.player1.drawOne();
                this.player2.drawOne();
                } else if (this.player1.canGoToWar() === false && this.player2.canGoToWar()) {
                    resultsDisplay.textContent =`You can't go to war. You lose the game :((((((`;
                    gameOver = true;
                } else if (this.player2.canGoToWar() === false && this.player1.canGoToWar()) {
                    resultsDisplay.textContent =`Computer can't go to war. You win the game!!!!!`;
                    gameOver = true;
                } else {
                    resultsDisplay.textContent =`No one can go to war, it's a draw`;
                    gameOver = true;
                };
        }
        this.updateOverallResults();
    };

Game.prototype.updateOverallResults = function () {
    yourTotalsDisplay.textContent = `Your total cards:\n\n${this.player1.totalRemainingCards() + this.player1.drawnCards.length}`;
    compTotalsDisplay.textContent = `The computer's total cards:\n\n${this.player2.totalRemainingCards() + this.player2.drawnCards.length}`;
};

function startGame() {
    currentGame = new Game;
    currentGame.deck.makeCards();
    currentGame.deck.shuffle();
    currentGame.dealDeck();
    drawButton.addEventListener('click', drawBothPlayers);
    gameOver = false;
};

function drawBothPlayers() {
    if (gameOver === false) {
    currentGame.draw();
    };
};

})();


