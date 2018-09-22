import * as React from 'react';
import { Button } from 'react-bootstrap';
import { Assertion } from '../../model/assertion';
import { GameTrackerPlayer } from './gameTrackerPlayer';
import { GameTrackerSuspicion } from './gameTrackerSuspicion';
import { GameTrackerSuspicionSummary } from './gameTrackerSuspicionSummary';
import { Modal } from 'react-bootstrap';
import { noOne, Player } from '../../model/player';
import { PlayerProjection } from '../../model/playerProjection';
import { PlayerHand} from '../../model/playerProjection';
import { Deck } from '../../model/deck';
import { Suspicion } from '../../model/suspicion';

export interface GameTrackerProps {
    deck: Deck;
    players: Player[];
    suspicions: Suspicion[];
    assertions: Assertion[];
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

                <div className="gameTrackerSummary">
                    <div className="gameTrackerConfidentialCardsSection">
                        <div className='gameTrackerHeader'>Confidential Cards</div>
                    </div>

                    <div className="gameTrackerPlayerCardsSection">
                        <div className='gameTrackerHeader'>Player Cards</div>
                        <div className='gameTrackerPlayerList'>
                            {this.generatePlayerProjection()
                                .filter(playerHand => playerHand.playerName !== noOne)  
                                .map(playerHand => <GameTrackerPlayer name={playerHand.playerName} cardsInHand={playerHand.cardsInHand} cardsNotInHand={playerHand.cardsNotInHand} /> )}
                        </div>
                    </div>

                    <div className='gameTrackerlaunchSuspicion'>
                        <Button bsStyle="primary" bsSize="large" onClick={this.launchSuspicionDialog}>Add Suspicion</Button>
                    </div>
                </div>

                <div className="gameTrackDetails">
                    <div className="gameTrackerSuspicionListSection">
                        <div className='gameTrackerHeader'>Suspicions</div>
                        <GameTrackerSuspicionSummary suspicions={this.props.suspicions} />
                    </div>
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

    generatePlayerProjection = (): PlayerHand[] => {
        const playerProjection = new PlayerProjection(this.props.players);
        playerProjection.addAssertions(this.props.assertions);

        return playerProjection.toArray();
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