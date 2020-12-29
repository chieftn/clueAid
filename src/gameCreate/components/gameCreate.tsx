import * as React from 'react';
import { Overlay } from '@fluentui/react';
import { GameInProgressWarning } from '../../shared/components/gameInProgressWarning';
import { useGameCreateState } from '../hooks/useGameCreateState';
import { GameCreateStateContext } from '../context';
import { GameCreateMode } from '../state';
import { CardSelection } from './cardToggles';
import { NameEntries } from './nameEntries';
import { SubmitStatus } from './submitStatus';
import { SubmitButton } from './submitButton';
import { PageTitle } from '../../shared/components/pageTitle';
import './gameCreate.scss';

export const GameCreate: React.FC = () => {
    const [state, dispatch] = useGameCreateState();
    const { gameCreateMode } = state;

   return (
        <>
            <GameInProgressWarning/>
            <GameCreateStateContext.Provider value={[state,dispatch]}>
                <div className="content">
                    <PageTitle title="Start a game"/>
                    <NameEntries/>
                    <CardSelection/>
                    <SubmitStatus/>
                    <SubmitButton/>
                    {gameCreateMode !== GameCreateMode.idle && <Overlay/>}
                </div>
            </GameCreateStateContext.Provider>
        </>
    );
};