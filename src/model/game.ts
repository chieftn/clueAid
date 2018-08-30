import { Deck } from "./deck";
import { Player } from "./player";
import { Suspicion } from "./suspicion";

export const myName = 'Me';
export interface Game {
     players: Player[];
     deck: Deck | null;
     suspicions: Suspicion[];
}

