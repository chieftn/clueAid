import * as React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { Banner } from './shared/components/banner';
import { Footer } from './shared/components/footer';
import { Home } from './shared/components/home';
import { GameCreate } from './gameCreate/components/gameCreate';
import { GameStatus } from './game/components/gameStatus';
import { GameSuspicionCreate } from './gameSuspicion/components/gameSuspicionCreate';
import { PATHS } from './shared/constants';
import { useGameState } from './game/hooks/useGameState';
import { GameStateContext } from './game/context';
import { BannerContext, useBanner } from './shared/hooks/useBanner';
import './app.css';

export const App: React.FC = () => {
    const [state, dispatch] = useGameState();
    const banner = useBanner();

    return (
        <BannerContext.Provider value={banner}>
            <div className='app'>
                <div><Banner/></div>
                <main>
                    <GameStateContext.Provider value={[state,dispatch]}>
                        <BrowserRouter>
                            <Views/>
                        </BrowserRouter>
                    </GameStateContext.Provider>
                </main>
                <footer><Footer/></footer>
            </div>
        </BannerContext.Provider>
    );
}

const Views = () => {
    const location = useLocation()
    return (
        <TransitionGroup>
            <CSSTransition key={location.key} classNames="myfade" timeout={300}>
                <Routes location={location}>
                    <Route path={PATHS.CREATE} element={<GameCreate/>} />
                    <Route path={PATHS.STATUS} element={<GameStatus/>} />
                    <Route path={PATHS.SUSPICION} element={<GameSuspicionCreate/>} />
                    <Route path={PATHS.HOME} element={<Home/>}/>
                </Routes>
            </CSSTransition>
        </TransitionGroup>
    );
};