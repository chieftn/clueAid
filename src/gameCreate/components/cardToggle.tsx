import * as React from 'react';
import { DefaultButton } from '@fluentui/react';
import { useGameCreateStateContext } from '../hooks/useGameCreateStateContext';
import { addUserCardAction, removeUserCardAction } from '../actions';

export interface CardToggleProps {
    cardName: string;
}

export const CardToggle: React.FC<CardToggleProps> = ({ cardName }: CardToggleProps) => {
    const [ state, dispatch ] = useGameCreateStateContext();
    const toggleOn = state.userCards.has(cardName);

    const onClick = () => {
        dispatch(toggleOn ? removeUserCardAction(cardName) : addUserCardAction(cardName));
    };

    return (
        <DefaultButton
            onClick={onClick}
            toggle={true}
            checked={toggleOn}
            text={cardName}
        />
    )
};
