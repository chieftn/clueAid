import { Assertion, AssertionType } from './assertion';
import { Deck } from './deck';

export class DeckProjection extends Map<string, CardProjection> {

    characterCards: CardProjection[];
    roomCards: CardProjection[];
    weaponCards: CardProjection[];

    constructor(deck: Deck) {
        super();

        this.characterCards = [];
        this.roomCards = [];
        this.weaponCards = [];

        this.addCards(deck.characterCards, this.characterCards);
        this.addCards(deck.roomCards, this.roomCards);
        this.addCards(deck.weaponCards, this.weaponCards);
    }

    private addCards(cards: string[], cardProjectionList: CardProjection[]) {
        cards.forEach(card => {
            const cardProjection = new CardProjection(card);
            this.set(card, cardProjection);
            cardProjectionList.push(cardProjection);
        });
    }

    addAssertions(assertions: Assertion[]) {
        assertions.forEach(assertion => {
            if (assertion.assertionType == AssertionType.Has) {
                this.get(assertion.cardName).owner = assertion.playerName;
            }
            else {
                this.get(assertion.cardName).notOwners.add(assertion.playerName);
            }
        });
    }
}

export class CardProjection {
    name: string;
    owner: string | null;
    notOwners: Set<string>;

    constructor(name: string) {
        this.owner = null;
        this.notOwners = new Set<string>();
    }
}