import { Action } from 'typescript-fsa';
import { useAsyncSagaReducer } from '../../shared/hooks/useAsyncSagaReducer';
import { getInitialGameState, GameState } from '../state';
import { gameStateReducer } from '../reducer';
import { getGameStateSagas } from '../sagas';

export const useGameState = (): [ GameState, (action: unknown) => void] => {
    const [ state, dispatch ] = useAsyncSagaReducer<GameState, Action<unknown>>(
        gameStateReducer,
        getGameStateSagas,
        getInitialGameState());

    return [ state, dispatch];
};
