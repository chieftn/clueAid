import * as React from "react";
import {Introduction} from "./Introduction";
import {GameSetup} from "./GameSetup";

import { Card } from "../model/Card";
import { Player } from "../model/Player";
import { Suspicion } from "../model/Suspicion";

enum views {
    introduction,
    gameSetup,
    gameStatus,
    suspicion
}

export interface GameProps { compiler: string; framework: string; }
export interface GameState { 
    view: views;
    cards: Card[];
    players: Player[];
    suspicions: Suspicion[];
}

export class Game extends React.Component<GameProps, GameState> {

    constructor(props: GameProps) {
        super(props);

        this.state = {
            view : views.introduction,
            cards: this.generateCardList(),
            players: this.generatePlayerList(),
            suspicions: []
        }
    }

    generatePlayerList(): Player[] {
        return [ { name: "Me", isUser: true, cards: []} ];
    }

    generateCardList(): Card[] {
        return [


        ];
    }

    switchToGameSetup() {
        this.setState({view: views.gameSetup});
    }

    switchToGameStatus() {
        this.setState({view: views.gameStatus});
    }

    addPlayer(name: string) {
           var players = this.state.players;
           let newPlayers = [...players, { name: name, isUser: false, cards: [] }]

           this.setState({ players: newPlayers});
    }

    render() {
        
        let view = null;
        switch (this.state.view) {
            case views.introduction: 
                view = <Introduction switchToGameSetup={this.switchToGameSetup.bind(this)}></Introduction>;
                break;
            case views.gameSetup: 
                view = <GameSetup 
                            addPlayer={this.addPlayer.bind(this)}            
                            switchToGameStatus={this.switchToGameStatus.bind(this)} 
                            players={this.state.players}>
                        </GameSetup>
                break;
            case views.suspicion: 
                view = <h2>hi</h2>;
                break;
        }

        return <div className="mainContainer">
                    <div className="mainHeader headerBar">
                        <div className="headerTitle">ClueAid</div>
                    </div>
                    <div className="mainContent">
                        {view}
                    </div>
                    <div className="mainFooter"></div>
               </div>;
    }
}