import { Action } from 'typescript-fsa';
import { call, put, select } from 'redux-saga/effects';
import { setAlibiCardValidationAction } from '../actions';
import { validateAlibiCard } from '../utils';
import { GameSuspicionCreateState } from '../state';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function* validateAlibiCardSaga(action: Action<string>) {
    const state: GameSuspicionCreateState = yield select();

    const validation = yield call(validateAlibiCard, {
        key: action.payload,
        suspectingPlayer: state.suspectingPlayer,
        alibiFrom: state.alibiFrom
    });
    yield put(setAlibiCardValidationAction(validation));
}
