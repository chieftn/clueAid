import * as React from 'react';
import * as PropTypes from 'prop-Types';
import { Alert } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { Deck } from '../../model/deck';
import { myName } from '../../model/game';
import { GameSetupCardList } from './GameSetupCardList';
import { GameSetupPlayerList } from './GameSetupPlayerList';
import { Player } from '../../model/Player';
import { Redirect } from 'react-router';

export interface GameSetupProps {
    deck: Deck;
    addPlayer: (player: Player) => void;
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
    playerCharacterCards: string[];
    playerRoomCards: string[];
    playerWeaponCards: string[];
    redirectToTracker: boolean;
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
                { name: myName, isUser: true},
                { name: '', isUser: false}
            ],
            playerCharacterCards: [],
            playerWeaponCards: [],
            playerRoomCards: [],
            redirectToTracker: false,
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
            
            this.state.players.forEach((player) => {
                this.props.addPlayer(player)
            })

            //add assertions.
            
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

        const allCharactersSelected = this.state.playerCharacterCards.length === this.props.deck.characterCards.length;
        const allRoomCardsSelected = this.state.playerRoomCards.length === this.props.deck.roomCards.length;
        const allWeaponCardsSelected = this.state.playerWeaponCards.length === this.props.deck.weaponCards.length;
            
        return (allCharactersSelected ||
            allWeaponCardsSelected ||
            allRoomCardsSelected);
    }

    private noCardsSelected(): boolean {
        const noCharactersSelected = this.state.playerCharacterCards.length === 0;
        const noWeaponCardsSelected = this.state.playerWeaponCards.length === 0;
        const noRoomCardsSelected = this.state.playerRoomCards.length === 0;
            
        return (noCharactersSelected && 
            noWeaponCardsSelected && 
            noRoomCardsSelected);
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
                                <GameSetupCardList 
                                    cards={this.props.deck.characterCards} 
                                    toggleCardSelection={this.onCharacterCardClick}
                                    selectedCards={this.state.playerCharacterCards} />
                                <GameSetupCardList 
                                    cards={this.props.deck.weaponCards} 
                                    toggleCardSelection={this.onWeaponCardClick}
                                    selectedCards={this.state.playerWeaponCards} />
                                <GameSetupCardList 
                                    cards={this.props.deck.roomCards} 
                                    toggleCardSelection={this.onRoomCardClick}
                                    selectedCards={this.state.playerRoomCards} />
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
            name: '',
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
        let characterCards: string[] = [...this.state.playerCharacterCards];
        const cardIndex = characterCards.indexOf(cardName);

        if (cardIndex === -1) {
            characterCards.push(cardName);
        }
        else {
            characterCards = characterCards.slice(cardIndex + 1);
        }

        this.setState({
            playerCharacterCards: characterCards
        });
    }

    private onRoomCardClick = (cardName: string): void => {
        let roomCards: string[] = [...this.state.playerRoomCards];

        const cardIndex = roomCards.indexOf(cardName);
        if (cardIndex === -1) {
            roomCards.push(cardName);
        }
        else {
            roomCards = roomCards.slice(cardIndex + 1);
        }
        
        this.setState({
            playerRoomCards: roomCards
        });    
    }

    private onWeaponCardClick = (cardName: string): void => {
        let weaponCards: string[] = [...this.state.playerWeaponCards];
        const cardIndex = weaponCards.indexOf(cardName);

        if (cardIndex === -1) {
            weaponCards.push(cardName);
        }
        else {
            weaponCards = weaponCards.slice(cardIndex + 1);
        }

        this.setState({
            playerWeaponCards: weaponCards
        });
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