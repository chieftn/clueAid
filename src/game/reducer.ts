import { reducerWithoutInitialState } from 'typescript-fsa-reducers';
import { GameState } from './state';
import { } from './actions';


export const gameStateReducer = reducerWithoutInitialState<GameState>()