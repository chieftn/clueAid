import * as React from 'react';
import { GameSetupCard } from './GameSetupCard';
import { Card } from '../../model/card'

export interface GameSetupCardListProps {
    toggleCardSelection(cardName: string): void;
    cards: Card[];
}

export class GameSetupCardList extends React.Component<GameSetupCardListProps, {}> {

    constructor(props: GameSetupCardListProps) {
        super(props);
    }

    render() {

        return (
            <div className="gameSetupCards">
                {this.props.cards.map(card => <GameSetupCard card={card} onClick={this.toggleCardSelection} />)}
            </div>
        )
    }

    private toggleCardSelection = (card: Card): void => {
        this.props.toggleCardSelection(card.name);
    }
}