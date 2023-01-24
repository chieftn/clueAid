import * as React from 'react';
import { PrimaryButton, Stack } from '@fluentui/react';
import { useNavigate } from 'react-router-dom';
import { GameNotStartedWarning } from '../../shared/components/gameNotStartedWarning';
import { useGameStateContext } from '../hooks/useGameStateContext';
import { PageTitle } from '../../shared/components/pageTitle';
import { GameStatusGrid } from './gameStatusGrid';
import { GameError } from './gameError';
// import { undoSuspicionAction } from '../actions';
import { PATHS } from '../../shared/constants';
import './gameStatus.css';

export const GameStatus: React.FC = () => {
    const navigate = useNavigate();
    const [{ game }] = useGameStateContext();

    const onAddSuspicionClick = () => {
        navigate(PATHS.SUSPICION);
    };

    // const onUndo = () => {
    //     gameDispatch(undoSuspicionAction);
    // }

    return (
        <>
            <GameNotStartedWarning />
            <div className="content">
                <PageTitle title="Game Status" />
                {game &&
                    <Stack tokens={{childrenGap: 5}}>
                        <div>
                            <PrimaryButton
                                ariaLabel="Add suspicion"
                                text="Add suspicion"
                                onClick={onAddSuspicionClick}
                            />
                               {/* <PrimaryButton
                                ariaLabel="Undo"
                                text="Undo"
                                onClick={onUndo}
                            /> */}
                        </div>
                        <GameError/>
                        <GameStatusGrid game={game} />
                    </Stack>
                }
            </div>
        </>
    );
};
