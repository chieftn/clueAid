import { reducerWithoutInitialState } from 'typescript-fsa-reducers';
import { Game } from '../shared/model';
import { DECK } from '../shared/constants';
import { GameSuspicionCreateState, GameSuspicionCreateMode } from './state';
import { getNoAlibiOption } from './utils';
import {
    initializeAction,
    setSuspectingPlayerAction,
    setSuspectedCharacterAction,
    setSuspectedRoomAction,
    setSuspectedWeaponAction,
    setAlibiFromAction,
    setAlibiCardAction
} from './actions';

export const gameSuspicionCreateStateReducer = reducerWithoutInitialState<GameSuspicionCreateState>()
    .case(initializeAction, (state: GameSuspicionCreateState, payload: Game) => {
        const updatedState = {...state};

        updatedState.suspectingPlayerOptions = payload.players.map(s => ({ key: s.id, text: s.name}))
        updatedState.alibiFromOptions = [
            ...updatedState.suspectingPlayerOptions,
            getNoAlibiOption()
        ];

        updatedState.suspectedCharacterOptions = DECK.characterCards.map(s => ({ key: s, text: s}));
        updatedState.suspectedCharacter = updatedState.suspectedCharacterOptions[0].key as string;

        updatedState.suspectedRoomOptions = DECK.roomCards.map(s => ({ key: s, text: s}));
        updatedState.suspectedRoom = updatedState.suspectedRoomOptions[0].key as string;

        updatedState.suspectedWeaponOptions = DECK.weaponCards.map(s => ({ key: s, text: s}));
        updatedState.suspectedWeapon = updatedState.suspectedWeaponOptions[0].key as string;

        updatedState.alibiCardOptions = [
            updatedState.suspectedCharacterOptions[0],
            updatedState.suspectedWeaponOptions[0],
            updatedState.suspectedRoomOptions[0]
        ]

        updatedState.mode = GameSuspicionCreateMode.idle;
        return updatedState;
    })
    .case(setSuspectingPlayerAction, (state: GameSuspicionCreateState, payload: number) => {
        const updatedState = {...state};

        updatedState.suspectingPlayer = payload;
        updatedState.alibiFromOptions =  [
            ...state.suspectingPlayerOptions.filter(s => s.key !== payload), getNoAlibiOption()
        ];

        if (updatedState.alibiFrom === payload) {
            updatedState.alibiFrom = undefined;
        }

        return updatedState;
    })
    .case(setSuspectedCharacterAction, (state: GameSuspicionCreateState, payload: string) => {
        const updatedState = {...state};

        updatedState.suspectedCharacter = payload;
        updatedState.alibiCardOptions = updatedState.alibiCardOptions.splice(0, 1, updatedState.suspectedCharacterOptions.filter(s => s.key === payload)[0]);
        updatedState.alibiCard = undefined;

        return updatedState;
    })
    .case(setSuspectedWeaponAction, (state: GameSuspicionCreateState, payload: string) => {
        const updatedState = {...state};

        updatedState.suspectedWeapon = payload;
        updatedState.alibiCardOptions = updatedState.alibiCardOptions.splice(1, 1, updatedState.suspectedWeaponOptions.filter(s => s.key === payload)[0]);
        updatedState.alibiCard = undefined;

        return updatedState;
    })
    .case(setSuspectedRoomAction, (state: GameSuspicionCreateState, payload: string) => {
        const updatedState = {...state};

        updatedState.suspectedRoom = payload;
        updatedState.alibiCardOptions = updatedState.alibiCardOptions.splice(2, 1, updatedState.suspectedRoomOptions.filter(s => s.key === payload)[0]);
        updatedState.alibiCard = undefined;

        return updatedState;
    })
    .case(setAlibiCardAction, (state: GameSuspicionCreateState, payload: string) => {
        const updatedState = {...state};
        updatedState.alibiCard = payload;

        return updatedState;
    })
    .case(setAlibiFromAction, (state: GameSuspicionCreateState, payload: number) => {
        const updatedState = {...state};
        updatedState.alibiFrom = payload;

        return updatedState;
    });
