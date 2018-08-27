import * as gameActions from "../actions/gameActions";
import * as React from 'react';
import * as PropTypes from "prop-Types";
import { Alert } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { Card, CardFactory, CardType } from "../model/Card";
import { GameSetupCardList } from "./GameSetupCardList";
import { GameSetupPlayerList } from "./GameSetupPlayerList";
import {Player } from "../model/Player";

export interface GameSetupProps {}
export interface GameSetupValidationState {
    show: boolean;
    allCardsSelected: boolean;
    noCardsSelected: boolean;
    insufficientPlayers: boolean;
    invalidPlayers: Player[];
}
export interface GameSetupState {
    players: Player[];
    cards: Card[];
    validations: GameSetupValidationState;
}

export class GameSetup extends React.Component<GameSetupProps, GameSetupState> {

    static contextTypes = {
        store: PropTypes.object
    }

    constructor(props: GameSetupProps) {
        super(props);
        this.state = {
            players: [
                { name: "Me", isUser: true},
                { name: "", isUser: false}
            ],
            cards: CardFactory(),
            validations: {
                show: false,
                allCardsSelected: false,
                noCardsSelected: true,
                insufficientPlayers: true,
                invalidPlayers: []
            }
        }
    }

    private submit(): void {
        
        let validationState = this.getValidationState();
        
        this.setState({
            validations: validationState
        });
    }

    private createGame(): void {
        let {store} = this.context;
        store.dispatch(gameActions.addGame);
    }

    private getValidationState(): GameSetupValidationState {

        let invalidPlayers = this.getInvalidPlayers();
        let selectedCards = this.getSelectedCards();

        let noCardsSelected: boolean = selectedCards.length === 0;
        let allCardsSelected: boolean =
            selectedCards.length === this.state.cards.length ||
            this.allCardsOfTypeSelected(selectedCards);

        let insufficientPlayers = this.state.players.length < 3;

        let showValidation = 
            invalidPlayers.length > 0 ||
            noCardsSelected ||
            allCardsSelected || 
            insufficientPlayers;


        return {
            show: showValidation,
            allCardsSelected: allCardsSelected,
            noCardsSelected: noCardsSelected,
            insufficientPlayers: insufficientPlayers,
            invalidPlayers: invalidPlayers
        }
    }

    private allCardsOfTypeSelected(selectedCards: Card[]): boolean {

        let selectedCharacterCards: Card[] = selectedCards.filter((card) => card.type === CardType.Character);
        let characterCards: Card[] = this.state.cards.filter((card) => card.type === CardType.Character);
        if (selectedCharacterCards.length === characterCards.length) return true;

        let selectedWeaponCards: Card[] = selectedCards.filter((card) => card.type === CardType.Weapon);
        let weaponCards: Card[] = this.state.cards.filter((card) => card.type === CardType.Weapon);
        if (selectedWeaponCards.length === weaponCards.length) return true;

        let selectedRoomCards: Card[] = selectedCards.filter((card) => card.type === CardType.Room);
        let roomCards: Card[] = this.state.cards.filter((card) => card.type === CardType.Room);
        if (selectedRoomCards.length === roomCards.length) return true;

        return false;
    }

    private getSelectedCards(): Card[] {

        const selectedCards = this.state.cards.filter((card) => {
            return card.owner !== null;
        })

        return selectedCards;
    }

    private getInvalidPlayers(): Player[] {

        const invalidPlayers = this.state.players.filter((player) => {
            return player.name === "";
        })

        return invalidPlayers;
    }

    private toggleCardSelection(cardName: string): void {

        const cards = this.state.cards.map((card) => {
            if (card.name == cardName) {
                if (!!card.owner) card.owner = null;
                else card.owner = this.state.players.filter((player) => player.isUser === true)[0]; 
            }

            return card;
        })

        this.setState({cards: cards})
    }

    private removePlayer(index: number): void {
        let players = this.state.players.filter((player, playerIndex) => {
            return playerIndex !== index;
        });

        this.setState({ players: players});
    }

    private increaseIndexByOne(index: number): void {
        let players = [...this.state.players];
        let swap = players[index + 1];
        players[index + 1] = players[index];
        players[index] = swap;

        this.setState({players: players});
    }

    private decreaseIndexByOne(index: number): void {
        let players = [...this.state.players];
        let swap = players[index - 1];
        players[index - 1] = players[index];
        players[index] = swap;

        this.setState({players: players});
    }

    private dismissValidationAlert(): void {
        this.setState({
            validations: {
                show: false,
                allCardsSelected: this.state.validations.allCardsSelected,
                noCardsSelected: this.state.validations.noCardsSelected,
                insufficientPlayers: this.state.validations.insufficientPlayers,
                invalidPlayers: [...this.state.validations.invalidPlayers]
            }
        });
    }

    render() {

       return( 
            <div className="gameSetup">
                {
                    this.state.validations.show &&
                    this.state.validations.noCardsSelected &&
                     <Alert bsStyle="danger" onDismiss={this.dismissValidationAlert}>
                     <h4>Uh oh!</h4>
                     <p>
                       Please tell me what cards you have.
                     </p>
                   </Alert>
                }

                {
                    this.state.validations.show &&
                    this.state.validations.allCardsSelected &&
                     <Alert bsStyle="danger" onDismiss={this.dismissValidationAlert}>
                     <h4>Uh oh!</h4>
                     <p>
                       You appear to have all the cards.
                     </p>
                   </Alert>
                }

                 {
                    this.state.validations.show &&
                    this.state.validations.invalidPlayers.length > 0 &&
                     <Alert bsStyle="danger" onDismiss={this.dismissValidationAlert}>
                     <h4>Uh oh!</h4>
                     <p>
                       You might need to enter some player names.
                     </p>
                   </Alert>
                }

                {
                    this.state.validations.show &&
                    this.state.validations.insufficientPlayers &&
                     <Alert bsStyle="danger" onDismiss={this.onDismissValidationAlert}>
                     <h4>Uh oh!</h4>
                     <p>
                       You might need to add players (or make more friends).
                     </p>
                   </Alert>
                }
                
                <form>
                    <div className="gameSetupForm">
                        
                        <div className="gameSetupSection">
                            <div className="gameSetupSectionHeader">Who's playing (and in what order)?</div>
                            <GameSetupPlayerList 
                                players={this.state.players} 
                                invalidPlayers={this.state.validations.invalidPlayers}
                                addPlayer={this.addPlayer} 
                                changePlayer={this.changePlayerHandler}
                                removePlayer={this.removePlayerHandler} 
                                movePlayerDown={this.movePlayerDownHandler}
                                movePlayerUp={this.movePlayerUpHandler} 
                                />
                        </div>

                        <div className="gameSetupSection">
                            <div className="gameSetupSectionHeader">What cards do you have?</div>
                            <GameSetupCardList toggleCardSelection={value=>this.toggleCardSelection(value)} cards={this.state.cards} />
                        </div>
                    </div>
                    
                    <div className="gameSetupSection">
                        <Button bsStyle="primary" bsSize="large" onClick={()=>this.submit()}>Submit</Button>
                    </div>
                </form>
            </div>)
    }

    private addPlayer = (): void => {
        let players = [...this.state.players];
        players.push({
            name: "",
            isUser: false
        });
        
        this.setState({ players: players});
    }

    private changePlayerHandler = (index: number, player: Player): void => {
        let players = [...this.state.players];
        players[index] = player;

        this.setState({players: players});
    }

    private removePlayerHandler = (index: number): void => {
        this.removePlayer(index);
    }

    private movePlayerDownHandler = (index: number): void => {
        this.increaseIndexByOne(index);
    }

    private movePlayerUpHandler = (index: number): void => {
        this.decreaseIndexByOne(index);
    }

    private onDismissValidationAlert = (): void => {
        this.dismissValidationAlert();
    }
}

