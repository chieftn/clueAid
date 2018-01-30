import * as React from "react";

export interface IntroductionProps {
    switchToGameSetup(): void;  
}

export class Introduction extends React.Component<IntroductionProps, {}> {
    render() {
        
        return <div>
                <h2>Welcome to ClueAid!</h2>
                <div>ClueAid is a companion app for the popular boardgame. It helps you track suspicions to arrive at the answer first.</div>
                <div><button onClick={this.props.switchToGameSetup}>Let's Get Started</button></div>
            </div>
    }
}