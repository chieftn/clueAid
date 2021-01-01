import * as React from 'react';
import { Dropdown, IDropdownOption } from '@fluentui/react';
import { useGameSuspicionCreateStateContext } from '../hooks/useGameSuspicionCreateStateContext';
import { setAlibiCardAction } from '../actions';
import { alibiCardEnabled } from '../utils';
import { GameSuspicionCreateMode } from '../state';

export const AlibiCard: React.FC = () => {
    const [ state, dispatch ] = useGameSuspicionCreateStateContext();

    const onChange = (event: React.FormEvent<HTMLDivElement>, item: IDropdownOption) => {
        dispatch(setAlibiCardAction(item.key as string))
    };

    console.log('card ' + state.alibiCard);

    if (alibiCardEnabled(state)) {
        return (
            <div className="form-element">
                <Dropdown
                    ariaLabel="Specify card you saw."
                    label="Alibi card:"
                    options={state.alibiCardOptions}
                    selectedKey={state.alibiCard}
                    onChange={onChange}
                    required={true}
                    disabled={state.mode !== GameSuspicionCreateMode.idle}
                    errorMessage={state.alibiCardValidation}

                />
            </div>
        );
    }

    return <></>
};
