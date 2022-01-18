import {Deck} from "./deck.js";
import {Card} from "./card.js";
console.log(Deck);

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
    drawButton.addEventListener('click', drawBothPlayers);

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

    // function Deck(cards, shuffled) {
    //     this.cards = [];
    //     this.shuffled = [];
    // };

    //---CARD CONSTRUCTOR

    // function Card(value, suit) {
    //     this.value = value;
    //     this.suit = suit;
    // };

    // --------DECK PROTOTYPE FUNCTIONS

    // Deck.prototype.makeCards = function() {
    //     for (let i = 2; i < 15; i++) {
    //         this.cards.push(new Card(i, 'heart'));
    //         this.cards.push(new Card(i, 'spade'));
    //         this.cards.push(new Card(i, 'diamond'));
    //         this.cards.push(new Card(i, 'club'));
    //     };
    // }

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
        } 
        this.draw1();
        };

    // draw 1
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

     Player.prototype.readDrawResults = function() {
        let readout = "";
        switch (this.drawnCards[0].value) {
            case 11: 
            readout = `Jack of ${this.drawnCards[0].suit}s`;
            break;
            case 12:
            readout = `Queen of ${this.drawnCards[0].suit}s`;
            break;
            case 13: 
            readout = `King of ${this.drawnCards[0].suit}s`;
            break;
            case 14: 
            readout = `Ace of ${this.drawnCards[0].suit}s`;
            break;
            default:
            readout = `${this.drawnCards[0].value} of ${this.drawnCards[0].suit}s`
        }
        return readout
    };

    //--------GAME PROTOTYPE FUNCTIONS

    Game.prototype.dealDeck = function() {
        this.player1.dealtPile = this.deck.shuffled.slice(0, (this.deck.shuffled.length / 2));
        this.player2.dealtPile = this.deck.shuffled.slice(this.deck.shuffled.length / 2, this.deck.shuffled.length);
    };

    Game.prototype.updateDrawResults = function () {
        youDrawDisplay.textContent = `You drew:\n\n${this.player1.readDrawResults()}`;
        compDrawsDisplay.textContent = `The computer drew:\n\n${this.player2.readDrawResults()}`;
    };

    Game.prototype.compare = function() {
     if (this.player1.drawnCards[0].value > this.player2.drawnCards[0].value) {
         return `You win!`
        } else if (this.player1.drawnCards[0].value < this.player2.drawnCards[0].value) {
         return `You lose :(`
        } else {
         return `IT'S WAR`
        }
     };

     Game.prototype.player1WinsTheHand = function() {
        this.player1.winPile.push(...this.player2.drawnCards.concat(this.player1.drawnCards));
        this.player1.drawnCards = [];
        this.player2.drawnCards = [];
     };

     Game.prototype.player2WinsTheHand = function() {
        this.player2.winPile.push(...this.player2.drawnCards.concat(this.player1.drawnCards));
        this.player1.drawnCards = [];
        this.player2.drawnCards = [];
     }

    Game.prototype.draw = function() {

        this.player1.drawOne();
        this.player2.drawOne();

        if (this.compare() === 'You win!') {
            this.updateDrawResults();
            this.player1WinsTheHand();
            if(this.player2.hasmoreCards() === false) {
                resultsDisplay.textContent =`You won the game!!!!!!`;
                gameOver = true;
            } else {resultsDisplay.textContent =`You win!`;
            };
        } else if (this.compare() === 'You lose :(') {
            this.updateDrawResults();
            this.player2WinsTheHand();
            if(this.player1.hasmoreCards() === false) {
                resultsDisplay.textContent =`You lost the game :((((((`
                gameOver = true;
            } else {
            resultsDisplay.textContent =`You lose :(`;
            };
        } else { 
            this.displayWarCards();
        };
        //     if(this.player2.hasmoreCards() === false) {
        //         resultsDisplay.textContent =`The computer can't go to war.You won the game!!!!!!`;
        //         gameOver = true;
        //     }
        //     if(this.player1.hasmoreCards() === false) {
        //         resultsDisplay.textContent =`You can't go to war. You lost the game :((((((`
        //         gameOver = true; 
        //     }
        // }
        this.updateOverallResults();
    };

    Game.prototype.checkForWarWinner = function() {
        if(this.player2.hasmoreCards() === false) {
            resultsDisplay.textContent =`The computer can't go to war. You won the game!!!!!!`;
            gameOver = true;
        }
        if(this.player1.hasmoreCards() === false) {
            resultsDisplay.textContent =`You can't go to war. You lost the game :((((((`
            gameOver = true; 
        }
    }

    Game.prototype.displayWarCards = function() {
        this.checkForWarWinner();
        if(resultsDisplay.textContent === 'ITS WAR'){
            youDrawDisplay.textContent += `\n\n${this.player1.readDrawResults()}`;
            compDrawsDisplay.textContent += `\n\n${this.player2.readDrawResults()}`;
            } else {this.updateDrawResults(); 
                resultsDisplay.textContent = `IT'S WAR`;    
            }

            this.checkForWarWinner();
            //pull one
            this.player1.drawOne();
            youDrawDisplay.textContent += `\n\n       You place facedown:  ${this.player1.readDrawResults()}`;
            this.player2.drawOne();
            compDrawsDisplay.textContent += `\n\n       The computer places facedown:  ${this.player2.readDrawResults()}`;
            
            this.checkForWarWinner();
            //pull two
            this.player1.drawOne();
            youDrawDisplay.textContent += `,  ${this.player1.readDrawResults()}`;
            this.player2.drawOne();
            compDrawsDisplay.textContent += `,  ${this.player2.readDrawResults()}`;
            
            this.checkForWarWinner();
            //pull three
            this.player1.drawOne();
            youDrawDisplay.textContent += `,  ${this.player1.readDrawResults()}`;
            this.player2.drawOne();
            compDrawsDisplay.textContent += `,  ${this.player2.readDrawResults()}`;
            console.log(this.player1);
            console.log(this.player2)
            this.checkForWarWinner();
    };


    Game.prototype.updateOverallResults = function () {
        yourTotalsDisplay.textContent = `Your remaining cards:\n\n${this.player1.totalRemainingCards()}`;
        compTotalsDisplay.textContent = `The computer's remaining cards:\n\n${this.player2.totalRemainingCards()}`;
    };

    function startGame() {
        currentGame = new Game;
        currentGame.deck.makeCards();
        currentGame.deck.shuffle();
        currentGame.dealDeck();
        gameOver = false;
        currentGame.updateOverallResults();
        compDrawsDisplay.textContent = `The computer drew:`;
        youDrawDisplay.textContent = `You drew:`;
        resultsDisplay.textContent = 'Click draw to play your hand!';
    };

    function drawBothPlayers() {
        if (gameOver === false) {
        currentGame.draw();
        };
    };

})();


