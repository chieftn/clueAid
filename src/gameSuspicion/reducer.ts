import { reducerWithoutInitialState } from 'typescript-fsa-reducers';
import { Game } from '../shared/model';
import { DECK } from '../shared/constants';
import { GameSuspicionCreateState, GameSuspicionCreateMode } from './state';
import {
    initializeAction,
    setSuspectingPlayerAction,
    setSuspectedCharacterAction,
    setSuspectedRoomAction,
    setSuspectedWeaponAction,
    setAlibiFromAction,
    setAlibiCard
} from './actions';

export const gameSuspicionCreateStateReducer = reducerWithoutInitialState<GameSuspicionCreateState>()
    .case(initializeAction, (state: GameSuspicionCreateState, payload: Game) => {
        const updatedState = {...state};

        updatedState.players = [...payload.players];
        updatedState.allowedAlibiFrom = payload.players.filter(s => s.id !== payload.players[0].id);
        updatedState.suspectingPlayer = payload.players[0].id;
        updatedState.suspectedCharacter = DECK.characterCards[0];
        updatedState.suspectedWeapon = DECK.weaponCards[0];
        updatedState.suspectedRoom = DECK.roomCards[0];
        updatedState.allowedAlibiCards = [
            updatedState.suspectedCharacter,
            updatedState.suspectedWeapon,
            updatedState.suspectedRoom
        ];

        updatedState.mode = GameSuspicionCreateMode.idle;
        return updatedState;
    })
    .case(setSuspectingPlayerAction, (state: GameSuspicionCreateState, payload: number) => {
        const updatedState = {...state};

        updatedState.suspectingPlayer = payload;
        updatedState.allowedAlibiFrom =  state.players.filter(s => s.id !== state.players[payload].id);

        if (updatedState.alibiFrom === payload) {
            updatedState.alibiFrom = updatedState.allowedAlibiFrom[0].id;
        }

        if (updatedState.suspectingPlayer === 0) {
            updatedState.showAlibiCard = true;
            updatedState.alibiCard = updatedState.allowedAlibiCards[0];
        } else {
            updatedState.showAlibiCard = false;
            updatedState.alibiCard = undefined;
        }

        return updatedState;
    })
    .case(setSuspectedCharacterAction, (state: GameSuspicionCreateState, payload: string) => {
        const updatedState = {...state};
        updatedState.suspectedCharacter = payload;

        if (updatedState.alibiCard === state.alibiCard) {
            updatedState.alibiCard = payload;
        }

        return updatedState;
    })
    .case(setSuspectedWeaponAction, (state: GameSuspicionCreateState, payload: string) => {
        const updatedState = {...state};
        updatedState.suspectedWeapon = payload;

        if (updatedState.alibiCard === state.suspectedWeapon) {
            updatedState.alibiCard = payload;
        }

        return updatedState;
    })
    .case(setSuspectedRoomAction, (state: GameSuspicionCreateState, payload: string) => {
        const updatedState = {...state};
        updatedState.suspectedRoom = payload;

        if (updatedState.alibiCard === state.suspectedRoom) {
            updatedState.alibiCard = payload;
        }

        return updatedState;
    })
    .case(setAlibiCard, (state: GameSuspicionCreateState, payload: string) => {
        const updatedState = {...state};
        updatedState.alibiCard = payload;

        return updatedState;
    })
    .case(setAlibiFromAction, (state: GameSuspicionCreateState, payload: number) => {
        const updatedState = {...state};
        updatedState.alibiFrom = payload;

        return updatedState;
    });
