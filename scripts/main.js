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
        // drawButton.addEventListener('click', this.draw);
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
        return results;
    };

    Game.prototype.readDrawResults = function() {
        console.log(`\nYou drew the ${this.player1.drawnCards[0].value} of ${this.player1.drawnCards[0].suit}s`);
        console.log(`The computer drew the ${this.player2.drawnCards[0].value} of ${this.player2.drawnCards[0].suit}s`);
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

     Player.prototype.canGoToWar = function() {
        return this.totalRemainingCards() >= 4
     };

     Game.prototype.updateOverallResults = function () {
        console.log(`player 1 cards in play ${this.player1.drawnCards.length}`);
        console.log(`player 2 cards in play ${this.player2.drawnCards.length}`);
        console.log(`Player1 total remaining cards: ${this.player1.totalRemainingCards()}`);
        console.log(`Player2 total remaining cards: ${this.player2.totalRemainingCards()}`);
};


    Game.prototype.draw = function() {

        this.player1.drawOne();
        this.player2.drawOne();

        this.readDrawResults();

        if (this.compare() === 'You win!') {
            if(this.player2.hasmoreCards() === false) {
                console.log(`!!!!!!You win the game!!!!!!`);
            } else {
            console.log(`You win!`)
            this.player1.winPile.push(...this.player2.drawnCards.concat(this.player1.drawnCards));
            this.player1.drawnCards = [];
            this.player2.drawnCards = [];
            };
        } else if (this.compare() === 'You lose :(') {
            if(this.player1.hasmoreCards() === false) {
                console.log(`You lose the game :((((((`)
            } else {
            console.log(`You lose :(`)
            this.player2.winPile.push(...this.player2.drawnCards.concat(this.player1.drawnCards));
            this.player1.drawnCards = [];
            this.player2.drawnCards = [];
            };
        } else {
            if (this.player1.canGoToWar() && this.player2.canGoToWar()) {
                console.log('ITS WAR')
                this.player1.drawOne();
                this.player2.drawOne();
                this.player1.drawOne();
                this.player2.drawOne();
                this.player1.drawOne();
                this.player2.drawOne();
                } else if (this.player1.canGoToWar() === false && this.player2.canGoToWar()) {
                    console.log(`You can't go to war. You lose the game :((((((`);
                } else if (this.player2.canGoToWar() === false && this.player1.canGoToWar()) {
                    console.log(`Computer can't go to war. You win the game!!!!!`);
                } else {
                    console.log(`No one can go to war, it's a draw`)
                };
        }
        this.updateOverallResults();
    };


function drawBothPlayers() {
    currentGame.draw();
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

// but looking back on it, i'm not sure why it worked at all. "this.call" seems to deal out a new card 3 times each but doesn't reference the name of the function draw one. I guess this section of code was nested in the overall function that did deal out one card each for each player, but it didn't run the whole funciton three times because it didn't return the winner and loser of the intermediate cards. Maybe it sort of made a recursive function??