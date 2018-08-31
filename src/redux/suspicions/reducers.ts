import { isType, AnyAction } from 'typescript-fsa';
import { addSuspicionAction } from './actions';
import { Suspicion } from '../../model/suspicion';

const reducer = (suspicions: Suspicion[] = [], action: AnyAction) => {

    if (isType(action, addSuspicionAction)) {
        return [...suspicions, action.payload]
    }

    return suspicions;
}
export default reducer;
