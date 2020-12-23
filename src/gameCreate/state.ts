import type { Player } from '../game/model';

export enum GameCreateMode {
    idle,
    submitting
}

export interface GameCreateState {
    gameCreateMode: GameCreateMode;
    nextPlayerId: number;
    players: Player[];
    playerValidations: Record<number,string>;
    userCards: Set<string>;
    userCardsValidation?: string;
}

export const getInitialGameCreateState = (): GameCreateState => {
    return {
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
        userCards: new Set<string>()
    };
};
