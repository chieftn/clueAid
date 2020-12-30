import { Assertion, AssertionType } from '../shared/model';
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