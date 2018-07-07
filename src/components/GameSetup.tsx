import * as gameActions from "../actions/gameActions";
import * as React from 'react';
import * as PropTypes from "prop-Types";
import { Alert } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { Card, CardFactory } from "../model/Card";
import { GameSetupCardList } from "./GameSetupCardList";
import { GameSetupPlayerList } from "./GameSetupPlayerList";
import {Player } from "../model/Player";

export interface GameSetupProps {}
export interface GameSetupState {
    players: Player[];
    cards: Card[];
    validations: {
        show: boolean;
        allCardsSelected: boolean;
        noCardsSelected: boolean;
        invalidPlayers: Player[];
    }
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
                invalidPlayers: []
            }
        }
    }

    private submit(): void {
        this.setState({
            validations: {
                show: true,
                allCardsSelected: false,
                noCardsSelected: true,
                invalidPlayers: [this.state.players[0]]
            }
        });



    }

    private createGame(): void {
        let {store} = this.context;
        store.dispatch(gameActions.addGame);
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

    private addPlayer(): void {
        let players = [...this.state.players];
        players.push({
            name: "",
            isUser: false
        });
        
        this.setState({ players: players});
    }

    private removePlayer(index: number): void {
        let players = this.state.players.filter((player, playerIndex) => {
            return playerIndex !== index;
        });

        this.setState({ players: players});
    }

    private changePlayer(index: number, player: Player): void {
        
        let players = [...this.state.players];
        players[index] = player;

        this.setState({players: players});
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
                     <Alert bsStyle="danger" onDismiss={()=> this.dismissValidationAlert()}>
                     <h4>Uh oh!</h4>
                     <p>
                       Please tell me what cards you have.
                     </p>
                   </Alert>
                }

                  {
                    this.state.validations.show &&
                    this.state.validations.allCardsSelected &&
                     <Alert bsStyle="danger" onDismiss={()=> this.dismissValidationAlert()}>>
                     <h4>Uh oh!</h4>
                     <p>
                       You appear to have all the cards.
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
                                addPlayer={()=>this.addPlayer()} 
                                changePlayer={(index, player)=>this.changePlayer(index, player)}
                                removePlayer={(index) => this.removePlayer(index)} 
                                movePlayerDown={(index) => this.increaseIndexByOne(index)}
                                movePlayerUp={(index) => this.decreaseIndexByOne(index)} 
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
}

