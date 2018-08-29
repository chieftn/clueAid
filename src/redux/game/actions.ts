import actionCreatorFactory from 'typescript-fsa';
import { Game } from '../../model/Game';
import { Suspicion } from '../../model/Suspicion';

const GAME_ACTION_PREFIX = 'GAME_SETUP_';
const GAME_ACTION_SUFFIX_SET_GAME = 'SET_GAME';
const GAME_ACTION_ADD_SUSPICION = 'ADD_SUSPICION';

const actionCreator = actionCreatorFactory(GAME_ACTION_PREFIX);
const setGameAction = actionCreator<{game: Game}>(GAME_ACTION_SUFFIX_SET_GAME);
const addSuspicionAction = actionCreator<{suspicion: Suspicion}>(GAME_ACTION_ADD_SUSPICION);

export { addSuspicionAction, setGameAction };