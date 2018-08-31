import { Assertion } from '../model/assertion';
import { Deck } from '../model/deck';
import { Player } from '../model/player';
import { Suspicion } from '../model/suspicion';

export interface State {
    assertions: Assertion[];
    players: Player[];
    deck: Deck;
    suspicions: Suspicion[];

}