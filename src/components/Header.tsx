import * as React from 'react'

export interface HeaderProps {}
export class Header extends React.Component<HeaderProps, {}> {

    constructor(props: HeaderProps) {
        super(props);
    }

    render() {
        return <header className="mainHeader headerBar">
            <div className="headerTitle">ClueAid</div>
        </header>;
    }
}