import * as React from 'react';
import { Button } from 'react-bootstrap';
import { GameTrackerPlayer } from './gameTrackerPlayer';
import { GameTrackerSuspicion } from './gameTrackerSuspicion';
import { GameTrackerSuspicionSummary } from './gameTrackerSuspicionSummary';
import { Modal } from 'react-bootstrap';
import { Player } from '../../model/player';
import { Deck } from '../../model/deck';
import { Suspicion } from '../../model/suspicion';

export interface GameTrackerProps {
    deck: Deck;
    players: Player[];
    suspicions: Suspicion[];
    addSuspicion: (suspicion: Suspicion) => void;
}

export interface GameTrackerState {
    showSuspicionDialog: boolean;
}

export class GameTracker extends React.Component<GameTrackerProps, GameTrackerState> {

    constructor(props: GameTrackerProps) {
        super(props);

        this.state = {
            showSuspicionDialog: false
        };
    }
    
    render(): JSX.Element {
        return (
            <div className='gameTracker'>
                <div className='gameTrackerHeader'>Player Status</div>
                <div className='gameTrackerPlayerList'>
                    {this.props.players.map(player => <GameTrackerPlayer name={player.name} cardsInHand={[]} cardsNotInHand={[]} /> )}
                </div>
                <div className='gameTrackerlaunchSuspicion'>
                    <Button bsStyle="primary" bsSize="large" onClick={this.launchSuspicionDialog}>Add Suspicion</Button>
                </div>
                <div className='gameTrackerHeader'>Suspicions</div>
                <div className='gameTrackerSuspicionList'>
                    {this.props.suspicions.map(suspicion => <GameTrackerSuspicionSummary suspicion={suspicion}/>)}
                </div>

                <Modal show={this.state.showSuspicionDialog} onHide={this.closeSuspicionDialog}>
                    <Modal.Header closeButton={true}>
                        <Modal.Title>Add Suspicion</Modal.Title>
                    </Modal.Header>
                    <GameTrackerSuspicion 
                        deck={this.props.deck} 
                        addSuspicion={this.addSuspicion} 
                        players={this.props.players}
                        close={this.closeSuspicionDialog} />
                </Modal>
            </div>
        )
    }

    onHide = (): void => {}

    addSuspicion = (suspicion: Suspicion): void => {
        this.props.addSuspicion(suspicion);
    }

    launchSuspicionDialog = (): void => {
        this.setState({
            showSuspicionDialog: true
        });
    }

    closeSuspicionDialog = (): void => {
        this.setState({
            showSuspicionDialog: false
        });
    }
}