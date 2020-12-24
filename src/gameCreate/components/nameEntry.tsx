import * as React from 'react';
import { IconButton, TextField } from '@fluentui/react';
import type { Player } from '../../game/model';
import { movePlayerOrderAction, removePlayerAction, renamePlayerAction } from '../actions';
import { useDebouncedCallback } from 'use-debounce';
import './nameEntry.scss';

export interface NameEntryProps {
    index: number;
    player: Player;
    disableDelete: boolean;
    disableUp: boolean;
    disableDown: boolean;
    dispatch(action: unknown): void;
    errorMessage?: string;
}

export const NameEntry: React.FC<NameEntryProps> = ({player, disableDelete, disableDown, disableUp, index, errorMessage, dispatch}: NameEntryProps) => {
    const debounceNameChange = useDebouncedCallback(
        (e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, value?: string) => {
            dispatch(renamePlayerAction({ id: player.id, name: value}))
        },
        800
    );

    const onDelete = () => {
        dispatch(removePlayerAction(player.id));
    }

    const onMoveUp = () => {
        dispatch(movePlayerOrderAction({currentIndex: index, newIndex: index-1}))
    }

    const onMoveDown = () => {
        dispatch(movePlayerOrderAction({currentIndex: index, newIndex: index+1}))
    }

    return (
        <div className="name-entry">
            <IconButton
                title="Remove player"
                ariaLabel="Remove this player"
                iconProps={{iconName: 'Cancel'}}
                disabled={disableDelete}
                onClick={onDelete}
            />
            <TextField
                label="Player:"
                ariaLabel="enter player name"
                defaultValue={player.name}
                readOnly={disableDelete}
                disabled={disableDelete}
                underlined={true}
                borderless={true}
                onChange={debounceNameChange.callback}
                errorMessage={player.id !== 0 && errorMessage}
            />
            <IconButton
                ariaLabel="move this player up in turn order"
                title="Move player up in turn order"
                iconProps={{iconName: 'Up'}}
                disabled={disableUp}
                onClick={onMoveUp}
            />
            <IconButton
                ariaLabel="move this player down in turn order"
                title="Move player down in turn order"
                iconProps={{iconName: 'Down'}}
                disabled={disableDown}
                onClick={onMoveDown}
            />
        </div>
    );
};
