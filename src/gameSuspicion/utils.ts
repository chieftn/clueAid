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
}