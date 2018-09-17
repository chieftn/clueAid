import * as React from 'react';
import { Suspicion } from '../../model/suspicion';

export interface GameTrackerSuspicionSummaryProps {
    suspicion: Suspicion
}

export class GameTrackerSuspicionSummary extends React.Component<GameTrackerSuspicionSummaryProps, {}> {

    constructor(props: GameTrackerSuspicionSummaryProps) {
        super(props);

        this.state = {
            showSuspicionDialog: false
        };
    }
    
    render(): JSX.Element {
        return <div>Hello Suspicion</div>
    }
}