import { takeEvery, all } from 'redux-saga/effects';
import { renamePlayerAction, removePlayerAction, validateFormAction } from './actions';
import { validatePlayerNameSaga } from './sagas/validatePlayerNameSaga';
import { validatePlayerNameDuplicatesSaga } from './sagas/validatePlayerNameDuplicatesSaga';
import { validateFormSaga } from './sagas/validateFormSaga';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function* getGameCreateStateSagas() {
    yield all([
        takeEvery(renamePlayerAction, validatePlayerNameSaga),
        takeEvery(removePlayerAction, validatePlayerNameDuplicatesSaga),
        takeEvery(validateFormAction.started, validateFormSaga)
    ]);
}
