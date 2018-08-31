import { Player } from './player';

export const myName = 'Me';
export interface Game {
    players: Player[];
    characterCards: string[];
    weaponCards: string[];
    roomCards: string[];
}

export function getInitialGameState() {
    return {
        players: [] as Player[],
        characterCards: [
            'Miss Scarlett',
            'Professor Plum',
            'Mrs Peacock',
            'Mr Green',
            'Colonel Mustard',
            'Mrs White'
        ],
        roomCards: [
            'Kitchen',
            'Ballroom',
            'Conservatory',
            'Billiard Room',
            'Library',
            'Study',
            'Hall',
            'Lounge',
            'Dining Room'
        ],
        weaponCards: [
            'Candlestick',
            'Knife', 
            'Lead Pipe',
            'Revolver', 
            'Rope',
            'Wrench'
        ]
    }
}

