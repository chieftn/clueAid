import * as React from 'react';
import { useHistory } from 'react-router-dom';
import { MessageBar, MessageBarType, Text, MessageBarButton } from '@fluentui/react'
import { useGameStateContext } from '../../game/hooks/useGameStateContext';
import { PATHS } from '../constants';

export const GameInProgressWarning: React.FC = () => {
    const { push } = useHistory();
    const [ {game} ] = useGameStateContext();

    const onInProgressGameClick = () => {
        push(PATHS.STATUS);
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
