import * as React from 'react';
import * as PropTypes from 'prop-Types';
import { Alert } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { Card } from '../../model/card';
import { generateDeck } from '../../model/deck';
import { Game, myName } from '../../model/game';
import { GameSetupCardList } from './GameSetupCardList';
import { GameSetupPlayerList } from './GameSetupPlayerList';
import { Player } from '../../model/Player';
import { setGameAction } from '../../redux/game/actions';
import  store from '../../redux/store';
import { Redirect } from 'react-router';

export interface GameSetupProps {
    currentGame: Game;
    createGame: (game: Game) => void;
}

export interface GameSetupValidationState {
    show: boolean;
    allCardsSelected: boolean;
    noCardsSelected: boolean;
    insufficientPlayers: boolean;
    invalidPlayers: Player[];
}
export interface GameSetupState {
    
    players: Player[];
    characterCards: Card[];
    redirectToTracker: boolean;
    roomCards: Card[];
    weaponCards: Card[];
    validations: GameSetupValidationState;
}

export class GameSetup extends React.Component<GameSetupProps, GameSetupState> {

    static contextTypes = {
        store: PropTypes.object
    }

    constructor(props: GameSetupProps) {
        super(props);

        const deck = generateDeck();
        this.state = {
            players: [
                { name: myName, isUser: true},
                { name: '', isUser: false}
            ],
            characterCards: deck.characters,
            redirectToTracker: false,
            roomCards: deck.rooms,
            weaponCards: deck.weapons,
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
        let redirectToTracker = false;

        if (!validationState.show) {
            const game: Game = {
                players: this.state.players,
                deck: {
                    characters: this.state.characterCards,
                    rooms: this.state.roomCards,
                    weapons: this.state.weaponCards
                },
                suspicions: []
            };

            this.props.createGame(game);
            redirectToTracker = true;
        }

        this.setState({
            validations: validationState,
            redirectToTracker: redirectToTracker
        });
    }

    private getValidationState(): GameSetupValidationState {

        let invalidPlayers = this.getInvalidPlayers();
        let noCardsSelected: boolean = this.noCardsSelected()
        let allCardsSelected: boolean = this.allCardsSelected();
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

    private allCardsSelected(): boolean {

        let selectedCharacters = this.state.characterCards.filter(card => card.owner !== null)
        if (selectedCharacters.length === this.state.characterCards.length) return true;

        let selectedRooms = this.state.roomCards.filter(card => card.owner !== null)
        if (selectedRooms.length === this.state.roomCards.length) return true;
        
        let selectedWeapons = this.state.weaponCards.filter(card => card.owner !== null)
        if (selectedWeapons.length === this.state.weaponCards.length) return true;

        return false;
    }

    private noCardsSelected(): boolean {
        
        let selectedCharacters = this.state.characterCards.filter(card => card.owner !== null)
        let selectedRooms = this.state.roomCards.filter(card => card.owner !== null)
        let selectedWeapons = this.state.weaponCards.filter(card => card.owner !== null)

        return (selectedCharacters.length === 0 && selectedRooms.length === 0 && selectedWeapons.length === 0);
    }

    private getInvalidPlayers(): Player[] {

        let set = new Set<string>();
        const myNameLower = myName.toLowerCase();
        const invalidPlayers = this.state.players.filter((player) => {
            const nameLower = player.name.toLowerCase();

            if (player.name === '') return true;
            if (set.has(nameLower)) return true;

            if (nameLower === myNameLower && !player.isUser) return true;            
            if (nameLower !== myNameLower) { 
                set.add(nameLower);
            }

            return false;
        });

        return invalidPlayers;
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

    render() {

        if (this.state.redirectToTracker) {
            return (<Redirect to="gameTracker"/>);
        }

        console.log(this.props.currentGame);
        console.log(this.props.createGame);
       return( 
            <div className="gameSetup">
                {
                    this.state.validations.show &&
                     <Alert bsStyle="danger" onDismiss={this.dismissValidationAlert}>
                     <h4>Uh oh!</h4>
                     <ul>
                         {this.state.validations.noCardsSelected && <li>Please tell me what cards you have.</li>}
                         {this.state.validations.allCardsSelected && <li>You appear to have all the cards.</li>}
                         {this.state.validations.invalidPlayers.length > 0 && <li>You have players with duplicate or missing names.</li>}
                         {this.state.validations.insufficientPlayers && <li>You need at least three people to play the game.</li>}
                     </ul>
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
                            <div>
                                <GameSetupCardList cards={this.state.characterCards} toggleCardSelection={this.onCharacterCardClick} />
                                <GameSetupCardList cards={this.state.weaponCards} toggleCardSelection={this.onWeaponCardClick} />
                                <GameSetupCardList cards={this.state.roomCards} toggleCardSelection={this.onRoomCardClick} />
                            </div>
                            
                                
                        </div>
                    </div>
                    
                    <div className="gameSetupSection">
                        <Button bsStyle="primary" bsSize="large" onClick={()=>this.submit()}>Submit</Button>
                    </div>
                </form>
            </div>)
    }

    private dismissValidationAlert = (): void => {
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

    private onCharacterCardClick = (cardName: string): void => {
        const cards = this.state.characterCards.map((card) => {
            if (card.name == cardName) {
                if (!!card.owner) card.owner = null;
                else card.owner = this.state.players.filter((player) => player.isUser === true)[0]; 
            }

            return card;
        })

        this.setState({characterCards: cards})
    }

    private onRoomCardClick = (cardName: string): void => {
        const cards = this.state.roomCards.map((card) => {
            if (card.name == cardName) {
                if (!!card.owner) card.owner = null;
                else card.owner = this.state.players.filter((player) => player.isUser === true)[0]; 
            }

            return card;
        })

        this.setState({roomCards: cards})
    }

    private onWeaponCardClick = (cardName: string): void => {
        const cards = this.state.weaponCards.map((card) => {
            if (card.name == cardName) {
                if (!!card.owner) card.owner = null;
                else card.owner = this.state.players.filter((player) => player.isUser === true)[0]; 
            }

            return card;
        })

        this.setState({weaponCards: cards})
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
}

