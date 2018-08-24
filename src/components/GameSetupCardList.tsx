import * as React from 'react';
import { GameSetupCard } from "./GameSetupCard";
import { Card, CardType } from "../model/Card";

export interface GameSetupCardListProps {
    toggleCardSelection(cardName: string): void;
    cards: Card[];
}

export class GameSetupCardList extends React.Component<GameSetupCardListProps, {}> {

    constructor(props: GameSetupCardListProps) {
        super(props);
    }

    render() {
        const characterCards: Card[] = [];
        const weaponCards: Card[] = [];
        const roomCards: Card[] = [];

        this.props.cards.forEach((card) => {
            switch (card.type) {
                case CardType.Character:  {
                    characterCards.push(card);
                    break;
                }
                case CardType.Weapon: {
                    weaponCards.push(card);
                    break;
                }
                default: {
                    roomCards.push(card);
                }
            };
        })

        return (
            <div>
                <div className="gameSetupCards">
                    {characterCards.map(card => <GameSetupCard card={card} onClick={this.onCardButtonClick} />)}
                </div>
                
                <div className="gameSetupCards">
                    {weaponCards.map(card => <GameSetupCard card={card} onClick={this.onCardButtonClick} />)}
                </div>
                
                <div className="gameSetupCards">
                    {roomCards.map(card => <GameSetupCard card={card} onClick={this.onCardButtonClick} />)}
                </div>
            </div>
        )
    }

    private onCardButtonClick = (card: Card): void => {
        this.props.toggleCardSelection(card.name);
    }
}