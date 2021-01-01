import { Action } from 'typescript-fsa';
import { call, put } from 'redux-saga/effects';
import { setAlibiPlayerValidationAction } from '../actions';
import { validateAlibiPlayer } from '../utils';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function* validateAlibiPlayerSaga(action: Action<number>) {
    const validation = yield call(validateAlibiPlayer, action.payload);
    yield put(setAlibiPlayerValidationAction(validation));
}
