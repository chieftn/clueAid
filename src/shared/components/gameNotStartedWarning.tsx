import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { MessageBar, MessageBarType, Text, MessageBarButton } from '@fluentui/react'
import { useGameStateContext } from '../../game/hooks/useGameStateContext';
import { PATHS } from '../constants';

export const GameNotStartedWarning: React.FC = () => {
    const navigate = useNavigate();
    const [ {game} ] = useGameStateContext();

    const onStartGameClick = () => {
        navigate(PATHS.CREATE);
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
