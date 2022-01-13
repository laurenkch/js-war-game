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

    function Player(name, deck = [], winPile = [], cardsinPlay = []) {
        this.name = name
        this.deck = deck
        this.winPile = winPile
        this.cardsinPlay = cardsinPlay
    };

    let player1 = new Player('you');
    let player2 = new Player('computer');

console.log(player1);

function reset() {
    while (this.winPile.length > 0) {
        let index = (Math.floor(Math.random() * this.winPile.length));
        let removed = this.winPile.splice(index, 1);
        this.deck.push(removed);
    };
    this.deck = this.deck.flat();
};

function draw1() {
    let activeCard = this.deck.shift();
    console.log(activeCard);
    this.winPile.push(activeCard);
}

 function draw(player1) {
        console.log(this.deck.length);
        if (this.deck.length < 2) {
            reset.apply(this);
            draw1.apply(this);
        } else {
        draw1.apply(this);
        }
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
     player1.deck = arr.slice(0,(arr.length/2));
     player2.deck = arr.slice(arr.length/2,arr.length);
    }
dealDeck(shuffledDeck);

const drawButton = document.querySelector('.draw');
drawButton.addEventListener('click', startDraw);

//--DRAW

  function startDraw() {
    draw.apply(player1);
    draw.apply(player2);

  };












})();