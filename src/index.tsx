import './styles/main.scss';
import * as React from "react";
import * as ReactDOM from "react-dom";
import {App} from "./components/App";
import {HashRouter} from "react-router-dom";
import { Provider } from 'react-redux';
import store from './redux/store';

ReactDOM.render(
    <Provider store={store}>
          <HashRouter>
            <App />
        </HashRouter>
    </Provider>,
    document.getElementById("example")
);