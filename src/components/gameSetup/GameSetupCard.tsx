import * as React from 'react';
import { Button } from "react-bootstrap";

export interface GameSetupCardProps {
    card: string;
    selected: boolean;
    onClick: (card: string) => void;
}

export class GameSetupCard extends React.Component<GameSetupCardProps, {}> {

    render() {
        return <Button 
            className='gameSetupCard'
            key={this.props.card}
            bsStyle={this.props.selected ? 'info' : 'default'}
            onClick={this.onClickHandler}>
            {this.props.card}
        </Button>
    }

    private onClickHandler = (event: any): void => {
        this.props.onClick(this.props.card);
    }
}
