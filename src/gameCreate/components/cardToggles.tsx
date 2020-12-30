import * as React from 'react';
import { Text } from '@fluentui/react';
import { DECK } from '../../shared/constants';
import { CardToggleSection } from './cardToggleSection';

export const CardSelection: React.FC = () => {
    return (
        <div>
            <h3><Text>Select cards in your hand.</Text></h3>
            <div>
                <CardToggleSection cards={DECK.characterCards} />
                <CardToggleSection cards={DECK.weaponCards} />
                <CardToggleSection cards={DECK.roomCards} />
            </div>
        </div>
    )
};
