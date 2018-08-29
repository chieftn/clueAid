import { Player } from "./player";

export interface Card {
    name: string;
    owner: Player;
    nonOwners: Player[]
}