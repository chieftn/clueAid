import * as React from 'react';
import { Fabric } from '@fluentui/react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Banner } from './shared/components/banner';
import { Footer } from './shared/components/footer';
import { Home } from './shared/components/home';
import { GameCreate } from './gameCreate/components/gameCreate';
import { GameStatus } from './gameStatus/components/gameStatus';
import { PATHS } from './shared/constants';
import { useGameState } from './game/hooks/useGameState';
import { GameStateContext } from './game/context';
import './app.scss';

export const App: React.FC = () => {
    const [state, dispatch] = useGameState();

    return (
        <BrowserRouter>
            <Fabric>
                <div className='app'>
                    <div><Banner/></div>
                    <div>
                        <GameStateContext.Provider value={[state,dispatch]}>
                            <Switch>
                                <Route path={PATHS.CREATE} component={GameCreate} />
                                <Route path={PATHS.STATUS} component={GameStatus} />
                                <Route path={PATHS.HOME} component={Home} />
                            </Switch>
                        </GameStateContext.Provider>
                    </div>
                    <div><Footer/></div>
                </div>
            </Fabric>
        </BrowserRouter>
    );
}