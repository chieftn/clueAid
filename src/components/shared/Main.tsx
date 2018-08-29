import * as React from 'react';
import { GameSetup } from '../gameSetup/GameSetup';
import { GameTracker } from "../gameTracker/gameTracker";
import { Home } from './Home';
import { Switch, Route } from 'react-router-dom'

export interface MainProps {}
export class Main extends React.Component<MainProps, {}> {

    constructor(props: MainProps) {
        super(props);
    }

    render() {
        return <div className="mainContent">
            <Switch>
                <Route exact path='/' component={Home}/>
                <Route path="/Home" component={Home}/>
                <Route path="/GameSetup" component={GameSetup}/>
                <Route path="/GameTracker" component={GameTracker}/>
            </Switch>
        </div>
    }
}