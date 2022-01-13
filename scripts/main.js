(function () {
    'use strict'

    const deck = [];
    const deck2 = [];

    const newgameButton = document.querySelector('.new-game');
    newgameButton.addEventListener('click', startGame);
    const drawButton = document.querySelector('.draw');
    drawButton.addEventListener('click', draw);

    function startGame() {
       let player1 = new Player('you');

        console.log(player1);
    };

    function draw() {

    };

   function makeDeck() { 
        for (let i = 2; i < 15; i++) {
        deck.push(new Card(i,'heart'));
        deck.push(new Card(i,'spade'));
        deck.push(new Card(i,'diamond'));
        deck.push(new Card(i,'club'));
    };
    };
    console.log(deck);

    function randomNum() {
        (Math.floor(Math.random() * arr.length));
    }

    function shuffle(arr) {
        let num = 0;
        let removed = {};
        while (arr.length > 1) 
        num = (Math.floor(Math.random() * arr.length));
        console.log(num);
        removed = arr.splice(num,1);
        console.log(removed);
        deck2.push(removed);
    };

    shuffle(deck);
    console.log(deck);
    console.log(deck2);

    // const Deck = {
    //     cards: deck.length,
    //     shuffle() {
    //             if (deck.length === 1) return deck[0];
    //             (Math.floor(Math.random() * this.cards));
    //         }
    // };


    function Card(value, suit) {
        this.value = value;
        this.suit = suit;
    };

    function Game(player1card, player2card, player1score = 0, player2score = 0) {
        this.player1card = player1card
        this.player2card = player2card
        this.player1score = player1score
        this.player2score = player2score
    }
Game.prototype.compare = function() {
    player1card > player2card ? player1score + 1: player2score +1;
}


makeDeck = function() { 
    for (let i = 2; i < 15; i++) {
    deck.push(new Card(i,'heart'));
    deck.push(new Card(i,'spade'));
    deck.push(new Card(i,'diamond'));
    deck.push(new Card(i,'club'));
};
};
makeDeck();








// const Deck = function () {};

// Deck.prototype.makeDeck = function() { 
//             for (let i = 2; i < 15; i++) {
//             deck.push(new Card(i,'heart'));
//             deck.push(new Card(i,'spade'));
//             deck.push(new Card(i,'diamond'));
//             deck.push(new Card(i,'club'));
//         }
//         console.log(deck);
// };

//  Deck.prototype.shuffle = function(){
//      console.log(`this is a test`)
// };

// const anotherDeck = new Deck
// anotherDeck.makeDeck();
// anotherDeck.shuffle();

// function Player(name, deck = 0, totalcards = 0) {
//     this.name = name
//     this.deck = deck
//     this.totalcards = totalcards
// }











})();