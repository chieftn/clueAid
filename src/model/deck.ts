import { Card } from './card';

export interface Deck {
    characters: Card[];
    rooms: Card[];
    weapons: Card[];
}

export function generateDeck(): Deck {
    return {
        characters: [
            { name:"Miss Scarlett", owner:null, nonOwners:[]},
            { name:"Professor Plum", owner:null, nonOwners:[]},
            { name: "Mrs Peacock", owner:null, nonOwners:[]},
            { name: "Mr Green", owner: null, nonOwners:[]},
            { name: "Colonel Mustard", owner:null, nonOwners:[]},
            { name: "Mrs White", owner:null, nonOwners:[]},
        ],
        weapons: [
            { name: "Candlestick", owner:null, nonOwners:[]},
            { name: "Knife", owner:null, nonOwners:[]},
            { name: "Lead Pipe", owner:null, nonOwners:[]},
            { name: "Revolver", owner:null, nonOwners:[]},
            { name: "Rope", owner:null, nonOwners:[]},
            { name: "Wrench", owner:null, nonOwners:[]},
        ],
        rooms: [
            { name: "Kitchen", owner:null, nonOwners:[]},
            { name: "Ballroom", owner:null, nonOwners:[]},
            { name: "Conservatory", owner:null, nonOwners:[]},
            { name: "Billiard Room", owner:null, nonOwners:[]},
            { name: "Library", owner:null, nonOwners:[]},
            { name: "Study", owner:null, nonOwners:[]},
            { name: "Hall", owner:null, nonOwners:[]},
            { name: "Lounge", owner:null, nonOwners:[]},
            { name: "Dining Room", owner:null, nonOwners:[]}
        ]
    }
}