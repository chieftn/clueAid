import * as React from 'react';
import { PrimaryButton, DefaultButton } from '@fluentui/react';
import { useNavigate } from 'react-router-dom';
import { useGameSuspicionCreateStateContext } from '../hooks/useGameSuspicionCreateStateContext';
import { useGameStateContext } from '../../game/hooks/useGameStateContext';
import { addSuspicionAction } from '../../game/actions';
import { validateFormAction } from '../actions';
import { GameSuspicionCreateMode } from '../state';

export const Commands: React.FC = () => {
    const navigate = useNavigate();
    const [ state, dispatch ] = useGameSuspicionCreateStateContext();
    const [, gameDispatch] = useGameStateContext();
    const { mode } = state;

    React.useEffect(() => {
        if (mode === GameSuspicionCreateMode.submitReady) {
            gameDispatch(addSuspicionAction({
                alibi: state.alibiFrom && {
                    card: state.alibiCard,
                    from: state.alibiFrom
                },
                suspectingPlayer: state.suspectingPlayer,
                suspectedCharacter: state.suspectedCharacter,
                suspectedWeapon: state.suspectedWeapon,
                suspectedRoom: state.suspectedRoom
            }));

            navigate(-1);
        }
    }, [mode])

    const onSubmitClick = () => {
        dispatch(validateFormAction.started);
    };

    const onCancelClick = () => {
        navigate(-1);
    }

    return (
        <div className='commands'>
            <PrimaryButton
                className="command"
                text="OK"
                ariaLabel="Submit suspicion"
                onClick={onSubmitClick}
                disabled={state.mode !== GameSuspicionCreateMode.idle}
            />
            <DefaultButton
                className="command"
                text="Cancel"
                ariaLabel="Cancel this suspicion"
                onClick={onCancelClick}
                disabled={state.mode !== GameSuspicionCreateMode.idle}
            />
        </div>
    );
};
