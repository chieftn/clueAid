import * as React from 'react';
import { PrimaryButton } from '@fluentui/react';
import { useHistory } from 'react-router-dom';
import { GameNotStartedWarning } from '../../shared/components/gameNotStartedWarning';
import { useGameStateContext } from '../hooks/useGameStateContext';
import { PageTitle } from '../../shared/components/pageTitle';
import { GameStatusGrid } from './gameStatusGrid';
import { PATHS } from '../../shared/constants';
import './gameStatus.scss';

export const GameStatus: React.FC = () => {
    const { push } = useHistory();
    const [{ game }] = useGameStateContext();

    const onAddSuspicionClick = () => {
        push(PATHS.SUSPICION);
    };

    return (
        <>
            <GameNotStartedWarning />
            <div className="content">
                <PageTitle title="Game Status" />
                {game &&
                    <>
                        <PrimaryButton
                            ariaLabel="Add suspicion"
                            text="Add suspicion"
                            onClick={onAddSuspicionClick}
                        />
                        <GameStatusGrid game={game} />
                    </>
                }
            </div>
        </>
    );
};
