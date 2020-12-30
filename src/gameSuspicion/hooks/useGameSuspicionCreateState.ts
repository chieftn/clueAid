import { Action } from 'typescript-fsa';
import { useAsyncSagaReducer } from '../../shared/hooks/useAsyncSagaReducer';
import { getInitialGameSuspicionCreateState, GameSuspicionCreateState } from '../state';
import { gameSuspicionCreateStateReducer } from '../reducer';
import { getGameSuspicionCreateStateSagas } from '../sagas';

export const useGameState = (): [ GameSuspicionCreateState, (action: unknown) => void] => {
    const [ state, dispatch ] = useAsyncSagaReducer<GameSuspicionCreateState, Action<unknown>>(
        gameSuspicionCreateStateReducer,
        getGameSuspicionCreateStateSagas,
        getInitialGameSuspicionCreateState());

    return [ state, dispatch];
};
