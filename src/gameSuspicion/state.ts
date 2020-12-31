import { IDropdownOption } from '@fluentui/react';

export enum GameSuspicionCreateMode {
    uninitialized,
    idle,
    validating,
    submitReady
}

export interface GameSuspicionCreateState {
    alibiFrom?: number;
    alibiFromOptions: IDropdownOption[];
    alibiCard?: string;
    alibiCardOptions: IDropdownOption[];
    suspectedCharacter?: string;
    suspectedCharacterOptions: IDropdownOption[];
    suspectedWeapon?: string;
    suspectedWeaponOptions: IDropdownOption[];
    suspectedRoom?: string;
    suspectedRoomOptions: IDropdownOption[];
    suspectingPlayerOptions: IDropdownOption[];
    suspectingPlayer?: number;
    mode: GameSuspicionCreateMode;
}

export const getInitialGameSuspicionCreateState = (): GameSuspicionCreateState => {
    return {
        alibiFromOptions: [],
        alibiCardOptions: [],
        mode: GameSuspicionCreateMode.uninitialized,
        suspectedRoomOptions: [],
        suspectedCharacterOptions: [],
        suspectedWeaponOptions: [],
        suspectingPlayerOptions: [],
    };
};
