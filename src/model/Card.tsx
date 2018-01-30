export enum CardType {
    Character,
    Weapon,
    Room
}

export interface Card {
    name: string;
    type: CardType;
}