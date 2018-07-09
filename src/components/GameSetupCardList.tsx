import * as React from 'react';
import { Button } from "react-bootstrap";
import { Card, CardType } from "../model/Card";

export interface GameSetupCardListProps {
    toggleCardSelection(cardName: string): void;
    cards: Card[];
}


export class GameSetupCardList extends React.Component<GameSetupCardListProps, {}> {

    constructor(props: GameSetupCardListProps) {
        super(props);
    }

    private generateButton(card: Card): JSX.Element {

        return  <Button 
                    className="gameSetupCard"
                    key={card.name}
                    bsStyle={card.owner === null ? "default" : "info"}
                    onClick={() => this.props.toggleCardSelection(card.name)}>
                {card.name}
            </Button>
    }

    render() {

        const characterButtons: JSX.Element[] = [];
        const weaponButtons: JSX.Element[] = [];
        const roomButtons: JSX.Element[] = [];

        this.props.cards.forEach((card) => {
            switch (card.type) {
                case CardType.Character:  {
                    characterButtons.push(this.generateButton(card));
                    break;
                }
                case CardType.Weapon: {
                    weaponButtons.push(this.generateButton(card));
                    break;
                }
                default: {
                    roomButtons.push(this.generateButton(card));
                }
            };
        })

        return (
            <div>
                <div className="gameSetupCards">{characterButtons}</div>
                <div className="gameSetupCards">{weaponButtons}</div>
                <div className="gameSetupCards">{roomButtons}</div>
            </div>
        )
    }
}