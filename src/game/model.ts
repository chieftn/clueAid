export interface Deck {
    characterCards: readonly string[];
    roomCards: readonly string[];
    weaponCards: readonly string[];
}

export interface Player {
    id: number;
    name: string;
}

export interface Game {
    players: Player[];
    suspicions: Suspicion[];
    assertions: Assertion[];
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
}

export enum AssertionType {
    DoesNotHave,
    Has
}

export interface Assertion {
    assertionType: AssertionType;
    card: string;
    playerId: number;
}
