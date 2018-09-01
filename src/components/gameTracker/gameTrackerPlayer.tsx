import * as React from 'react';

export interface GameTrackerPlayerProps {
    name: string;
    cardsInHand: string[];
    cardsNotInHand: string[];
}

export class GameTrackerPlayer extends React.Component<GameTrackerPlayerProps, {}> {

    constructor(props: GameTrackerPlayerProps) {
        super(props);
    }
    
    render(): JSX.Element {
        return (
            <div key={this.props.name} className='gameTrackerPlayer'>
                <div className='gameTrackerPlayerName'>{this.props.name}</div>
                <div className='gameTrackerPlayerHandHeader'>Cards In Hand</div>
                <ul className='gameTrackerPlayerHandList'>
                    {this.props.cardsInHand.map(card => <li className='gameTrackerPlayerCard'>{card}</li>)}
                </ul>
                <div className='gameTrackerPlayerHandHeader'>Cards Not In Hand</div>
                <ul>
                    {this.props.cardsNotInHand.map(card => <li className='gameTrackerPlayerCard'>{card}</li>)}
                </ul>
            </div>
        )
    }
}