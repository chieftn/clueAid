import * as React from 'react';
import { MessageBar, MessageBarType, FocusTrapZone } from '@fluentui/react';
import { useGameCreateStateContext } from '../hooks/useGameCreateStateContext';
import { hasErrors } from '../utils';
import { GameCreateMode } from '../state';

export const SubmitStatus: React.FC = () => {
    const [{formValidations, playerValidations, playerNameDuplicates, gameCreateMode} ] = useGameCreateStateContext();

    const errors = React.useMemo(() => {
        return hasErrors({formValidations, playerValidations, playerNameDuplicates});
    }, [formValidations, playerValidations, playerNameDuplicates])

    console.log(gameCreateMode);

    if (gameCreateMode === GameCreateMode.validating) {
        return(
            <FocusTrapZone>
                <MessageBar messageBarType={MessageBarType.info}>
                    <div tabIndex={0}>Getting things ready</div>
                </MessageBar>
            </FocusTrapZone>
        );
    }

    if (errors) {
        return (
            <MessageBar messageBarType={MessageBarType.error}>
                <>
                    <div>Please fix errors before proceeding.</div>
                    {formValidations.length > 0 &&
                        <ul>
                            {formValidations.map(s=> <li key={s}>{s}</li>)}
                        </ul>
                    }
                </>
            </MessageBar>
        );
    }

    return <></>
};
