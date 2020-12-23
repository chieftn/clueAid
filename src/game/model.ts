export interface Player {
    id: number;
    name: string;
}

export interface Game {
    players: Player[];
    suspicions: Suspicion[];
    assertions: Assertion[];
}

export interface Deck {
    characterCards: string[];
    roomCards: string[];
    weaponCards: string[];
}

export class Suspicion {
    alibi?: Alibi;
    suspectingPlayer: string;
    suspectedCharacter: string;
    suspectedWeapon: string;
    suspectedRoom: string;
}

export class Alibi {
    card: string;
    from: string;
};

export enum AssertionType {
    DoesNotHave,
    Has
}

export interface Assertion {
    assertionType: AssertionType;
    card: string;
    playerId: number;
}
