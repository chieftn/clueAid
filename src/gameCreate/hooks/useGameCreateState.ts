import { Action } from 'typescript-fsa';
import { useAsyncSagaReducer } from '../../shared/hooks/useAsyncSagaReducer';
import { getInitialGameCreateState, GameCreateState } from '../state';
import { gameStateReducer } from '../reducer';
import { getGameCreateStateSagas } from '../sagas';

export const useGameCreateState = (): [ GameCreateState, (action: unknown) => void] => {
    const [ state, dispatch ] = useAsyncSagaReducer<GameCreateState, Action<unknown>>(
        gameStateReducer,
        getGameCreateStateSagas,
        getInitialGameCreateState());

    return [ state, dispatch];
};
