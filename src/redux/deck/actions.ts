import actionCreatorFactory from 'typescript-fsa';
import { Deck } from '../../model/deck';

const DECK_ACTION_PREFIX = 'DECK_ACTION_';
const DECK_ACTION_SUFFIX_SET = 'SET';

const actionCreator = actionCreatorFactory(DECK_ACTION_PREFIX);
const setDeckAction = actionCreator<Deck>(DECK_ACTION_SUFFIX_SET);

export { setDeckAction };