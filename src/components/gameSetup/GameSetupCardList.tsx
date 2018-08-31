import * as React from 'react';
import { GameSetupCard } from './GameSetupCard';

export interface GameSetupCardListProps {
    toggleCardSelection(card: string): void;
    selectedCards: string[];
    cards: string[]
}

export class GameSetupCardList extends React.Component<GameSetupCardListProps, {}> {

    constructor(props: GameSetupCardListProps) {
        super(props);
    }

    render() {
        return (
            <div className="gameSetupCards">
                {this.props.cards.map(card => 
                <GameSetupCard 
                    card={card} 
                    selected={this.props.selectedCards.indexOf(card) > -1} 
                    onClick={this.toggleCardSelection} />)}
            </div>
        )
    }

    private toggleCardSelection = (card: string): void => {
        this.props.toggleCardSelection(card);
    }
}