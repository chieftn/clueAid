import { put } from 'redux-saga/effects';
import { validateFormAction } from '../actions';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function* validateFormSaga() {
    try {
        yield put(validateFormAction.done);
    } catch {
        yield put(validateFormAction.failed)
    }
}
