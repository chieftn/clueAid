import * as React from 'react';
import {Footer} from "./Footer";
import {Header} from "./Header";
import {Main} from "./Main";
import {Navigation} from "./Navigation";

export interface AppProps {}
export class App extends React.Component<AppProps, {}> {

    constructor(props: AppProps) {
        super(props);
    }

    render() {
        return <div className="mainContainer">
            <Header/>
            <Navigation />
            <Main/>
            <Footer/>
        </div>
    }
}