import { all, takeEvery } from 'redux-saga/effects';
import { addSuspicionSaga } from './sagas/addSuspicionSaga';
import { addSuspicionAction } from './actions';

export default function* rootSaga() {
    yield all([
        takeEvery(addSuspicionAction.type, addSuspicionSaga),
    ]);
}