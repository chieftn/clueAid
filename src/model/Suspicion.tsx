import { Card } from "./Card";
import { Player } from "./Player";

export class Suspicion {
    AlibiCard: Card;
    AlibiProvider: Player;
    RaisedBy: Player;
    SuspectedCharacter: Card;
    SuspectedWeapon: Card;    
    SuspectedRoom: Card;
}