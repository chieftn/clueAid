import * as React from 'react';
import { DetailsList, IColumn, SelectionMode } from '@fluentui/react';
import { Game } from '../model';

export interface GameStatusGridProps {
    game: Game;
}

export const GameStatusGrid: React.FC<GameStatusGridProps> = ({game}: GameStatusGridProps) => {
    const { players, assertions } = game;

    const columns: IColumn[] = React.useMemo(() => {
        return [
            {
                allowResize: true,
                key: 'Card',
                ariaLabel: 'Card name',
                label: 'Card',
                minWidth: 10,
                maxWidth: 100,
                name: "Card"
            },
            ...players.map((s,i) => ({
                allowResize: true,
                key: i.toString(),
                ariaLabel: s.name,
                label: s.name,
                minWidth: 10,
                maxWidth: 100,
                name: s.name,
            }))
        ];
    }, [players]);

    const items = React.useMemo(() => {
        return [];
    }, [assertions]);

    return (
        <DetailsList
            selectionMode={SelectionMode.none}
            items={items}
            columns={columns}
        />
    )
};
