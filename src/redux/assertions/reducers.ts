import { isType, AnyAction } from 'typescript-fsa';
import { addAssertionAction } from './actions';
import { Assertion } from '../../model/assertion';

const reducer = (assertions: Assertion[] = [], action: AnyAction) => {

    if (isType(action, addAssertionAction)) {
        return [...assertions, action.payload]
    }

    return assertions;
}
export default reducer;
