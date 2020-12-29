import type { Player } from '../game/model';

export enum GameCreateMode {
    idle,
    validating,
    submitReady
}

export interface ValidationResult {
    id: number;
    value: string;
}

export interface GameCreateState {
    gameCreateMode: GameCreateMode;
    nextPlayerId: number;
    players: Player[];
    playerValidations: Record<number,string>;
    playerNameDuplicates: Set<string>;
    userCards: Set<string>;
    formValidations: string[];
}

export const getInitialGameCreateState = (): GameCreateState => {
    return {
        formValidations: [],
        gameCreateMode: GameCreateMode.idle,
        nextPlayerId: 2,
        players: [
            {
                id: 0,
                name: 'Me'
            },
            {
                id: 1,
                name: ''
            }
        ],
        playerValidations: {},
        playerNameDuplicates: new Set<string>(),
        userCards: new Set<string>()
    };
};

