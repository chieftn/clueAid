import { Assertion, AssertionType } from './assertion';
import { noOne, Player } from './Player';

export class PlayerProjection extends Map<string,PlayerHand> {

    constructor(players: Player[]) {
        super();

        this.set(noOne, new PlayerHand(noOne));
        players.forEach(player => this.set(player.name, new PlayerHand(player.name)));
    }

    toArray(): PlayerHand[] {
        const hands: PlayerHand[] = [];
        this.forEach(entry => hands.push(entry));

        return hands;
    }

    addAssertions(assertions: Assertion[]) {

        assertions.forEach((assertion) => {
            if (assertion.assertionType === AssertionType.DoesNotHave) {
                this.get(assertion.playerName).cardsNotInHand.push(assertion.cardName);
            }
            else {
                this.get(assertion.playerName).cardsInHand.push(assertion.cardName);
            }
        });
    }
}

export class PlayerHand {
    playerName: string;
    cardsInHand: string[];
    cardsNotInHand: string[];

    constructor(playerName: string) {
        this.playerName = playerName;
        this.cardsInHand = [];
        this.cardsNotInHand = [];
    }
}