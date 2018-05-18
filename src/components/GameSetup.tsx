import * as React from "react";

import { Card } from "../model/Card"
import { Player } from "../model/Player"

import { Button } from "react-bootstrap";
import { FormControl } from "react-bootstrap";
import { ControlLabel } from "react-bootstrap";

export interface GameSetupProps {
    addPlayer(name: string): void;
    switchToGameStatus(): void;  
    players: Player[];
}

export class GameSetup extends React.Component<GameSetupProps, {}> {

    playerInput : HTMLInputElement;


    render() {
        
        const players = this.props.players.map((player) =>
            <li key={player.name}>{player.name}</li>
        );

        return <div>
                <div>
                    <h3>Who's Playing (and in what order)?</h3>
                    
                    <ul>{players}</ul>
                    
                    <div className="addPlayer">   
                    
                        <FormControl
                            type="text"
                            placeholder="Enter player name"
                            inputRef={ref => { this.playerInput = ref; }}
                        />

                        <Button onClick={ () => { 
                                this.props.addPlayer(this.playerInput.value);
                                this.playerInput.value = "";
                            }}>Add Player</Button>

                    </div>
                </div>
                
                <h3>What cards do you have?</h3>
                



                <Button onClick={this.props.switchToGameStatus}>I'm ready to play</Button>
            </div>
    }
}