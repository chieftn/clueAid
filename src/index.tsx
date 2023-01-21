import * as React from "react";
import { createRoot } from "react-dom/client";
import { initializeIcons } from '@fluentui/react';
import { App } from './app';
import './index.css';

initializeIcons();
const container = document.getElementById('reactTarget');
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(<App/>);