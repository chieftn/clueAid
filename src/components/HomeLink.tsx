import * as React from 'react';

export interface HomeLinkProps {}
export class HomeLink extends React.Component<HomeLinkProps,{}> {

    constructor(props: HomeLinkProps) {
        super(props);
    }

    render() {
        let strokeStyle = { 
            fill:"white",
            stroke:"white",
        };

        return <svg className="umbrella" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" aria-labelledby="title">
        <title id="title">Home Icon</title>
        <g id="layer1">
        <path
            transform="matrix(0.04585126,0,0,0.020113,5.5334734,55.90206)"
            d="m 164.62752,126.6161 -51.31971,0.14731 -51.319711,0.1473 25.532283,-44.517823 25.532288,-44.51783 25.78742,44.37052 z"
            id="path12"
            style={strokeStyle} />
        <path
            id="rect10-3"
            d="m 8.8330731,56.98675 h 0.3640625 v 0.525569 l -0.3438532,0.267324 z"
            style={strokeStyle} />
        <rect
        y="58.454613"
            x="8.6081238"
            height="2.3927293"
            width="4.2782936"
            id="rect10"
            style={strokeStyle} />
        <rect
            y="63.005527"
            x="28.063299"
            height="16.036171"
            width="21.515198"
            id="rect4565"
            style={strokeStyle} />
        <rect
            ry="0.039552268"
            rx="0.13195884"
            y="140.24643"
            x="80.314484"
            height="7.082643"
            width="17.105249"
            id="rect4589"
            style={strokeStyle} />
        <rect
            ry="0.021960724"
            rx="0.021960724"
            y="58.873482"
            x="10.14803"
            height="1.64344"
            width="1.4086629"
            id="rect4593"
            style={strokeStyle} />
        </g>
          </svg>
     }
  }