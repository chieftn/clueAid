import * as React from 'react';

export interface HomeProps {}
export class Home extends React.Component<HomeProps, {}> {

    constructor(props: HomeProps) {
        super(props);
    }

    render() {
        return <div>Hello World</div>
    }
}