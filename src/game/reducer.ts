import { reducerWithoutInitialState } from 'typescript-fsa-reducers';
import type { Game, Suspicion } from '../shared/model';
import type { GameState } from './state';
import { initializeGameAction, addSuspicionAction } from './actions';
import { getNewAssertionsFromSuspicion } from '../shared/utils/assertionHelper';

export const gameStateReducer = reducerWithoutInitialState<GameState>()
    .case(initializeGameAction, (state: GameState, payload: Game) => {
        const updatedState = {...state};
        updatedState.game = payload;

        return updatedState;
    })
    .case(addSuspicionAction, (state: GameState, payload: Suspicion) => {
        const updatedState = {...state};

        if (updatedState.game) {
            updatedState.game = {...state.game};

            // todo error handling
            updatedState.game.assertions = [...updatedState.game.assertions, ...getNewAssertionsFromSuspicion(updatedState.game, payload)];
            updatedState.game.suspicions = [...updatedState.game.suspicions, payload];
        }

        return updatedState;
    });