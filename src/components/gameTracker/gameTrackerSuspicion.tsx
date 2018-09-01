import * as React from 'react';
import { Player } from '../../model/player';
import { Deck } from '../../model/deck';
import { Suspicion } from '../../model/suspicion';

export interface GameTrackerSuspicionProps {
    deck: Deck;
    players: Player[];
    addSuspicion: (suspicion: Suspicion) => void;
}

export class GameTrackerSuspicion extends React.Component<GameTrackerSuspicionProps, {}> {
    constructor(props: GameTrackerSuspicionProps) {
        super(props);
    }

    render(): JSX.Element {
        return (<div>Hello Suspicion</div>)
    }
}