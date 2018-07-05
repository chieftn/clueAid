import { Player } from "./Player";
import { Suspicion } from "./Suspicion";

export class Game {
    readonly id: number;
    readonly players: Player[];
    readonly suspicions: Suspicion[];
}