import * as React from 'react';
import {Link} from "react-router-dom";

export interface NavigationProps {}
export class Navigation extends React.Component<NavigationProps, {}> {

    constructor(props: NavigationProps) {
        super(props);
    }

    render() {
        return <div className="mainNavigation navigationBar">
            <nav>
                <div className="navigationBarItem">
                    <Link to='/home' title="Home">
                        <span className="glyphicon glyphicon-home navigationIcon" aria-hidden="true"></span>
                    </Link>
                </div>
                <div>
                    <Link to='/gamesetup' title="Start Game">
                        <span className="glyphicon glyphicon-plus navigationIcon" aria-hidden="true"></span>
                    </Link>
                </div>
            </nav>
        </div>
    }
}