import * as React from 'react';
import { Dropdown, IDropdownOption } from '@fluentui/react';
import { useGameSuspicionCreateStateContext } from '../hooks/useGameSuspicionCreateStateContext';
import { setSuspectedRoomAction } from '../actions';

export const SuspectedRoom: React.FC = () => {
    const [ state, dispatch ] = useGameSuspicionCreateStateContext();

    const onChange = (event: React.FormEvent<HTMLDivElement>, item: IDropdownOption) => {
        dispatch(setSuspectedRoomAction(item.key as string))
    };

    return (
        <div className="form-element">
            <Dropdown
                ariaLabel="Specify suspected room."
                label="in the:"
                options={state.suspectedRoomOptions}
                selectedKey={state.suspectedRoom}
                onChange={onChange}
                required={true}
            />
        </div>
    );
};
