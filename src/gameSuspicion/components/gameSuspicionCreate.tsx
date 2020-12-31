import * as React from 'react';
// import { PrimaryButton, DefaultButton } from '@fluentui/react';
// import { useHistory, Prompt } from 'react-router-dom';
import { useGameStateContext } from '../../game/hooks/useGameStateContext';
import { useGameSuspicionCreateState } from '../hooks/useGameSuspicionCreateState';
import { GameSuspicionCreateMode } from '../state';
import { initializeAction } from '../actions';
import { GameNotStartedWarning } from '../../shared/components/gameNotStartedWarning';
import { PageTitle } from '../../shared/components/pageTitle';
import { AlibiCard } from './alibiCard';
import { AlibiFrom } from './alibiFrom';
import { SuspectedCharacter} from './suspectedCharacter';
import { SuspectedRoom } from './suspectedRoom';
import { SuspectedWeapon } from './suspectedWeapon';
import { SuspectingPlayer } from './suspectingPlayer';
import { Commands } from './commands';
import { GameSuspicionCreateStateContext } from '../context';
import './gameSuspicionCreate.scss';

export const GameSuspicionCreate: React.FC = () => {
    const [{ game }] = useGameStateContext();
    const [state, dispatch ] = useGameSuspicionCreateState();
    const { mode } = state;

    React.useEffect(() => {
        if (game && mode === GameSuspicionCreateMode.uninitialized) {
            dispatch(initializeAction(game));
        }
    }, [game, mode])

    if (!game) {
        return <GameNotStartedWarning />;
    }

    return (
        <div className="content form">
            <PageTitle title="Add Suspicion" />
            {game &&
                <GameSuspicionCreateStateContext.Provider value={[state, dispatch]}>
                    <SuspectingPlayer/>
                    <SuspectedCharacter/>
                    <SuspectedWeapon/>
                    <SuspectedRoom/>
                    <AlibiFrom/>
                    <AlibiCard/>
                    <Commands/>
                </GameSuspicionCreateStateContext.Provider>
            }
        </div>
    );
};