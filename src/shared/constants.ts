import type { Deck } from './model';

export const PATHS = {
    HOME: '/',
    CREATE: '/create',
    STATUS: '/status',
    SUSPICION: '/suspicion'
}

export const DECK: Deck = {
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
