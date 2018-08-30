import * as React from 'react';
import { Game } from '../../model/game';

export interface GameTrackerProps {
    game: Game;
    reviseGame: (game: Game) => void; 
}

export class GameTracker extends React.Component<GameTrackerProps, {}> {

    constructor(props: GameTrackerProps) {
        super(props);
    }

    //{this.props.game.players.map(player => <li>{player.name}</li>)}
    render() {
        return (
            <div>
                <ul>
                    <li>Here</li>
                </ul>
            </div>
        )
    }
}