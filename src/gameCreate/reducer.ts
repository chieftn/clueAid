import type { Player } from '../game/model';
import { reducerWithoutInitialState } from 'typescript-fsa-reducers';
import { GameCreateState } from './state';
import {
    addPlayerAction,
    removePlayerAction,
    renamePlayerAction,
    addUserCardAction,
    removeUserCardAction
} from './actions';

export const gameStateReducer = reducerWithoutInitialState<GameCreateState>()
    .case(addPlayerAction, (state: GameCreateState) => {
        const updatedState = {...state};
        updatedState.players = [...state.players, { id: state.nextPlayerId, name: ''}];
        updatedState.nextPlayerId += 1;

        return updatedState;
    })
    .case(removePlayerAction, (state: GameCreateState, payload: number) => {
        const updatedState = {...state};
        updatedState.players = state.players.filter(s => s.id !== payload);

        return updatedState;
    })
    .case(renamePlayerAction, (state: GameCreateState, payload: Player) => {
        const updatedState = {...state};
        updatedState.players = state.players.map(s => s.id === payload.id ? payload : s);

        return updatedState;
    })
    .case(addUserCardAction, (state: GameCreateState, payload: string) => {
        const updatedState = {...state};
        updatedState.userCards = new Set(state.userCards);
        updatedState.userCards.add(payload);

        return updatedState;
    })
    .case(removeUserCardAction, (state: GameCreateState, payload: string) => {
        const updatedState = {...state};
        updatedState.userCards = new Set(state.userCards);
        updatedState.userCards.delete(payload);

        return updatedState;
    });
