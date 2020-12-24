import * as React from 'react';
import { Text } from '@fluentui/react';
import { GameInProgressWarning } from '../../shared/components/gameInProgressWarning';
import { useGameCreateState } from '../hooks/useGameCreateState';
import { GameCreateStateContext } from '../context';
import { CardSelection } from './cardToggles';
import { NameEntries } from './nameEntries';
import { Submit } from './submit';
import './gameCreate.scss';

export const GameCreate: React.FC = () => {
    const [state, dispatch] = useGameCreateState();

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
                    <Submit/>
                </div>
            </GameCreateStateContext.Provider>
        </>
    );
};