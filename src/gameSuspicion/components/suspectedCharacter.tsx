import * as React from 'react';
import { Dropdown, IDropdownOption } from '@fluentui/react';
import { useGameSuspicionCreateStateContext } from '../hooks/useGameSuspicionCreateStateContext';
import { setSuspectedCharacterAction } from '../actions';
import { GameSuspicionCreateMode } from '../state';

export const SuspectedCharacter: React.FC = () => {
    const [ state, dispatch ] = useGameSuspicionCreateStateContext();

    const onChange = (event: React.FormEvent<HTMLDivElement>, item: IDropdownOption) => {
        dispatch(setSuspectedCharacterAction(item.key as string))
    };

    return (
        <div className="form-element">
            <Dropdown
                ariaLabel="Specify suspected character."
                label="suspects:"
                options={state.suspectedCharacterOptions}
                selectedKey={state.suspectedCharacter}
                onChange={onChange}
                required={true}
                disabled={state.mode !== GameSuspicionCreateMode.idle}
            />
        </div>
    );
};
