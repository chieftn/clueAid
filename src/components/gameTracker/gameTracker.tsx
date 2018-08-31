import * as React from 'react';
import { Player } from '../../model/player';
import { Deck } from '../../model/deck';
import { Suspicion } from '../../model/suspicion';

export interface GameTrackerProps {
    deck: Deck;
    players: Player[];
    addSuspicion: (suspicion: Suspicion) => void;
}

export class GameTracker extends React.Component<GameTrackerProps, {}> {

    constructor(props: GameTrackerProps) {
        super(props);
    }
    
    render() {
        return (
            <div>
                <ul>
                    {this.props.players.map(player => <li>{player.name}</li>)}
                </ul>
            </div>
        )
    }
}