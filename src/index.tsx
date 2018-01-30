import './styles/main.scss';

import * as React from "react";
import * as ReactDOM from "react-dom";

import { Game } from "./components/Game";

ReactDOM.render(
    <Game compiler="TypeScript" framework="React" />,
    document.getElementById("example")
);