import type { Game } from '../shared/model';

export interface GameState {
    game?: Game;
}

export const getInitialGameState = (): GameState => {
    return {};
}
