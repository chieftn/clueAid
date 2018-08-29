import { isType, AnyAction } from 'typescript-fsa';
import { addSuspicionAction, setGameAction } from './actions';
import { Game } from '../../model/game';
import { Deck } from '../../model/deck';
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

    if (isType(action, addSuspicionAction)) {
        return {
            game: {
                players: game.players,
                deck: game.deck,
                suspicions: [...game.suspicions, action.payload.suspicion]
            }
             
        };
     }

    if (isType(action, addSuspicionAction)) {
       return {
            game: {
                players: game.players,
                deck: game.deck,
                suspicions: [...game.suspicions, action.payload.suspicion]
            }
       };
    }

    return { game : game };
}
export default reducer;
