import * as React from "react";
import * as ReactDOM from "react-dom";
import { initializeIcons } from '@uifabric/icons';
import { App } from './app';
import './index.scss';

initializeIcons();
ReactDOM.render(<App />, document.getElementById("reactTarget"));
