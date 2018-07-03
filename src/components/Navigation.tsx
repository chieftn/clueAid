import * as React from 'react';
import {Link} from "react-router-dom";
import {HomeLink} from "./HomeLink";

export interface NavigationProps {}
export class Navigation extends React.Component<NavigationProps, {}> {

    constructor(props: NavigationProps) {
        super(props);
    }

    render() {
        return <div className="mainNavigation navigationBar">
        <button type="button" className="btn btn-default">
  <span className="glyphicon glyphicon-star" aria-hidden="true"></span>
</button>
            <nav>
                
                
                <div>
                    <Link to='/gamesetup'>
 
                        New Game
                    </Link>
                </div>
            </nav>
        </div>
    }
}