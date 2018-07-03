import * as React from 'react';

export interface HomeProps {}
export class Home extends React.Component<HomeProps, {}> {

    constructor(props: HomeProps) {
        super(props);
    }

    render() {
        return <div>Hello World
<button type="button" className="btn btn-default">
  <span className="glyphicon glyphicon-star" aria-hidden="true"></span>
</button>

        </div>
    }
}