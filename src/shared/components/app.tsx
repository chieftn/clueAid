import * as React from 'react';
import { Fabric } from '@fluentui/react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Banner } from './banner';
import { Footer } from './footer';
import { Home } from './home';
import { GameCreate } from '../../gameCreate/components/gameCreate';
import { PATHS } from '../../game/constants';
import './app.scss';

export const App: React.FC = () => {
    return (
        <BrowserRouter>
            <Fabric>
                <div className='app'>
                    <div><Banner/></div>
                    <div>
                        <Switch>
                            <Route path={PATHS.CREATE} component={GameCreate} />
                            <Route path={PATHS.HOME} component={Home} />
                        </Switch>
                    </div>
                    <div><Footer/></div>
                </div>
            </Fabric>
        </BrowserRouter>
    );
}