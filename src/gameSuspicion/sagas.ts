import { all, takeEvery } from 'redux-saga/effects';
import { validateFormAction, setAlibiCardAction, setAlibiFromAction, setSuspectingPlayerAction } from './actions';
import { validateFormSaga } from './sagas/validateFormSaga';
import { validateAlibiCardSaga } from './sagas/validateAlibiCardSaga';
import { validateAlibiPlayerSaga } from './sagas/validateAlibiPlayerSaga';
import { validateSuspectingPlayerSaga } from './sagas/validateSuspectingPlayerSaga';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function* getGameSuspicionCreateStateSagas() {
    yield all([
        takeEvery(validateFormAction.started, validateFormSaga),
        takeEvery(setAlibiFromAction, validateAlibiPlayerSaga),
        takeEvery(setAlibiCardAction, validateAlibiCardSaga),
        takeEvery(setSuspectingPlayerAction, validateSuspectingPlayerSaga)
    ]);
}
