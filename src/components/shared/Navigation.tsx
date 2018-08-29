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
            </nav>
        </div>
    }
}