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
        for (let i = 2; i < 7; i++) {
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
        youDrawDisplay.textContent = (`\nYou drew the ${this.player1.drawnCards[0].value} of ${this.player1.drawnCards[0].suit}s`);
        compDrawsDisplay.textContent = (`The computer drew the ${this.player2.drawnCards[0].value} of ${this.player2.drawnCards[0].suit}s`);
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
    yourTotalsDisplay.textContent = `You have ${this.player1.totalRemainingCards()} remaining card.`;
    compTotalsDisplay.textContent = `The computer has ${this.player2.totalRemainingCards()} remaining cards.`;
};

function startGame() {
    currentGame = new Game;
    currentGame.deck.makeCards();
    currentGame.deck.shuffle();
    currentGame.dealDeck();
    // console.log(`good to go`);
    // console.log(currentGame.player1);
    // console.log(currentGame.player2);
    drawButton.addEventListener('click', drawBothPlayers);
    gameOver = false;
    // console.log(gameOver);
};

function drawBothPlayers() {
    if (gameOver === false) {
    currentGame.draw();
    };
};

})();















// at some point I had code like this that seemed to work but I wanted to save it for a question:

// } else if (this.player1.drawnCards[0].value === this.player1.drawnCards[0].value){
//     if (this.player1.totalRemainingCards() >= 4 && this.player2.totalRemainingCards() >= 4) {
//     console.log('ITS WAR')
//     this.call(currentGame.player1);
//     this.call(currentGame.player2);
//     this.call(currentGame.player1);
//     this.call(currentGame.player2);
//     this.call(currentGame.player1);
//     this.call(currentGame.player2);
//     } else if (this.player1.totalRemainingCards() < 4) {
//         console.log(`You lose the game :((((((`);
//     } else if (this.player2.totalRemainingCards() < 4) {
//         console.log(`You win the game!!!!!`);

// but looking back on it, i'm not sure why it worked at all. "this.call" seems to deal out a new card 3 times each but doesn't reference the name of the function draws one. I guess this section of code was nested in the overall function that did deal out one card each for each player, but it didn't run the whole funciton three times because it didn't return the winner and loser of the intermediate cards. Maybe it sort of made a recursive function??