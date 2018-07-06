import { Player } from "./Player";

export enum CardType {
    Character,
    Weapon,
    Room
}

export interface Card {
    name: string;
    type: CardType;
    owner: Player;
}

export function CardFactory(): Card[] {

    return [
        { type: CardType.Character, name:"Miss Scarlett", owner:null},
        { type: CardType.Character, name:"Professor Plum", owner:null},
        { type: CardType.Character, name: "Mrs Peacock", owner:null},
        { type: CardType.Character, name: "Mr Green", owner: null},
        { type: CardType.Character, name: "Colonel Mustard", owner:null},
        { type: CardType.Character, name: "Mrs White", owner:null},

        { type: CardType.Weapon, name: "Candlestick", owner:null},
        { type: CardType.Weapon, name: "Knife", owner:null},
        { type: CardType.Weapon, name: "Lead Pipe", owner:null},
        { type: CardType.Weapon, name: "Revolver", owner:null},
        { type: CardType.Weapon, name: "Rope", owner:null},
        { type: CardType.Weapon, name: "Wrench", owner:null},

        { type: CardType.Room, name: "Kitchen", owner:null},
        { type: CardType.Room, name: "Ballroom", owner:null},
        { type: CardType.Room, name: "Conservatory", owner:null},
        { type: CardType.Room, name: "Billiard Room", owner:null},
        { type: CardType.Room, name: "Library", owner:null},
        { type: CardType.Room, name: "Study", owner:null},
        { type: CardType.Room, name: "Hall", owner:null},
        { type: CardType.Room, name: "Lounge", owner:null},
        { type: CardType.Room, name: "Dining Room", owner:null}
    ];
}