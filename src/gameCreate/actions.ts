import type { Player } from '../game/model';
import actionCreatorFactory from 'typescript-fsa';
import { GameCreateMode } from './state';

export const GAME_CREATE = 'GAME_CREATE';
const actionCreator = actionCreatorFactory(GAME_CREATE);

export const addUserCardAction = actionCreator<string>('CARD_ADD');
export const removeUserCardAction = actionCreator<string>('CARD_REMOVE');
export const addPlayerAction = actionCreator('PLAYER_ADD');
export const removePlayerAction = actionCreator<number>('PLAYER_REMOVE');
export const renamePlayerAction = actionCreator<Player>('PLAYER_RENAME')
export const movePlayerOrderAction = actionCreator<{id: number, newIndex: number}>('PLAYER_MOVE');
export const updateModeAction = actionCreator<GameCreateMode>('UPDATE_MODE');
export const submitAction  = actionCreator('SUBMIT');

