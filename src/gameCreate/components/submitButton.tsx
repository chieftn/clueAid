import * as React from 'react';
import { PrimaryButton } from '@fluentui/react';
import { useGameCreateStateContext } from '../hooks/useGameCreateStateContext';
import { validateFormAction } from '../actions';
// import { useGameStateContext } from '../../game/hooks/useGameStateContext';
import { GameCreateMode } from '../state';

export const SubmitButton: React.FC = () => {
    const [{gameCreateMode}, gameCreateDispatch ] = useGameCreateStateContext();
    // const [gameState, gameDispatch] = useGameStateContext();

    const onSubmitClick = () => {
        gameCreateDispatch(validateFormAction.started);
    };

    return (
        <PrimaryButton
            style={{marginTop: 10}}
            text="Ready to go!"
            onClick={onSubmitClick}
            disabled={gameCreateMode !== GameCreateMode.idle}
        />
    );
}