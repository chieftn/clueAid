import * as React from "react";

export interface GameSetupProps {
    switchToGameStatus(): void;  
}

export class GameSetup extends React.Component<GameSetupProps, {}> {
    render() {
        
        return <div>
                <h2>Who's Playing (and in what order)?</h2>
                
                
                <h2>What cards do you have?</h2>
                
                <button onClick={this.props.switchToGameStatus}>I'm ready to play</button>
            </div>
    }
}