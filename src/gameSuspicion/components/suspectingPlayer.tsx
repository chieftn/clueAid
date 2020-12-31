import * as React from 'react';
import { Dropdown, IDropdownOption } from '@fluentui/react';
import { useGameSuspicionCreateStateContext } from '../hooks/useGameSuspicionCreateStateContext';
import { setSuspectingPlayerAction } from '../actions';

export const SuspectingPlayer: React.FC = () => {
    const [ state, dispatch ] = useGameSuspicionCreateStateContext();

    const onChange = (event: React.FormEvent<HTMLDivElement>, item: IDropdownOption) => {
        dispatch(setSuspectingPlayerAction(item.key as number))
    };

    return (
        <div className="form-element">
            <Dropdown
                ariaLabel="Specify suspecting player."
                label="Player:"
                options={state.suspectingPlayerOptions}
                selectedKey={state.suspectingPlayer}
                onChange={onChange}
                required={true}
            />
        </div>
    );
};
