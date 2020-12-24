import * as React from 'react';
import { Text, Overlay } from '@fluentui/react';
import { GameInProgressWarning } from '../../shared/components/gameInProgressWarning';
import { useGameCreateState } from '../hooks/useGameCreateState';
import { GameCreateStateContext } from '../context';
import { GameCreateMode } from '../state';
import { CardSelection } from './cardToggles';
import { NameEntries } from './nameEntries';
import { SubmitStatus } from './submitStatus';
import { SubmitButton } from './submitButton';
import './gameCreate.scss';

export const GameCreate: React.FC = () => {
    const [state, dispatch] = useGameCreateState();
    const { gameCreateMode } = state;

   return (
        <>
            <GameInProgressWarning/>
            <GameCreateStateContext.Provider value={[state,dispatch]}>
                <div className="content">
                    <h2>
                        <Text block={true} variant={'large'}>Start a game</Text>
                    </h2>
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