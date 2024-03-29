import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { MessageBar, MessageBarType, Text, MessageBarButton } from '@fluentui/react'
import { useGameStateContext } from '../../game/hooks/useGameStateContext';
import { PATHS } from '../constants';

export const GameInProgressWarning: React.FC = () => {
    const navigate = useNavigate();
    const [ {game} ] = useGameStateContext();

    const onInProgressGameClick = () => {
        navigate(PATHS.STATUS);
    };

    if (game) {
        return (
            <MessageBar
                isMultiline={false}
                messageBarType={MessageBarType.warning}
                actions={
                    <MessageBarButton
                        text="View game in progress"
                        ariaDescription="Click to view in-progress game."
                        onClick={onInProgressGameClick}
                    />
                }
            >
                <Text>You have a game in progress. Changes here will overwrite that game.</Text>
            </MessageBar>
        );
    }

    return <></>
};
