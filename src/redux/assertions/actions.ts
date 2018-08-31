import actionCreatorFactory from 'typescript-fsa';
import { Assertion } from '../../model/assertion';

const ASSERTIONS_ACTION_PREFIX = 'ASSERTION_';
const ASSERTIONS_ACTION_SUFFIX_ADD = 'ADD';

const actionCreator = actionCreatorFactory(ASSERTIONS_ACTION_PREFIX);
const addAssertionAction = actionCreator<Assertion>(ASSERTIONS_ACTION_SUFFIX_ADD);

export { addAssertionAction };