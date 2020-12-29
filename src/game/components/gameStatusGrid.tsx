import * as React from 'react';
import { DetailsList, IColumn, IGroup, SelectionMode } from '@fluentui/react';
import { Game } from '../model';
import { GameStatusEntry, getGameStatusEntries } from '../utils';
import { GameStatusGridField } from './gameStatusGridField';
import { deck } from '../../shared/constants';

export interface GameStatusGridProps {
    game: Game;
}

export const GameStatusGrid: React.FC<GameStatusGridProps> = ({game}: GameStatusGridProps) => {
    const { players, assertions } = game;

    const items: GameStatusEntry[]   = React.useMemo(() => {
        return getGameStatusEntries(assertions);
    }, [assertions]);

    const groups: IGroup[] = React.useMemo(() => {
        return [
            {
                count: deck.characterCards.length,
                key: 'characters',
                level: 0,
                name: 'Characters',
                startIndex: 0,

            },
            {
                count: deck.weaponCards.length,
                key: 'weapons',
                level: 0,
                name: 'Weapons',
                startIndex: deck.characterCards.length,
                },
            {
                count: deck.roomCards.length,
                key: 'rooms',
                name: 'Rooms',
                startIndex: deck.characterCards.length + deck.weaponCards.length,
                level: 0
            },
        ];
    }, []);

    const columns: IColumn[] = React.useMemo(() => {
        return [
            {
                key: 'card',
                ariaLabel: 'Card name',
                isResizable: true,
                label: 'Card',
                minWidth: 10,
                maxWidth: 100,
                name: "Card",
                onRender: (item: GameStatusEntry) => item.card
            },
            ...players.map((s,i) => ({
                key: i.toString(),
                ariaLabel: s.name,
                isResizable: true,
                label: s.name,
                minWidth: 10,
                maxWidth: 100,
                name: s.name,
                onRender: (item: GameStatusEntry) => // eslint-disable-line react/display-name
                    <GameStatusGridField
                        playerId={s.id}
                        gameStatusEntry={item}
                    />
            }))
        ];
    }, [players]);

    return (
        <DetailsList
            selectionMode={SelectionMode.none}
            groups={groups}
            items={items}
            columns={columns}
        />
    )
};
