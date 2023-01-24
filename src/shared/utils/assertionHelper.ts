import { Assertion, AssertionType, Suspicion, Game, Player } from '../model';
import { LinkedList, Node } from './linkedListHelper';
import { throwError } from './errorHelper';
import { DECK } from '../constants';

export interface Card {
    holder?: number;
    type: 'weapon' | 'character' | 'room';
    notHolder: Set<number>;
}
export type Deck = Record<string, Card>;

export const getNewAssertionsFromSuspicion = (game: Game, newSuspicion: Suspicion, suspicionIndex: number): Assertion[] => {
    const { players, suspicions, assertions } = game;
    const playerIds = players.map(s => s.id);
    const playersLinkedList = new LinkedList<Player>(players);

    const deck = getDeckFromAssertions(assertions);
    const updatedDeck = getNewDeckFromSuspicion(deck, newSuspicion, playerIds, playersLinkedList);

    const newAssertions: Assertion[] = getNewAssertions(updatedDeck, deck, suspicionIndex);
    const recursiveAssertions: Assertion[] = [];

    if (newAssertions.length > 0) {
        let assertionsGainedFromLoop = false;
        do {
            let suspicionLoopDeck = updatedDeck;
            for (const suspicion of [...suspicions, newSuspicion]) {
                suspicionLoopDeck = getNewDeckFromSuspicion(suspicionLoopDeck, suspicion, playerIds, playersLinkedList);
            }

            const assertionsFromLoop: Assertion[] = getNewAssertions(suspicionLoopDeck, updatedDeck, suspicionIndex);
            assertionsGainedFromLoop = assertionsFromLoop.length > 0;
            recursiveAssertions.push(...assertionsFromLoop);
        } while (assertionsGainedFromLoop)
    }

    return [...newAssertions, ...recursiveAssertions];
};

export const getNewDeckFromSuspicion = (currentDeck: Deck, suspicion: Suspicion, playerIds: number[], players: LinkedList<Player>): Deck => {
    const { suspectingPlayer, alibi, suspectedCharacter, suspectedWeapon, suspectedRoom } = suspicion;
    const deck = deepCopyDeck(currentDeck);
    let playerNode = getSuspectingPlayerNode(suspectingPlayer, players).next;

    do {
        const { id } = playerNode.value;
        if (alibi?.from === id) {
            const { from, card } = alibi;
            if (card) {
                deck[card].holder = from;
                deck[card].notHolder = new Set(playerIds.filter(s => s !== from));
            } else {
                const [character, weapon, room] = [
                    cardHasKnownOwnerThanAlibiSource(deck, suspectedCharacter, from),
                    cardHasKnownOwnerThanAlibiSource(deck, suspectedWeapon, from),
                    cardHasKnownOwnerThanAlibiSource(deck, suspectedRoom, from)
                ];

                if (character + weapon + room === 2) {
                    const cardHeldByAlibiSource = room && suspectedRoom || character && suspectedCharacter || suspectedWeapon;
                    deck[cardHeldByAlibiSource].holder = from;
                    deck[cardHeldByAlibiSource].notHolder = new Set(playerIds.filter(s => s !== from));
                }
            }
        } else {
            deck[suspectedCharacter].notHolder.add(id);
            deck[suspectedWeapon].notHolder.add(id);
            deck[suspectedRoom].notHolder.add(id);
        }
        playerNode = playerNode.next;
    } while (playerNode.value.id !== suspectingPlayer)

    Object.keys(deck).forEach(key => {
        if (deck[key].notHolder.size === playerIds.length) {
            deck[key].holder = -1;
        }
    });

    return deck;
};

export const cardHasKnownOwnerThanAlibiSource = (deck: Deck, cardName: string, alibiSource: number): 0 | 1 => {
    return (!isNaN(deck[cardName].holder) && deck[cardName].holder !== alibiSource) ? 1: 0;
};

export const getSuspectingPlayerNode = (suspectingPlayerId: number, players: LinkedList<Player>): Node<Player> => {
    for (const player of players.nodes) {
        if (player.value.id === suspectingPlayerId) {
            return player;
        }
    }

    throwError('playerNodeNotFound');
};

export const deepCopyDeck = (deck: Deck): Deck => {
    const copiedDeck = {...deck};
    Object.keys(copiedDeck).forEach(key => {
        copiedDeck[key] = {
            holder: copiedDeck[key].holder,
            notHolder: new Set([...copiedDeck[key].notHolder]),
            type: copiedDeck[key].type
        }
    });

    return copiedDeck;
};

export const getDeckFromAssertions = (assertions: Assertion[]): Deck => {
    const deck = getNewDeck();
    assertions.forEach(s => {
        const card = deck[s.card];
        if (s.assertionType === AssertionType.Has) {
            card.holder = s.playerId;
        } else {
            card.notHolder.add(s.playerId);
        }
    });

    return deck;
};

export const getNewDeck = (): Deck => {
    const deck: Record<string, Card> = {};
    DECK.characterCards.forEach(s => {
        deck[s] = { notHolder: new Set(), type: 'character'}
    });

    DECK.weaponCards.forEach(s => {
        deck[s] = { notHolder: new Set(), type: 'weapon'}
    });

    DECK.roomCards.forEach(s => {
        deck[s] = { notHolder: new Set(), type: 'room'}
    });

    return deck;
};

export const getNewAssertions = (updatedDeck: Deck, initialDeck: Deck, suspicionIndex: number): Assertion[] => {
    const assertions: Assertion[] = [];
    Object.keys(updatedDeck).forEach(key => {
        assertions.push(...getNewHolderAssertions(key, suspicionIndex, updatedDeck[key].holder, initialDeck[key].holder));
        assertions.push(...getNewNotHolderAssertions(key, suspicionIndex, updatedDeck[key].notHolder, initialDeck[key].notHolder));
    });

    return assertions;
};

export const getNewHolderAssertions = (card: string, suspicionIndex: number, updatedHolder?: number, initialHolder?: number): Assertion[] => {
    const updatedHolderIdentified = !isNaN(updatedHolder);
    const initialHolderIdentified = !isNaN(initialHolder);

    if (initialHolderIdentified && updatedHolderIdentified && updatedHolder !== initialHolder) {
        throwError('integrityCheck');
    }

    if (updatedHolderIdentified && !initialHolderIdentified) {
        return [
            { playerId: updatedHolder, assertionType: AssertionType.Has, card, suspicionIndex }
        ]
    }

    return [];
};

export const getNewNotHolderAssertions = (card: string, suspicionIndex: number, updatedNotHolders: Set<number>, initialNotHolders: Set<number>): Assertion[] => {
    if (!updatedContainsInitial(updatedNotHolders, initialNotHolders)) {
        throwError('integrityCheck');
    }

    const assertions: Assertion[] = [];
    for (const id of [...updatedNotHolders]) {
        if (!initialNotHolders.has(id)) {
            assertions.push({ playerId: id, assertionType: AssertionType.DoesNotHave, card, suspicionIndex })
        }
    }

    return assertions;
};

export const updatedContainsInitial = (updatedNotHolders: Set<number>, initialNotHolders: Set<number>): boolean => {
    for (const id of [...initialNotHolders]) {
        if (!updatedNotHolders.has(id)) {
            return false;
        }
    }

    return true;
};
