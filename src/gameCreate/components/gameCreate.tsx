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
import { usePageTitle } from '../../shared/hooks/useBanner';
import './gameCreate.css';

export const GameCreate: React.FC = () => {
    const [state, dispatch] = useGameCreateState();
    const { gameCreateMode } = state;
    usePageTitle('New game');

    return (
        <div>
            <GameInProgressWarning/>
            <GameCreateStateContext.Provider value={[state,dispatch]}>
                <div className="content">
                    <NameEntries/>
                    <CardSelection/>
                    <SubmitStatus/>
                    <SubmitButton/>
                    {gameCreateMode !== GameCreateMode.idle && <Overlay/>}
                </div>
            </GameCreateStateContext.Provider>
        </div>
    );
};