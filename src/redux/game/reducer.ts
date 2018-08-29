import { isType, AnyAction } from 'typescript-fsa';
import { addSuspicionAction, setGameAction } from './actions';
import { Game } from '../../model/Game';
import { Card } from '../../model/Card';
import { Player } from '../../model/Player';
import { Suspicion } from '../../model/Suspicion';

const initialGameState: Game = {
        players: [] as Player[],
        cards: [] as Card[],
        suspicions: [] as Suspicion[]
};

const reducer = (game: Game = initialGameState, action: AnyAction) => {

    if (isType(action, setGameAction)) {
        return {
            game: {
                players: action.payload.game.players,
                cards: action.payload.game.cards,
                suspicions: [] as Suspicion[]
            }
        };
    }

    if (isType(action, addSuspicionAction)) {
        return {
            game: {
                players: game.players,
                cards: game.cards,
                suspicions: [...game.suspicions, action.payload.suspicion]
            }
             
        };
     }

    if (isType(action, addSuspicionAction)) {
       return {
            game: {
                players: game.players,
                cards: game.cards,
                suspicions: [...game.suspicions, action.payload.suspicion]
            }
       };
    }

    return { game : game };
}
export default reducer;
