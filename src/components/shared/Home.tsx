import * as React from 'react';
import {Link} from "react-router-dom";

export interface HomeProps {}
export class Home extends React.Component<HomeProps, {}> {

    constructor(props: HomeProps) {
        super(props);
    }

    render() {
        return <div>
            <div className="homeTitleBar">
                <div className="homeTitle">ClueAid</div>
                <div className="homeSubTitle">A boardgame companion app</div>
            </div>
            <div className="homeContent">
                <div className="homeContentSection">
                    <div className="homeContentHeader">What is it?</div>
                    <div>ClueAid is a companion app for the popular board game. Use it to track the game's suspicions and arrive at the solution faster.</div>
                </div>
                <div className="homeContentSection">
                    <div className="homeContentHeader">Want to try?</div>
                    <div>
                        <div>Step 1: Get some friends and setup the game.</div>
                        <div>Step 2: <Link to='/gamesetup' title="Start Game">Click here!</Link></div>
                    </div>
                </div>
            </div>
        </div>
    }
}