(function () {
    'use strict'

    function Card(value, suit, nickname = 'none') {
        this.value = value;
        this.suit = suit;
        this.nickname = nickname;
    };

    function Game() {
    }

    function Player() {    
    }

    function Deck() {

    };

    const cardData = [];
    function makeCards () {
        for (let i = 2; i < 15; i++) {
            cardData.push(new Card(i,'heart'));
            cardData.push(new Card(i,'spade'));
            cardData.push(new Card(i,'diamond'));
            cardData.push(new Card(i,'club'));
        }
    };
    makeCards();
    console.log(cardData);

    const currentDeck = new Deck();
    console.log(currentDeck);















})();