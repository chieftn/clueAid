import * as React from 'react';
import { MessageBar, MessageBarType } from '@fluentui/react';
import { useGameStateContext } from '../hooks/useGameStateContext';

export const GameError: React.FC = () => {
    const [{ error }] = useGameStateContext();

    if (error) {
        return (
            <MessageBar messageBarType={MessageBarType.error}>
                <div>Something did not add up with the last suspicion details:<span style={{marginLeft: 5}}>{error}</span></div>
                <div>Please re-enter your suspicion.</div>
            </MessageBar>
        );
    }

    return (<></>);
};
