import actionCreatorFactory from 'typescript-fsa';
import { Suspicion, Game } from './model';

export const GAME = 'GAME';
const actionCreator = actionCreatorFactory(GAME);

export const initializeGameAction = actionCreator<Game>('INITIALIZE');
export const addSuspicionAction = actionCreator<Suspicion>('ADD_SUSPICION');
