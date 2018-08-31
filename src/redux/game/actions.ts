import actionCreatorFactory from 'typescript-fsa';
import { Game } from '../../model/Game';

const GAME_ACTION_PREFIX = 'GAME_SETUP_';
const GAME_ACTION_SUFFIX_SET_GAME = 'SET_GAME';

const actionCreator = actionCreatorFactory(GAME_ACTION_PREFIX);
const setGameAction = actionCreator<Game>(GAME_ACTION_SUFFIX_SET_GAME);

export { setGameAction };