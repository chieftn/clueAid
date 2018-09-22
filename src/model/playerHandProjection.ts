import { Assertion, AssertionType } from './assertion';
import { noOne, Player } from './Player';

export class PlayerHandProjection extends Map<string,PlayerHand> {

    constructor(players: Player[]) {
        super();

        this.set(noOne, new PlayerHand());
        players.forEach(player => this.set(player.name, new PlayerHand()));
    }

    addAssertions(assertions: Assertion[]) {

        assertions.forEach((assertion) => {
            if (assertion.assertionType === AssertionType.DoesNotHave) {
                this.get(assertion.playerName).cardsNotInHand.add(assertion.cardName);
            }
            else {
                this.get(assertion.playerName).cardsInHand.add(assertion.cardName);
            }
        });
    }
}

export class PlayerHand {
    cardsInHand: Set<string>;
    cardsNotInHand: Set<string>;

    constructor() {
        this.cardsInHand = new Set<string>();
        this.cardsNotInHand = new Set<string>();
    }
}