import { Player, Game, Assertion, AssertionType } from '../game/model';
import { GameCreateState, ValidationResult } from "./state";
import { deck } from '../shared/constants';

export const validatePlayerName = (player: Player): ValidationResult => {
    const { id, name } = player;
    const result = {
        id,
        value: ''
    }

    if (!name) {
        result.value = 'Please enter a name for this player.';
    }

    return result;
};

export const validateForm = (state: GameCreateState): string[] => {
    const validations = [];

    if (state.players.length < 2) {
        validations.push('You seem lonely, why not add some more players.');
    }

    if (state.userCards.size === 0) {
        validations.push('Please tell me what cards you have.');
    }

    if (selectedAllCards(deck.characterCards, state.userCards)) {
        validations.push('Please do not pick all of the suspect cards.');
    }

    if (selectedAllCards(deck.weaponCards, state.userCards)) {
        validations.push('Please do not pick all of the weapon cards.');
    }

    if (selectedAllCards(deck.roomCards, state.userCards)) {
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
    const assertions: Assertion[] = [];
    cards.forEach(s => assertions.push({ playerId: 0, assertionType: AssertionType.Has, card: s}));

    return {
        assertions,
        players,
        suspicions: []
    };
}
