import * as React from "react";
import { Button } from "react-bootstrap";


export interface IntroductionProps {
    switchToGameSetup(): void;  
}

export class Introduction extends React.Component<IntroductionProps, {}> {
    render() {
        
        return <div>
                <h2>Welcome to ClueAid!</h2>
                <div>ClueAid is a companion app for the popular boardgame. It helps you track suspicions to arrive at the answer first.</div>
                <div className="startButton">
                    <Button onClick={this.props.switchToGameSetup}>Let's Get Started</Button>
                </div>
            </div>
    }
}