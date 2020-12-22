import type { Game } from './model';

export interface SharedState {
    games: Game[];
}

export const getSharedState = (): SharedState => {
    return {
        games: []
    };
}