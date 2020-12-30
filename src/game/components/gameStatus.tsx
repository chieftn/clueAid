import * as React from 'react';
import { PrimaryButton } from '@fluentui/react';

import { GameNotStartedWarning } from '../../shared/components/gameNotStartedWarning';
import { useGameStateContext } from '../hooks/useGameStateContext';
import { PageTitle } from '../../shared/components/pageTitle';
import { GameStatusGrid } from './gameStatusGrid';
import './gameStatus.scss';

export const GameStatus: React.FC = () => {
    const [{ game }] = useGameStateContext();

    return (
        <>
            <GameNotStartedWarning />
            <div className="content">
                <PageTitle title="Game Status" />
                {game &&
                    <>
                        <PrimaryButton
                            text="Add suspicion"
                        />
                        <GameStatusGrid game={game} />
                    </>
                }
            </div>
        </>
    );
};
