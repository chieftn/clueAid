import actionCreatorFactory from 'typescript-fsa';
import { Player } from '../../model/player';

const PLAYERS_ACTION_PREFIX = 'PLAYERS_';
const PLAYERS_ACTION_SUFFIX_ADD = 'ADD_PLAYERS';

const actionCreator = actionCreatorFactory(PLAYERS_ACTION_PREFIX);
const addPlayerAction = actionCreator<Player>(PLAYERS_ACTION_SUFFIX_ADD);

export { addPlayerAction };