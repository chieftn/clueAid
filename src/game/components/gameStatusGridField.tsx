import * as React from 'react';
import { AssertionType } from '../../shared/model';
import { GameStatusEntry } from '../utils';
import './gameStatusGridField.css';

export interface GameStatusGridFieldProps {
    gameStatusEntry: GameStatusEntry;
    playerId: number;
}

export const GameStatusGridField: React.FC<GameStatusGridFieldProps> = ({gameStatusEntry, playerId}: GameStatusGridFieldProps) => {
    const { playerEntries } = gameStatusEntry;

    if (playerEntries[playerId] === undefined) {
        return <></>
    }

    if (playerEntries[playerId] === AssertionType.DoesNotHave) {
        return (
            <div className="field does-not-have-card">not in hand</div>
        );
    }

    return (
        <div className="field has-card">in hand</div>
    );
};
