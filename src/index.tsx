import * as React from "react";
import * as ReactDOM from "react-dom";
import { Fabric } from '@fluentui/react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Banner } from './shared/components/banner';
import { Footer } from './shared/components/footer';
import { Home } from './shared/components/home';
import { GameCreate } from './gameCreate/components/gameCreate';
import './index.scss';

export const App: React.FC = () => {
    return (
        <BrowserRouter>
            <Fabric>
                <div className='app'>
                    <div><Banner/></div>
                    <div>
                        <Switch>
                            <Route path="/game" component={GameCreate} />
                            <Route path="/" component={Home} />
                        </Switch>
                    </div>
                    <div><Footer/></div>
                </div>
            </Fabric>
        </BrowserRouter>

    );
}

ReactDOM.render(<App />, document.getElementById("reactTarget"));
