import { Assertion, AssertionType } from './model';
import { deck } from '../shared/constants';

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
        ...deck.characterCards.map(s => getGameStatusEntry(s)),
        ...deck.weaponCards.map(s => getGameStatusEntry(s)),
        ...deck.roomCards.map(s => getGameStatusEntry(s)),
    ]
}