import { Assertion, AssertionType } from '../model/assertion';
import { Deck } from '../model/Deck';
import { LinkedList } from './linkedList';
import { myName, noOne, Player } from '../model/player';
import { PlayerHandProjection } from '../model/playerHandProjection';
import { DeckProjection, CardProjection } from '../model/DeckProjection';
import { Suspicion } from '../model/suspicion';
import { noop } from 'redux-saga/utils';


export class AssertionGenerator {

    private playerList: LinkedList<Player>;
    private suspicions: Suspicion[];
    private deckProjection: DeckProjection;

    constructor(priorAssertions: Assertion[], players: Player[], suspicions: Suspicion[], deck: Deck) {
        this.suspicions = suspicions;
        this.playerList = new LinkedList(players);
        this.deckProjection = new DeckProjection(deck);

        this.deckProjection.addAssertions(priorAssertions);

    }

    generateAssertions(): Assertion[] {

        const assertions: Assertion[] = this.deduceAssertions();
        let rerunInferences: boolean = true;
        do {
            const inferredAssertionsFromDeck = this.inferAssertionsFromDeckProjection();
            this.deckProjection.addAssertions(inferredAssertionsFromDeck);

            const inferredCharacterAssertions = this.inferAssertionsFromCardSet(this.deckProjection.characterCards);
            this.deckProjection.addAssertions(inferredCharacterAssertions);

            const inferredRoomAssertions = this.inferAssertionsFromCardSet(this.deckProjection.roomCards);
            this.deckProjection.addAssertions(inferredRoomAssertions);

            const inferredWeaponAssertions = this.inferAssertionsFromCardSet(this.deckProjection.weaponCards);
            this.deckProjection.addAssertions(inferredWeaponAssertions);

            const inferredAssertionsFromSuspicions = this.inferAssertionsFromSuspicions();
            
            const inferredAssertions = [
                ...inferredAssertionsFromDeck,
                ...inferredCharacterAssertions,
                ...inferredWeaponAssertions,
                ...inferredRoomAssertions,
                ...inferredAssertionsFromSuspicions
            ];

            if (inferredAssertions.length == 0) {
                rerunInferences = false;
            }
            else {
                assertions.push(...inferredAssertions);
            }
        } while(rerunInferences)

        return assertions;
    }

    private inferAssertionsFromDeckProjection(): Assertion[] {

        const assertions: Assertion[] = [];
        this.deckProjection.forEach((cardProjection) => {

            if (cardProjection.notOwners.keys.length == this.playerList.nodes.length) {
                assertions.push(...this.generateHasAssertion(noOne, cardProjection.name));
            }
        });

        return assertions;
    }

    private inferAssertionsFromCardSet(cardProjections: CardProjection[]): Assertion[] {

        const cardsWithoutOwner = cardProjections.filter(cardProjection => cardProjection.owner === null);
        if (cardsWithoutOwner.length = 1) {
            return [...this.generateHasAssertion(noOne, cardsWithoutOwner[0].name)];
        }

        return [];
    }

    private inferAssertionsFromSuspicions(): Assertion[] {

        const assertions: Assertion[] = [];
        this.suspicions.forEach((suspicion) => {

            const suspicionAssertions = this.inferAssertionFromSuspicion(suspicion);
            this.deckProjection.addAssertions(suspicionAssertions);
            assertions.push(...suspicionAssertions);
        });
        
        return assertions;
    }

    private inferAssertionFromSuspicion(suspicion: Suspicion): Assertion[] {

        const assertions: Assertion[] = [];

        const characterHasOtherOwner = (
            this.deckProjection.get(suspicion.suspectedCharacter).owner !== null && 
            this.deckProjection.get(suspicion.suspectedCharacter).owner !== noOne && 
            this.deckProjection.get(suspicion.suspectedCharacter).owner !== suspicion.alibiFrom) ? 1 : 0;

        const roomHasOtherOwner = (
            this.deckProjection.get(suspicion.suspectedRoom).owner !== null && 
            this.deckProjection.get(suspicion.suspectedRoom).owner !== noOne && 
            this.deckProjection.get(suspicion.suspectedRoom).owner !== suspicion.alibiFrom) ? 1 : 0;

        const weaponHasOtherOwner = (
            this.deckProjection.get(suspicion.suspectedWeapon).owner != null &&
            this.deckProjection.get(suspicion.suspectedWeapon).owner !== noOne && 
            this.deckProjection.get(suspicion.suspectedWeapon).owner !== suspicion.alibiFrom) ? 1 : 0;

        if (characterHasOtherOwner + roomHasOtherOwner + weaponHasOtherOwner == 2) {
            if (!characterHasOtherOwner) {
                assertions.push(...this.generateHasAssertion(suspicion.alibiFrom, suspicion.suspectedCharacter));
                this.playerList.nodes.forEach((playerNode) => {
                    assertions.push(...this.generateDoesNotHaveAssertion(playerNode.value.name, suspicion.suspectedCharacter));
                });
            }

            if (!roomHasOtherOwner) {                
                assertions.push(...this.generateHasAssertion(suspicion.alibiFrom, suspicion.suspectedRoom));
                this.playerList.nodes.forEach((playerNode) => {
                    assertions.push(...this.generateDoesNotHaveAssertion(playerNode.value.name, suspicion.suspectedRoom));
                });
            }

            if (!weaponHasOtherOwner) {
                assertions.push(...this.generateHasAssertion(suspicion.alibiFrom, suspicion.suspectedWeapon));
                this.playerList.nodes.forEach((playerNode) => {
                    assertions.push(...this.generateDoesNotHaveAssertion(playerNode.value.name, suspicion.suspectedWeapon));
                });
            }
        }

        return assertions;
    }

    private deduceAssertions(): Assertion[] {

        if (this.suspicions.length === 0) return [];
        if (this.playerList.nodes.length === 0) return [];

        const lastSuspicion = this.suspicions[this.suspicions.length -1];
        
        const assertionsFromAlibiCard = this.deduceAssertionsFromAlibiCard(lastSuspicion);
        this.deckProjection.addAssertions(assertionsFromAlibiCard);

        const assertionsFromAlibiAbstainers = this.deduceAssertionsFromAlibiAbstainers(lastSuspicion);
        this.deckProjection.addAssertions(assertionsFromAlibiAbstainers);
        
        const characterAssertionsFromAbsentAlibi = this.deduceAssertionsFromAbsentAlibi(lastSuspicion.alibiFrom, lastSuspicion.suspectingPlayer, lastSuspicion.suspectedCharacter);
        this.deckProjection.addAssertions(characterAssertionsFromAbsentAlibi);

        const roomAssertionsFromAbsentAlibi = this.deduceAssertionsFromAbsentAlibi(lastSuspicion.alibiFrom, lastSuspicion.suspectingPlayer, lastSuspicion.suspectedRoom);
        this.deckProjection.addAssertions(roomAssertionsFromAbsentAlibi);

        const weaponAssertionsFromAbsentAlibi = this.deduceAssertionsFromAbsentAlibi(lastSuspicion.alibiFrom, lastSuspicion.suspectingPlayer, lastSuspicion.suspectedWeapon);
        this.deckProjection.addAssertions(weaponAssertionsFromAbsentAlibi);

        const assertions = [
            ...assertionsFromAlibiCard,
            ...assertionsFromAlibiAbstainers,
            ...characterAssertionsFromAbsentAlibi,
            ...roomAssertionsFromAbsentAlibi,
            ...weaponAssertionsFromAbsentAlibi
        ];

        return assertions;
    }

    private deduceAssertionsFromAlibiCard(suspicion: Suspicion): Assertion[] {

        const assertions: Assertion[] = [];
        if (suspicion.suspectingPlayer === myName && suspicion.alibiCard !== null) {
            assertions.push(...this.generateHasAssertion(suspicion.alibiFrom, suspicion.alibiCard));
            this.playerList.nodes.forEach((playerNode) => {
                assertions.push(...this.generateDoesNotHaveAssertion(playerNode.value.name, suspicion.alibiCard));
            });
        }

        return assertions;
    }

    private deduceAssertionsFromAlibiAbstainers(suspicion: Suspicion): Assertion[] {

        const suspectingPlayerIndex = this.playerList.nodes.findIndex(playerNode => playerNode.value.name === suspicion.suspectingPlayer);
        const assertions: Assertion[] = [];
        
        const suspectingPlayerName = this.playerList.nodes[suspectingPlayerIndex].value.name
        let playerWithoutAlibi = this.playerList.nodes[suspectingPlayerIndex].next;

        //loop until we get to alibi provider or back to suspectng player.
        while (playerWithoutAlibi.value.name !== suspicion.alibiFrom || 
            playerWithoutAlibi.value.name === suspectingPlayerName) {

            assertions.push(...this.generateDoesNotHaveAssertion(playerWithoutAlibi.value.name, suspicion.suspectedCharacter));
            assertions.push(...this.generateDoesNotHaveAssertion(playerWithoutAlibi.value.name, suspicion.suspectedRoom));
            assertions.push(...this.generateDoesNotHaveAssertion(playerWithoutAlibi.value.name, suspicion.suspectedWeapon));
        }

        return assertions;
    }

    private deduceAssertionsFromAbsentAlibi(alibiFrom: string, suspectingPlayerName: string, cardName: string): Assertion[] {

        if (alibiFrom !== noOne) return [];

        const canAssertSuspectingPlayerHasCard = this.deckProjection.get(cardName).owner == suspectingPlayerName; 
        if (canAssertSuspectingPlayerHasCard) {
            return this.generateDoesNotHaveAssertion(noOne, cardName);
        }

        const canAssertSuspectingPlayerDoesNotHaveCharacterCard = this.deckProjection.get(cardName).notOwners.has(suspectingPlayerName);
        if (canAssertSuspectingPlayerDoesNotHaveCharacterCard) {
            return this.generateHasAssertion(noOne, cardName);
        }
    }

    private generateDoesNotHaveAssertion(playerName: string, cardName: string): Assertion[] {

        if (this.deckProjection.get(cardName).notOwners.has(playerName)) return [];
        return [{
            playerName: playerName,
            assertionType: AssertionType.DoesNotHave,
            cardName: cardName
        }];
    }

    private generateHasAssertion(playerName: string, cardName: string): Assertion[] {

        if (this.deckProjection.get(cardName).owner) return [];
        return [{
            playerName: playerName,
            assertionType: AssertionType.Has,
            cardName: cardName
        }];
    }
}