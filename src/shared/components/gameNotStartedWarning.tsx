import * as React from 'react';
import { useHistory } from 'react-router-dom';
import { MessageBar, MessageBarType, Text, MessageBarButton } from '@fluentui/react'
import { useGameStateContext } from '../../game/hooks/useGameStateContext';
import { PATHS } from '../constants';

export const GameNotStartedWarning: React.FC = () => {
    const { push } = useHistory();
    const [ {game} ] = useGameStateContext();

    const onStartGameClick = () => {
        push(PATHS.CREATE);
    };

    if (!game) {
        return (
            <MessageBar
                isMultiline={false}
                messageBarType={MessageBarType.warning}
                actions={
                    <MessageBarButton
                        text="Start a game"
                        ariaDescription="Click to start a new game."
                        onClick={onStartGameClick}
                    />
                }
            >
                <Text>You have not yet started a game.</Text>
            </MessageBar>
        );
    }

    return <></>
};
