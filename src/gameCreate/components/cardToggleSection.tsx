import * as React from 'react';
import { CardToggle } from './cardToggle';
import './cardToggleSection.scss';

export interface CardToggleSectionProps {
    cards: readonly string[];
}

export const CardToggleSection: React.FC<CardToggleSectionProps> = ({cards}: CardToggleSectionProps) => {
    return (
        <div className='toggle-section'>
            {cards.map(s =>  <CardToggle key={s} cardName={s}/>) }
        </div>
    );
};