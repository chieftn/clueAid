import { isType, AnyAction } from 'typescript-fsa';
import { setGameAction } from './actions';
import { Game } from '../../model/game';
import { Player } from '../../model/player';
import { Suspicion } from '../../model/suspicion';

const initialGameState: Game = {
        players: [] as Player[],
        deck: null,
        suspicions: [] as Suspicion[]
};

const reducer = (game: Game = initialGameState, action: AnyAction) => {

    if (isType(action, setGameAction)) {
        return {
                players: action.payload.players,
                deck: action.payload.deck,
                suspicions: [] as Suspicion[]
        };
    }

    return game;
}
export default reducer;
