import type { Game } from './model';

export interface GameState {
    game?: Game;
}

export const getInitialGameState = (): GameState => {
    return {};
}
