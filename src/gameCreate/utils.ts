import { Player, Game, Assertion, AssertionType } from '../shared/model';
import { ME, NOONE } from '../shared/constants';
import { GameCreateState, ValidationResult } from "./state";
import { DECK } from '../shared/constants';

export const validatePlayerName = (player: Player): ValidationResult => {
    const { id, name } = player;
    const result = {
        id,
        value: ''
    }

    if (!name) {
        result.value = 'Please enter a name for this player.';
    }

    if (name.length > 50) {
        result.value = 'Please enter a shorter name.';
    }

    if (name === ME && id !== 0) {
        result.value = "I need this name. Please use another";
    }

    if (name === NOONE) {
        result.value = 'I need this name. Please use another.';
    }

    return result;
};

export const validateForm = (state: GameCreateState): string[] => {
    const validations = [];

    if (state.players.length < 2) {
        validations.push('You seem lonely, why not add some more players?');
    }

    if (state.userCards.size === 0) {
        validations.push('Please tell me what cards you have.');
    }

    if (selectedAllCards(DECK.characterCards, state.userCards)) {
        validations.push('Please do not pick all of the suspect cards.');
    }

    if (selectedAllCards(DECK.weaponCards, state.userCards)) {
        validations.push('Please do not pick all of the weapon cards.');
    }

    if (selectedAllCards(DECK.roomCards, state.userCards)) {
        validations.push('Pleas do not pick all of the room cards.');
    }

    return validations;
}

export const selectedAllCards = (cards: readonly string[], cardsInHand: Set<string>): boolean => {
    let countInHand = 0;
    cards.forEach(s => {
        if (cardsInHand.has(s)) {
            countInHand += 1;
        }
    });

    return countInHand === cards.length;
}

export const getDuplicatePlayerNames = (playerNames: string[]): Set<string> => {
    const duplicateNames = new Set<string>();
    const allNames = new Set<string>();

    playerNames.forEach(s => {
        if(!s) {
            return;
        }

        if (allNames.has(s)) {
            duplicateNames.add(s);
        }

        allNames.add(s);
    });

    return duplicateNames;
};
export interface HasErrorsParameters {
    playerValidations: Record<number,string>;
    playerNameDuplicates: Set<string>;
    formValidations: string[];
}
export const hasErrors = (parameters: HasErrorsParameters): boolean => {
    if (parameters.formValidations.length > 0 ||
        parameters.playerNameDuplicates.size > 0 ||
        Object.values(parameters.playerValidations).reduce((p, c) => p + c, '')) {
            return true
        }

    return false;
}

export const getGame = (players: Player[], cards: Set<string>): Game => {
    const getAssertion = (s: string) => ({
        assertionType: cards.has(s)?  AssertionType.Has: AssertionType.DoesNotHave,
        card: s,
        playerId: 0,
        suspicionIndex: -1
    })

    const assertions: Assertion[] = [
        ...DECK.characterCards.map(s => getAssertion(s)),
        ...DECK.weaponCards.map(s => getAssertion(s)),
        ...DECK.roomCards.map(s => getAssertion(s))
    ];

    const otherPlayers = players.filter(s => s.id !== 0);
    [...cards].forEach(card => {
        const otherPlayerAssertions = otherPlayers.map(s => ({
            assertionType: AssertionType.DoesNotHave,
            card,
            playerId: s.id,
            suspicionIndex: -1
        }));

        assertions.push(...otherPlayerAssertions);
    });

    return {
        assertions,
        players,
        suspicions: []
    };
}
