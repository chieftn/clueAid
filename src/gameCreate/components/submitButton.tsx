import * as React from 'react';
import { PrimaryButton } from '@fluentui/react';
import { useNavigate } from 'react-router-dom';
import { useGameCreateStateContext } from '../hooks/useGameCreateStateContext';
import { validateFormAction } from '../actions';
import { useGameStateContext } from '../../game/hooks/useGameStateContext';
import { initializeGameAction } from '../../game/actions';
import { PATHS } from '../../shared/constants';
import { GameCreateMode } from '../state';
import { getGame } from '../utils';

export const SubmitButton: React.FC = () => {
    const navigate = useNavigate();
    const [{gameCreateMode, players, userCards}, gameCreateDispatch ] = useGameCreateStateContext();
    const [,gameDispatch] = useGameStateContext();

    React.useEffect(() => {
        if (gameCreateMode === GameCreateMode.submitReady) {
            const game = getGame(players, userCards);
            gameDispatch(initializeGameAction(game));

            navigate(PATHS.STATUS);
        }
    }, [gameCreateMode])

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