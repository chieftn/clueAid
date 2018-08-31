import actionCreatorFactory from 'typescript-fsa';
import { Suspicion } from '../../model/suspicion';

const SUSPICIONS_ACTION_PREFIX = 'SUSPICIONS_';
const SUSPICIONS_ACTION_SUFFIX_ADD = 'ADD';

const actionCreator = actionCreatorFactory(SUSPICIONS_ACTION_PREFIX);
const addSuspicionAction = actionCreator<Suspicion>(SUSPICIONS_ACTION_SUFFIX_ADD);

export { addSuspicionAction };