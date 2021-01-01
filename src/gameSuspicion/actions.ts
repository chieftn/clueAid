import actionCreatorFactory from 'typescript-fsa';
import { Game } from '../shared/model';

export const GAME_SUSPICION = 'GAME_SUSPICION';
const actionCreator = actionCreatorFactory(GAME_SUSPICION);

export const initializeAction = actionCreator<Game>('INITIAlIZE');
export const setSuspectingPlayerAction = actionCreator<number>('SET_SUSPECTING_PLAYER');
export const setSuspectedCharacterAction = actionCreator<string>('SET_SUSPECTED_CHARACTER');
export const setSuspectedWeaponAction = actionCreator<string>('SET_SUSPECTED_WEAPON');
export const setSuspectedRoomAction = actionCreator<string>('SET_SUSPECTED_ROOM');
export const setAlibiFromAction = actionCreator<number>('SET_ALIBI_FROM');
export const setAlibiCardAction = actionCreator<string>('SET_ALIBI_CARD');

export interface FormValidationResult {
    alibiCardValidation?: string;
    alibiPlayerValidation?: string;
    suspectingPlayerValidation?: string;
}
export const validateFormAction = actionCreator.async<void, void, FormValidationResult>('VALIDATE');
export const setSuspectingPlayerValidationAction = actionCreator<string>("VALIDATE_SUSPECTING_PLAYER");
export const setAlibiPlayerValidationAction = actionCreator<string>("VALIDATE_ALIBI_PLAYER");
export const setAlibiCardValidationAction = actionCreator<string>("VALIDATE_ALIBI_CARD");
