import * as React from 'react'

export interface MainProps {}
export class Main extends React.Component<MainProps, {}> {

    constructor(props: MainProps) {
        super(props);
    }

    render() {
        return <div className="mainContent">Hello World</div>
    }
}