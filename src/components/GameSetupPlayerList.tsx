import * as React from 'react';
import { Button } from "react-bootstrap";
import { GameSetupPlayer } from './GameSetupPlayer';
import { Player } from "../model/Player";

export interface GameSetupPlayerListProps {
    players: Player[];
    invalidPlayers: Player[];
    addPlayer(): void;
    changePlayer(index: number, player: Player): void;
    removePlayer(playerIndex: number): void;
    movePlayerUp(playerIndex: number): void;
    movePlayerDown(playerIndex: number): void;
}

export class GameSetupPlayerList extends React.Component<GameSetupPlayerListProps, {}> {

    constructor(props: GameSetupPlayerListProps) {
        super(props);
    }

    render() {
        return <div>
            <div>
                {this.props.players.map((player, index) => {
                    return <GameSetupPlayer 
                       index={index} 
                       player={player}
                       playerCount={this.props.players.length}
                       invalidPlayers={this.props.invalidPlayers}
                       changePlayer={this.props.changePlayer}
                       removePlayer={this.props.removePlayer}
                       movePlayerUp={this.props.movePlayerUp}
                       movePlayerDown={this.props.movePlayerDown}
                />})}
            </div>
            <Button 
                onClick={this.addPlayer} 
                disabled={this.props.players.length > 5}>AddPlayer</Button>
        </div>
    }

    private addPlayer = () => {
        this.props.addPlayer();
    }
}
