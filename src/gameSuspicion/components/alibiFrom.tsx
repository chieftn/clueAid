import * as React from 'react';
import { Dropdown, IDropdownOption } from '@fluentui/react';
import { useGameSuspicionCreateStateContext } from '../hooks/useGameSuspicionCreateStateContext';
import { setAlibiFromAction } from '../actions';

export const AlibiFrom: React.FC = () => {
    const [ state, dispatch ] = useGameSuspicionCreateStateContext();

    const onChange = (event: React.FormEvent<HTMLDivElement>, item: IDropdownOption) => {
        dispatch(setAlibiFromAction(item.key as number))
    };

    console.log('alibi' + state.alibiFrom);

    return (
        <div className="form-element">
            <Dropdown
                ariaLabel="Specify who provided the alibi."
                label="Alibi from:"
                options={state.alibiFromOptions}
                selectedKey={state.alibiFrom}
                onChange={onChange}
            />
        </div>
    );
};
