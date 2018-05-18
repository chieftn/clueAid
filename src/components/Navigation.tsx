import * as React from 'react'

export interface NavigationProps {}
export class Navigation extends React.Component<NavigationProps, {}> {

    constructor(props: NavigationProps) {
        super(props);
    }

    render() {
        return <nav className="mainNavigation navigationBar"></nav>
    }
}