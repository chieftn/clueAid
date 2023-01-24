import { IDropdownOption } from '@fluentui/react';
import { NOONE } from '../shared/constants';
import { GameSuspicionCreateState } from './state';

export const getNoAlibiOption = (): IDropdownOption => {
    return { key: -1, text: NOONE};
};

export const alibiCardEnabled = (state: GameSuspicionCreateState): boolean => {
    if (state.suspectingPlayer !== 0) {
        return false;
    }

    if (!state.alibiFrom || state.alibiFrom === -1) {
        return false;
    }

    return true;
};

export const validateSuspectingPlayer = (key: number | undefined): string => {
    if (key === undefined) {
        return 'Please select player who raised suspicion.'
    }
    return '';
};

export const validateAlibiPlayer = (key: number | undefined): string => {
    if (key === undefined) {
        return 'Please select player who provided the alibi.';
    }
    return '';
};

export interface ValidateAlibiCardParameters {
    key: string;
    suspectingPlayer: number | undefined;
    alibiFrom: number | undefined;
}

export const validateAlibiCard = (params: ValidateAlibiCardParameters): string => {
    if (params.suspectingPlayer !== 0) {
        return '';
    }

    if (params.alibiFrom === -1) {
        return '';
    }

    if (params.key) {
        return '';
    }

    return 'Please select the card you were shown.'
};
