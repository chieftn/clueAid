import * as React from 'react';
import GameSetupContainer from '../gameSetup/gameSetupContainer';
import GameTrackerContainer from '../gameTracker/gameTrackerContainer';
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
                <Route path="/GameSetup" component={GameSetupContainer}/>
                <Route path="/GameTracker" component={GameTrackerContainer}/>
            </Switch>
        </div>
    }
}