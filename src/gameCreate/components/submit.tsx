import * as React from 'react';
import { PrimaryButton } from '@fluentui/react';
import { useGameCreateStateContext } from '../hooks/useGameCreateStateContext';
import { validateFormAction } from '../actions';
// import { useGameStateContext } from '../../game/hooks/useGameStateContext';
import { GameCreateMode } from '../state';
import { hasErrors } from '../utils';

export const Submit: React.FC = () => {
    const [{formValidations, playerValidations, playerNameDuplicates, gameCreateMode}, gameCreateDispatch ] = useGameCreateStateContext();
    // const [gameState, gameDispatch] = useGameStateContext();

    const errors = React.useMemo(() => {
       return hasErrors({formValidations, playerValidations, playerNameDuplicates});
    }, [formValidations, playerValidations, playerNameDuplicates])


    const onSubmitClick = () => {
        gameCreateDispatch(validateFormAction.started);
    };

    return (
        <div>
            <PrimaryButton
                text="Ready to go!"
                onClick={onSubmitClick}
                disabled={gameCreateMode !== GameCreateMode.idle}
            />

            {gameCreateMode === GameCreateMode.validating &&
                <>Gettings things ready</>
            }
            {errors &&
                <>has errors</>
            }
        </div>
    );
}