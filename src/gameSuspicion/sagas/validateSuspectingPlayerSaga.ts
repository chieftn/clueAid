import { Action } from 'typescript-fsa';
import { call, put } from 'redux-saga/effects';
import { setSuspectingPlayerValidationAction } from '../actions';
import { validateSuspectingPlayer } from '../utils';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function* validateSuspectingPlayerSaga(action: Action<number>) {
    const validation = yield call(validateSuspectingPlayer, action.payload);
    yield put(setSuspectingPlayerValidationAction(validation));
}
