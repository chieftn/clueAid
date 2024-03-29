import type { Player } from '../shared/model';
import { reducerWithoutInitialState } from 'typescript-fsa-reducers';
import { GameCreateMode, GameCreateState, ValidationResult } from './state';
import {
    addPlayerAction,
    removePlayerAction,
    renamePlayerAction,
    addUserCardAction,
    removeUserCardAction,
    movePlayerOrderAction,
    setPlayerDuplicatesAction,
    setPlayerValidationAction,
    validateFormAction,
    setFormValidationsAction
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

        updatedState.playerValidations = {...state.playerValidations};
        delete(updatedState.playerValidations[payload]);

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
    })
    .case(movePlayerOrderAction, (state: GameCreateState, payload: {currentIndex: number, newIndex: number}) => {
        const { newIndex, currentIndex } = payload;
        const updatedState = {...state};

        const array = [...state.players]
        array.splice(currentIndex, 1);
        array.splice(newIndex, 0, state.players[currentIndex]);
        updatedState.players = array;

        return updatedState;
    })
    .case(setPlayerDuplicatesAction, (state: GameCreateState, payload: Set<string>) => {
        const updatedState = {...state, playerNameDuplicates: payload};
        return updatedState;
    })
    .case(setPlayerValidationAction, (state: GameCreateState, payload: ValidationResult[]) => {
        const updatedState = {...state};
        updatedState.playerValidations = {...state.playerValidations};
        payload.forEach(s => {
            updatedState.playerValidations[s.id] = s.value
        });

        return updatedState;
    })
    .case(setFormValidationsAction, (state: GameCreateState, payload: string[]) => {
        const updatedState = {...state};
        updatedState.formValidations = payload;

        return updatedState;
    })
    .case(validateFormAction.started, (state: GameCreateState) => {
        const updatedState = {...state};
        updatedState.gameCreateMode = GameCreateMode.validating;

        return updatedState;
    })
    .case(validateFormAction.done, (state: GameCreateState) => {
        const updatedState = {...state};
        updatedState.gameCreateMode = GameCreateMode.submitReady;

        return updatedState;
    })
    .case(validateFormAction.failed, (state: GameCreateState) => {
        const updatedState = {...state};
        updatedState.gameCreateMode = GameCreateMode.idle;

        return updatedState;
    });
