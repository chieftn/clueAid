import * as React from "react";
import * as ReactDOM from "react-dom";
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Banner } from './shared/components/banner';
import { Home } from './shared/components/home';
import { GameCreate } from './gameCreate/components/gameCreate';
import './index.css';

export const App: React.FC = () => {
    return (
        <BrowserRouter>
            <div className="main-container">
                <Banner/>
                <Switch>
                    <Route path="/game" component={GameCreate} />
                    <Route path="/" component={Home} />
                </Switch>
            </div>
        </BrowserRouter>
    );
}

ReactDOM.render(<App />, document.getElementById("reactTarget"));
