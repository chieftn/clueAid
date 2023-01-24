import { reducerWithoutInitialState } from 'typescript-fsa-reducers';
import type { Game, Suspicion } from '../shared/model';
import type { GameState } from './state';
import { initializeGameAction, addSuspicionAction, undoSuspicionAction } from './actions';
import { getNewAssertionsFromSuspicion } from '../shared/utils/assertionHelper';

export const gameStateReducer = reducerWithoutInitialState<GameState>()
    .case(initializeGameAction, (state: GameState, payload: Game) => {
        const updatedState = {...state};
        updatedState.game = payload;

        return updatedState;
    })
    .case(undoSuspicionAction, (state: GameState) => {
        const updatedState = {...state};
        updatedState.game = {...updatedState.game};
        updatedState.game.suspicions = updatedState.game.suspicions.slice(0, -1);
        updatedState.game.assertions = updatedState.game.assertions.filter(s => s.suspicionIndex !== updatedState.game.suspicions.length);

        return updatedState;
    })
    .case(addSuspicionAction, (state: GameState, payload: Suspicion) => {
        const updatedState = {...state};
        delete(updatedState.error);

        if (updatedState.game) {
            try {
                const { game } = updatedState;
                updatedState.game = {...state.game};
                updatedState.game.assertions = [...game.assertions, ...getNewAssertionsFromSuspicion(game, payload, game.suspicions.length)];
                updatedState.game.suspicions = [...game.suspicions, payload];
            } catch (e) {
                updatedState.error = e.message;
            }
        }

        return updatedState;
    });