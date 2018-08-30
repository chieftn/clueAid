import './styles/main.scss';
import * as React from "react";
import * as ReactDOM from "react-dom";
import {App} from "./components/shared/App";
import {HashRouter} from "react-router-dom";
import { Provider } from 'react-redux';
import store from './redux/store';
import GameSetupContainer from './components/gameSetup/gameSetupContainer';

ReactDOM.render(
    <Provider store={store}>
        <GameSetupContainer/>
    </Provider>,
    document.getElementById("example")
);