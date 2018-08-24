import * as React from 'react';

export interface GameTrackerProps {}
export class GameTracker extends React.Component<GameTrackerProps, {}> {

    constructor(props: GameTrackerProps) {
        super(props);
    }

    render() {
        return <div>Hello Tracker</div>;

    }
}