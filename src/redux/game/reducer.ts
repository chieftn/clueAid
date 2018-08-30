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
            game: {
                players: action.payload.game.players,
                deck: action.payload.game.deck,
                suspicions: [] as Suspicion[]
            }
        };
    }

    return { game : game };
}
export default reducer;
