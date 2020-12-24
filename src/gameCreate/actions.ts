import type { Player } from '../game/model';
import actionCreatorFactory from 'typescript-fsa';
import { GameCreateMode, ValidationResult } from './state';

export const GAME_CREATE = 'GAME_CREATE';
const actionCreator = actionCreatorFactory(GAME_CREATE);

export const addUserCardAction = actionCreator<string>('CARD_ADD');
export const removeUserCardAction = actionCreator<string>('CARD_REMOVE');
export const addPlayerAction = actionCreator('PLAYER_ADD');
export const removePlayerAction = actionCreator<number>('PLAYER_REMOVE');
export const renamePlayerAction = actionCreator<Player>('PLAYER_RENAME')
export const movePlayerOrderAction = actionCreator<{currentIndex: number, newIndex: number}>('PLAYER_MOVE');
export const updateModeAction = actionCreator<GameCreateMode>('UPDATE_MODE');
export const setPlayerValidationAction = actionCreator<ValidationResult[]>('PLAYER_VALIDATE');
export const setPlayerDuplicatesAction = actionCreator<Set<string>>('PLAYER_DUPLICATES');
export const setFormValidationsAction = actionCreator<string[]>('FORM_VALIDATE');
export const validateFormAction  = actionCreator.async<void, void, void>('VALIDATE');

