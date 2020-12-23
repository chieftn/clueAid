import type { Game } from './model';

export interface GameState {
    Game?: Game;
}

export const getInitialGameState = (): GameState => {
    return {};
}
