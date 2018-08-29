import { Deck } from "./deck";
import { Player } from "./player";
import { Suspicion } from "./suspicion";

export interface Game {
     players: Player[];
     deck: Deck | null;
     suspicions: Suspicion[];
}

