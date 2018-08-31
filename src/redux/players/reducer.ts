import { isType, AnyAction } from 'typescript-fsa';
import { addPlayerAction } from './actions';
import { Player } from '../../model/player';

const reducer = (players: Player[] = [], action: AnyAction) => {

    if (isType(action, addPlayerAction)) {
        return [...players, action.payload]
    }

    return players;
}
export default reducer;
