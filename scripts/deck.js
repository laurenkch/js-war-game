//Deck constructor

import {Card} from "./card.js"

function Deck(cards, shuffled) {
    this.cards = [];
    this.shuffled = [];
};

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

export {Deck};