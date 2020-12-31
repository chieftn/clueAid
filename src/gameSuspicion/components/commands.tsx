import * as React from 'react';
import { PrimaryButton, DefaultButton } from '@fluentui/react';
import { useHistory } from 'react-router-dom';
import { useGameSuspicionCreateStateContext } from '../hooks/useGameSuspicionCreateStateContext';
import { validateFormAction } from '../actions';
import { GameSuspicionCreateMode } from '../state';

export const Commands: React.FC = () => {
    const history = useHistory();
    const [ state, dispatch ] = useGameSuspicionCreateStateContext();

    const onSubmitClick = () => {
        dispatch(validateFormAction.started);
    };

    const onCancelClick = () => {
        history.goBack();
    }

    return (
        <div className='commands'>
            <PrimaryButton
                className="command"
                text="Ok"
                ariaLabel="Submit suspicion"
                onClick={onSubmitClick}
                disabled={state.mode !== GameSuspicionCreateMode.idle}
            />
            <DefaultButton
                className="command"
                text="Cancel"
                ariaLabel="Cancel this suspicion"
                onClick={onCancelClick}
            />
        </div>
    );
};
