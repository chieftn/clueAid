import * as React from 'react';
import { Text, DefaultButton } from '@fluentui/react';
import { useGameCreateStateContext } from '../hooks/useGameCreateStateContext';
import { addPlayerAction } from '../actions';
import { NameEntry } from './nameEntry';

export const NameEntries: React.FC = () => {
    const [{players, playerNameDuplicates, playerValidations}, dispatch] = useGameCreateStateContext();

    const onAdd = () => {
        dispatch(addPlayerAction);
    }

    return (
        <div>
            <h3><Text>Enter players and order by turn.</Text></h3>
            {players.map((s, i) =>
                <NameEntry
                    key={s.id}
                    index={i}
                    player={s}
                    disableDelete={s.id === 0}
                    disableUp={i === 0}
                    disableDown={i === players.length -1}
                    dispatch={dispatch}
                    errorMessage={
                        playerValidations[s.id] ||
                        playerNameDuplicates.has(s.name) && 'Please use a different name for each player.'
                    }
                />
            )}
            <DefaultButton
                text="Add Player"
                ariaLabel="Add another player"
                disabled={players.length >= 6}
                onClick={onAdd}
            />
        </div>
    );
};
