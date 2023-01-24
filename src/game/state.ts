import type { Game } from '../shared/model';
import type { ErrorType } from '../shared/utils/errorHelper';

export interface GameState {
    game?: Game;
    error?: ErrorType;
}

export const getInitialGameState = (): GameState => {
    return {};
}
