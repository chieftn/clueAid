import * as React from 'react';
import { Button, ButtonToolbar } from "react-bootstrap";
import { FormControl } from "react-bootstrap";
import { FormGroup } from "react-bootstrap";
import { InputGroup } from "react-bootstrap";
import { Glyphicon } from "react-bootstrap";
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

    private generateNameField(index: number, player: Player, playerCount: number): JSX.Element {

        return (
            <FormGroup controlId={"nameLabel" + index} key={index} validationState={this.props.invalidPlayers.indexOf(player) >= 0 ? "error": null}>
                <InputGroup>
                    <FormControl
                        type="text"
                        placeholder="enter name"
                        value={player.name}
                        disabled={player.isUser}
                        onChange={(e: any)=> this.props.changePlayer(
                            index, {
                                name: e.target.value, 
                                isUser: player.isUser}
                            )}
                    />
                   
                    <Button componentClass={InputGroup.Button} disabled={index == 0} onClick={()=>this.props.movePlayerUp(index)}>
                        <Glyphicon glyph="chevron-up" />
                    </Button>
                    <Button componentClass={InputGroup.Button} disabled={index == playerCount} onClick={()=>this.props.movePlayerDown(index)}>
                        <Glyphicon glyph="chevron-down" />
                    </Button>
                    <Button componentClass={InputGroup.Button} disabled={player.isUser} onClick={()=>this.props.removePlayer(index)} bsStyle="danger">
                        <Glyphicon glyph="remove" />
                    </Button>
                    
                </InputGroup>
            </FormGroup>
        );
    }

    render() {

        const playerFields = this.props.players.map((player, index, array) => this.generateNameField(index, player, array.length -1))
        return <div>
            <div>{playerFields}</div>
            <Button 
                onClick={()=>this.props.addPlayer()} 
                disabled={this.props.players.length > 5}>AddPlayer</Button>
        </div>
        
    }
}
