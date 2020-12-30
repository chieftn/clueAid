import { Player } from '../shared/model';

export enum GameSuspicionCreateMode {
    uninitialized,
    idle,
    validating,
    submitReady
}


export interface GameSuspicionCreateState {
    alibiFrom?: number;
    alibiCard?: string;
    allowedAlibiFrom: Player[];
    allowedAlibiCards: string[];
    showAlibiCard: boolean;
    suspectingPlayer?: number;
    suspectedCharacter: string;
    suspectedWeapon: string;
    suspectedRoom: string;
    players: Player[];
    mode: GameSuspicionCreateMode;
}

export const getInitialGameSuspicionCreateState = (): GameSuspicionCreateState => {
    return {
        allowedAlibiFrom: [],
        allowedAlibiCards: [],
        showAlibiCard: false,
        mode: GameSuspicionCreateMode.uninitialized,
        players: [],
        suspectedCharacter: '',
        suspectedWeapon: '',
        suspectedRoom: '',
    };
};
