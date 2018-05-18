import * as React from 'react'

export interface FooterProps {}
export class Footer extends React.Component<FooterProps, {}> {

    constructor(props: FooterProps) {
        super(props);
    }

    render() {
        return <div className="mainFooter footerBar">
            <div className="footerContent"></div>
        </div>;
    }
}