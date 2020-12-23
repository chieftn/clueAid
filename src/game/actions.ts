import actionCreatorFactory from 'typescript-fsa';
import { Suspicion } from './model';

export const GAME = 'GAME';
const actionCreator = actionCreatorFactory(GAME);

export interface InitializeGameParameters {

}
export const initializeGame = actionCreator<InitializeGameParameters>('INITIALIZE');
export const addSuspicion = actionCreator<Suspicion>('ADD_SUSPICION');
