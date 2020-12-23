import * as React from 'react';
import { GameNotStartedWarning } from '../../shared/components/gameNotStartedWarning';

export const GameStatus: React.FC = () => {
    return (
        <>
            <GameNotStartedWarning />
        </>
    );
};
