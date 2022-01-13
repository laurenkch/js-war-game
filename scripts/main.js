(function () {
    'use strict'

    let deck = [];
    let shuffledDeck = [];
    let playerOneDeck = [];
    let playerTwoDeck = [];
    let playerOneWinPile = [];
    let playerTwoWinPile = [];


    const newgameButton = document.querySelector('.new-game');
    newgameButton.addEventListener('click', startGame);
    const drawButton = document.querySelector('.draw');
    drawButton.addEventListener('click', draw);

    function startGame() {
       let player1 = new Player('you');
        let player2 = new Player('computer');
        console.log(player1);
    };

    function draw() {

    };

    //---CARDS

    function Card(value, suit) {
        this.value = value;
        this.suit = suit;
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
    console.log(deck);

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
    console.log(deck);
    console.log(shuffledDeck);

//--DEAL THE DECK

function dealDeck(arr) {
     playerOneDeck = arr.slice(0,(arr.length/2));
     playerTwoDeck = arr.slice(arr.length/2,arr.length);
    }

//--DRAW
dealDeck(shuffledDeck);

    console.log(playerOneDeck);
    console.log(playerTwoDeck);

    function draw() {
        let playerOneCard = playerOneDeck.shift();
        let playerTwoCard = playerTwoDeck.shift();
        console.log(playerOneCard);
        console.log(playerTwoCard);
        console.log(playerOneCard.value);
        console.log(playerTwoCard.value);
        if (playerOneCard.value > playerTwoCard.value) {
            playerOneDeck.push(playerOneCard, playerTwoCard);
        }
    }
    draw();

    console.log(playerOneDeck);
    console.log(playerTwoDeck);


//EXTRA CODE, unsure if any will be used
    // function Game(player1card, player2card, player1score = 0, player2score = 0) {
    //     this.player1card = player1card
    //     this.player2card = player2card
    //     this.player1score = player1score
    //     this.player2score = player2score
    // }
    // Game.prototype.compare = function() {
    //     player1card > player2card ? player1score + 1: player2score +1;
    // }

    // function Player(name, deck = 0, totalcards = 0) {
    //     this.name = name
    //     this.deck = deck
    //     this.totalcards = totalcards
    // }











})();