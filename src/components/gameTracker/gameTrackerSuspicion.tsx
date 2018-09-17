import * as React from 'react';
import { Alert } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { Player, noOne, myName } from '../../model/player';
import { Deck } from '../../model/deck';
import { Suspicion } from '../../model/suspicion';
import { FormGroup } from 'react-bootstrap';
import { FormControl } from 'react-bootstrap';
import { ControlLabel } from 'react-bootstrap';

export interface GameTrackerSuspicionProps {
    deck: Deck;
    players: Player[];
    addSuspicion: (suspicion: Suspicion) => void;
    close: () => void;
}

export interface GameTrackerSuspicionState {
    suspectingPlayer: string | null;
    suspectedCharacter: string | null;
    suspectedRoom: string | null;
    suspectedWeapon: string | null;
    alibiFrom: string | null;
    alibiCard: string | null;
    showValidation: boolean;
    showAlibiCard: boolean;
}

export class GameTrackerSuspicion extends React.Component<GameTrackerSuspicionProps, GameTrackerSuspicionState> {
    constructor(props: GameTrackerSuspicionProps) {
        super(props);

        this.state = {
            suspectingPlayer: null,
            suspectedCharacter: null,
            suspectedRoom: null,
            suspectedWeapon: null,
            alibiFrom: null,
            alibiCard: null,
            showValidation: false,
            showAlibiCard: false
        };
    }

    private isValid = (suspicion: Suspicion): boolean => {
        if (!suspicion.alibiFrom) return false;
        if (!suspicion.suspectedCharacter) return false;
        if (!suspicion.suspectedRoom) return false;
        if (!suspicion.suspectedWeapon) return false;
        if (!suspicion.suspectingPlayer) return false;

        if (suspicion.suspectingPlayer == myName && suspicion.alibiFrom != noOne) {
            return !!suspicion.alibiCard;
        }

        return true;
     }

    private addSuspicion = (): void => {
        const suspicion: Suspicion = {
            alibiCard: this.state.alibiCard,
            alibiFrom: this.state.alibiFrom,
            suspectingPlayer: this.state.suspectingPlayer,
            suspectedCharacter: this.state.suspectedCharacter,
            suspectedWeapon: this.state.suspectedWeapon,
            suspectedRoom: this.state.suspectedRoom
        }

        const validSuspicion = this.isValid(suspicion);
        if (validSuspicion) {
            this.props.addSuspicion(suspicion);
            this.props.close();
        }
        else {
            this.setState({
                showValidation: true
            })
        }
    }

    private onAlibiFromChange = (event: any): void => {
        
        if (event.target.value === '') return;
        
        const showAlibiCard = event.target.value !== noOne && this.state.suspectingPlayer === myName;
        this.setState({
            alibiCard: showAlibiCard ? this.state.alibiCard : null,
            alibiFrom: event.target.value,
            showAlibiCard: showAlibiCard
        });   
    }

    private onSuspectingPlayerChange = (event: any): void => {

        if (event.target.value === '') return;

        const showAlibiCard = 
            event.target.value === myName 
            && this.state.alibiFrom !== noOne 
            && this.state.alibiFrom !== null

        this.setState({
            alibiCard: showAlibiCard ? this.state.alibiCard : null,
            suspectingPlayer: event.target.value,
            showAlibiCard: showAlibiCard
        });
    }

    private onSuspectedCharacterChange = (event: any): void => {
        
        if (event.target.value === '') return;
        
        this.setState({
            suspectedCharacter: event.target.value
        });
    }

    private onSuspectedRoomChange = (event: any): void => {
        
        if (event.target.value === '') return;

        this.setState({
            suspectedRoom: event.target.value
        });
    }

    private onSuspectedWeaponChange = (event: any): void => {
        
        if (event.target.value === '') return;

        this.setState({
            suspectedWeapon: event.target.value
        });
    }

    private dismissValidationAlert = (): void => {
        this.setState({
            showValidation: false
        });
    }

    render(): JSX.Element {
        return (
            <div className='gameTrackerSuspicion'>

                {this.state.showValidation &&
                    <Alert bsStyle="danger" onDismiss={this.dismissValidationAlert}>
                        <h4>Uh oh!</h4>
                        <div>Please ensure you have answered all questions.</div>
                    </Alert>
                }

                <form>
                    <ControlLabel>Suspecting Player</ControlLabel>
                    <FormGroup controlId="formControlsSelect">
                        <FormControl componentClass="select" placeholder="(Suspecting Player)" onChange={this.onSuspectingPlayerChange}>
                            <option></option>
                            {this.props.players.map((player) => {
                                return <option value={player.name}>{player.name}</option>
                            })}
                        </FormControl>
                    </FormGroup>

                    <ControlLabel>Suspected Character</ControlLabel>
                    <FormGroup controlId="formControlsSelect">
                        <FormControl componentClass="select" placeholder="(Character)" onChange={this.onSuspectedCharacterChange}>
                            <option></option>
                            {this.props.deck.characterCards.map((card) => {
                                return <option value={card}>{card}</option>
                            })}
                        </FormControl>
                    </FormGroup>

                    <ControlLabel>Suspected Weapon</ControlLabel>
                    <FormGroup controlId="formControlsSelect">
                        <FormControl componentClass="select" placeholder="(Weapon)" onChange={this.onSuspectedWeaponChange}>
                            <option></option>
                            {this.props.deck.weaponCards.map((card) => {
                                return <option value={card}>{card}</option>
                            })}
                        </FormControl>
                    </FormGroup>

                    <ControlLabel>Suspected Room</ControlLabel>
                    <FormGroup controlId="formControlsSelect">
                        <FormControl componentClass="select" placeholder="(Room)" onChange={this.onSuspectedRoomChange}>
                            <option></option>
                            {this.props.deck.roomCards.map((card) => {
                                return <option value={card}>{card}</option>
                            })}
                        </FormControl>
                    </FormGroup>

                    <ControlLabel>With Alibi From</ControlLabel>
                    <FormGroup controlId="formControlsSelect">
                        <FormControl componentClass="select" placeholder="(Room)" onChange={this.onAlibiFromChange}>
                            <option></option>
                            {this.props.players
                                .filter(player => this.state.suspectingPlayer !== player.name)
                                .map(player => <option value={player.name}>{player.name}</option>)
                            }
                            <option value={noOne}>{noOne}</option>
                        </FormControl>
                    </FormGroup>

                    {this.state.showAlibiCard &&
                        <div>
                            <ControlLabel>Showing you...</ControlLabel>
                            <FormGroup controlId="formControlsSelect">
                                <FormControl componentClass="select" placeholder="(Weapon)" onChange={this.onSuspectedWeaponChange}>
                                    <option></option>
                                    <option value={this.state.suspectedCharacter}>{this.state.suspectedCharacter}</option>
                                    <option value={this.state.suspectedWeapon}>{this.state.suspectedWeapon}</option>
                                    <option value={this.state.suspectedRoom}>{this.state.suspectedRoom}</option>
                                </FormControl>
                            </FormGroup>
                        </div>
                    }

                    <Button bsSize="large" onClick={this.addSuspicion}>Add</Button>
                </form>
            </div>);
    }
}