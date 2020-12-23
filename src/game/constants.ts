export const PATHS = {
    HOME: '/',
    CREATE: '/game'
}

export interface Deck {
    characterCards: string[];
    roomCards: string[];
    weaponCards: string[];
}

export function getDeck(): Deck {
    return {
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