import * as React from 'react';
import { Dropdown, IDropdownOption } from '@fluentui/react';
import { useGameSuspicionCreateStateContext } from '../hooks/useGameSuspicionCreateStateContext';
import { setSuspectedWeaponAction } from '../actions';
import { GameSuspicionCreateMode } from '../state';

export const SuspectedWeapon: React.FC = () => {
    const [ state, dispatch ] = useGameSuspicionCreateStateContext();

    const onChange = (event: React.FormEvent<HTMLDivElement>, item: IDropdownOption) => {
        dispatch(setSuspectedWeaponAction(item.key as string))
    };

    return (
        <div className="form-element">
            <Dropdown
                ariaLabel="Specify suspected weapon."
                label="with the:"
                options={state.suspectedWeaponOptions}
                selectedKey={state.suspectedWeapon}
                onChange={onChange}
                required={true}
                disabled={state.mode !== GameSuspicionCreateMode.idle}
            />
        </div>
    );
};
