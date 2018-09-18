import { all, fork } from 'redux-saga/effects';
import suspicionsSaga from './suspicions/saga';

export default function* rootSaga() {
    yield all([
        fork(suspicionsSaga),
    ]);
}