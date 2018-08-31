import { isType, AnyAction } from 'typescript-fsa';
import { setDeckAction } from './actions';
import { Deck, getDeck } from '../../model/deck';

const reducer = (deck: Deck = getDeck(), action: AnyAction) => {

    if (isType(action, setDeckAction)) {
        return deck;
    }

    return deck;
}
export default reducer;
