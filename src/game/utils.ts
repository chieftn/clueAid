import { Assertion, AssertionType, Player } from '../shared/model';
import { DECK } from '../shared/constants';

export interface GameStatusEntry {
    card: string;
    playerEntries: Record<string, AssertionType>;
}

export const getGameStatusEntries = (assertions: Assertion[]): GameStatusEntry[] => {
    const cardMap = new Map<string, Record<string, AssertionType>>();

    assertions.forEach(({card, playerId, assertionType}) => {
        let mapEntry = cardMap.get(card);
        mapEntry = mapEntry || {};
        mapEntry[playerId] = assertionType;

        cardMap.set(card, mapEntry);
    });

    const getGameStatusEntry = (card: string): GameStatusEntry => {
        return {
            card,
            playerEntries: cardMap.get(card) || {}
        }
    }

    return [
        ...DECK.characterCards.map(s => getGameStatusEntry(s)),
        ...DECK.weaponCards.map(s => getGameStatusEntry(s)),
        ...DECK.roomCards.map(s => getGameStatusEntry(s)),
    ]
}

export interface Card {
    holder?: number;
    notHolder: Set<number>;
}
export type Deck = Record<string, Card>;
export const buildDeck = (assertions: Assertion[]): Deck => {
    const deck: Record<string, Card> = {};
    DECK.characterCards.forEach(s => {
        deck[s] = { notHolder: new Set()}
    });

    DECK.weaponCards.forEach(s => {
        deck[s] = { notHolder: new Set()}
    });

    DECK.roomCards.forEach(s => {
        deck[s] = { notHolder: new Set()}
    });

    assertions.forEach(s => {
        if (s.assertionType === AssertionType.DoesNotHave) {
            deck[s.card].notHolder.add(s.playerId);
        }

        deck[s.card].holder = s.playerId;
    });

    return deck;
};

export interface PlayerHand {
    cardsInHand: Set<string>;
    cardsNotInHand: Set<string>;
}
export const buildPlayerHands = (players: Player[], assertions: Assertion[]): Record<number, PlayerHand> => {
    const playerHands: Record<number, PlayerHand> = {};
    playerHands[-1] = {
        cardsInHand: new Set(),
        cardsNotInHand: new Set()
    };

    players.forEach(s => {
        playerHands[s.id] = {
            cardsInHand: new Set(),
            cardsNotInHand: new Set()
        }
    });

    assertions.forEach(s => {
        playerHands[s.playerId][s.assertionType === AssertionType.Has ? 'cardsInHand' : 'cardsNotInHand'].add(s.card);
    });

    return playerHands;
};

