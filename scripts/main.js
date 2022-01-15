(function () {
    'use strict'

    // let deck = [];
    // let shuffledDeck = [];

    const drawButton = document.querySelector('.draw');
    const newgameButton = document.querySelector('.new-game');
    newgameButton.addEventListener('click', startGame);
    drawButton.addEventListener('click', drawBothPlayers);
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

    // let player1 = new Player('you');
    // let player2 = new Player('computer');

    //SHUFFLES YOUR WIN CARDS WHEN YOU RUN OUT IN YOUR DECK

    Player.prototype.reset = function () {
        while (this.winPile.length > 0) {
            let index = (Math.floor(Math.random() * this.winPile.length));
            let card = this.winPile.splice(index, 1);
            this.dealtPile.push(card);
        };
        this.dealtPile = this.dealtPile.flat();
    };

    //----DRAWS 1 CARD AND RETURNS IT

    Player.prototype.draw1 = function () {
        let card = this.dealtPile.shift();
        this.drawnCards.unshift(card);
    };

    //----DECK

    function Deck(cards, shuffled) {
        this.cards = [];
        this.shuffled = [];
    };

    Deck.prototype.makeCards = function() {
        for (let i = 2; i < 7; i++) {
            this.cards.push(new Card(i, 'heart'));
            this.cards.push(new Card(i, 'spade'));
            // this.cards.push(new Card(i, 'diamond'));
            // this.cards.push(new Card(i, 'club'));
        };
    }

    Game.prototype.dealDeck = function() {
        this.player1.dealtPile = this.deck.shuffled.slice(0, (this.deck.shuffled.length / 2));
        this.player2.dealtPile = this.deck.shuffled.slice(this.deck.shuffled.length / 2, this.deck.shuffled.length);
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

    const currentGame = new Game;

    function startGame() {
        // const currentGame = new Game;
        currentGame.deck.makeCards();
        currentGame.deck.shuffle();
        currentGame.dealDeck();
        console.log(`good to go`);
        console.log(currentGame.player1);
        console.log(currentGame.player2);
        drawButton.addEventListener('click', this.draw);
    };



    //-----checks to see if you need to reshuffle the win pile or not and then draws 1 card. 

    Player.prototype.drawOne = function() {
        if (this.dealtPile.length < 2) {
            this.reset.call(this);
        };
            this.draw1.call(this);
        }

    Player.prototype.hasmoreCards = function() {
       let results = this.totalRemainingCards() > 0;
        console.log(results)
        return results;
    }

    Game.prototype.draw = function() {

        this.player1.drawOne();
        this.player2.drawOne();

        //-------tells you want you drew

        console.log(`\nYou drew the ${this.player1.drawnCards[0].value} of ${this.player1.drawnCards[0].suit}s`);
        console.log(`The computer drew the ${this.player2.drawnCards[0].value} of ${this.player2.drawnCards[0].suit}s`);
        

        //------compares the values of the drawn cards. 

        if (this.player1.drawnCards[0].value > this.player2.drawnCards[0].value) {
            if(this.player2.hasmoreCards === false) {
                console.log(`!!!!!!You win the game!!!!!!`);
            } else {
            console.log(`You win!`)
            this.player1.winPile.push(...this.player2.drawnCards.concat(this.player1.drawnCards));
            this.player1.drawnCards = [];
            this.player2.drawnCards = [];
            };
        } else if (this.player1.drawnCards[0].value < this.player2.drawnCards[0].value) {
            if(this.player1.hasmoreCards === false) {
                console.log(`You lose the game :((((((`)
            } else {
            console.log(`You lose :(`)
            this.player2.winPile.push(...this.player2.drawnCards.concat(this.player1.drawnCards));
            this.player1.drawnCards = [];
            this.player2.drawnCards = [];  
            };    
        } else if (this.player1.drawnCards[0].value === this.player1.drawnCards[0].value){
            if (this.player1.totalRemainingCards() >= 4 && this.player2.totalRemainingCards() >= 4) {
            console.log('ITS WAR')
            this.call(currentGame.player1);
            this.call(currentGame.player2);
            this.call(currentGame.player1);
            this.call(currentGame.player2);
            this.call(currentGame.player1);
            this.call(currentGame.player2);
            } else if (this.player1.totalRemainingCards() < 4) {
                console.log(`You lose the game :((((((`);
            } else if (this.player2.totalRemainingCards() < 4) {
                console.log(`You win the game!!!!!`);
        };
    };
        //logs the totals for both players

        console.log(`player 1 cards in play ${this.player1.drawnCards.length}`);
        console.log(`player 2 cards in play ${this.player2.drawnCards.length}`);
        console.log(`Player1 total remaining cards: ${this.player1.totalRemainingCards()}`);
        console.log(`Player2 total remaining cards: ${this.player2.totalRemainingCards()}`);
};

function drawBothPlayers() {
    currentGame.draw();
};






})();