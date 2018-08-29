import * as React from 'react';
import { Button } from "react-bootstrap";
import { Card } from "../../model/card";

export interface GameSetupCardProps {
    card: Card;
    onClick: (card: Card) => void;
}

export class GameSetupCard extends React.Component<GameSetupCardProps, {}> {

    render() {
        return <Button 
            className="gameSetupCard"
            key={this.props.card.name}
            bsStyle={this.props.card.owner === null ? "default" : "info"}
            onClick={this.onClickHandler}>
            {this.props.card.name}
        </Button>
    }

    private onClickHandler = (event: any): void => {
        this.props.onClick(this.props.card);
    }
}
