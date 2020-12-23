import * as React from 'react';
import { Text, PrimaryButton } from '@fluentui/react';
import { GameInProgressWarning } from '../../shared/components/gameInProgressWarning';
import { useGameCreateState } from '../hooks/useGameCreateState';
import { GameCreateStateContext } from '../context';
import { CardSelection } from './cardToggles';
import { NameEntries } from './nameEntries';
import './gameCreate.scss';

export const GameCreate: React.FC = () => {
    const [state, dispatch] = useGameCreateState();

    const onSubmitClick = () => {
        throw new Error('not implemented');
    };

    return (
        <>
            <GameInProgressWarning/>
            <GameCreateStateContext.Provider value={[state,dispatch]}>
                <div className="content">
                    <h2>
                        <Text block={true} variant={'large'}>Start a game</Text>
                    </h2>
                    <div>
                        <div>
                            <NameEntries/>
                            <CardSelection/>
                        </div>
                        <div>
                            <PrimaryButton text="Ready to go!" onClick={onSubmitClick} />
                        </div>
                    </div>
                </div>
            </GameCreateStateContext.Provider>
        </>
    );
};