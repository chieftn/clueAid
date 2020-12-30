import { reducerWithoutInitialState } from 'typescript-fsa-reducers';
import { Game } from '../shared/model';
import { GameState } from './state';
import { initializeGameAction } from './actions';

export const gameStateReducer = reducerWithoutInitialState<GameState>()
    .case(initializeGameAction, (state: GameState, payload: Game) => {
        const updatedState = {...state};
        updatedState.game = payload;

        return updatedState;
    });