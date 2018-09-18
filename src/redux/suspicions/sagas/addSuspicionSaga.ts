import { call } from 'redux-saga/effects';
import { Action } from 'typescript-fsa';
import { Suspicion } from '../../../model/suspicion';

function doSomething() {
    console.log('took a suspicion');
}

export function* addSuspicionSaga(action: Action<Suspicion>) {
    yield call(doSomething);
}