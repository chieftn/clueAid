import * as React from 'react';
import { Text } from '@fluentui/react';
import { deck } from '../../shared/constants';
import { CardToggleSection } from './cardToggleSection';

export const CardSelection: React.FC = () => {
    return (
        <div>
            <h3><Text>Select cards in your hand</Text></h3>
            <div>
                <CardToggleSection cards={deck.characterCards} />
                <CardToggleSection cards={deck.weaponCards} />
                <CardToggleSection cards={deck.roomCards} />
            </div>
        </div>
    )
};
