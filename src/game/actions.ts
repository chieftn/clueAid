import actionCreatorFactory from 'typescript-fsa';
import { Suspicion, Game } from '../shared/model';

export const GAME = 'GAME';
const actionCreator = actionCreatorFactory(GAME);

export const initializeGameAction = actionCreator<Game>('INITIALIZE');
export const addSuspicionAction = actionCreator<Suspicion>('ADD_SUSPICION');
export const undoSuspicionAction = actionCreator<void>('UNDO_SUSPICION');