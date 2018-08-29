import * as React from 'react';
import  store from '../../redux/store';

export interface GameTrackerProps {}
export class GameTracker extends React.Component<GameTrackerProps, {}> {

    constructor(props: GameTrackerProps) {
        super(props);
        
    }

    render() {
        return <div>Hello Tracker</div>;

    }
}