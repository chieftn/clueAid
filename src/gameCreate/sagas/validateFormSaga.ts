import { put, select, call, all } from 'redux-saga/effects';
import { validateFormAction, setFormValidationsAction, setPlayerDuplicatesAction, setPlayerValidationAction } from '../actions';
import { GameCreateState, ValidationResult } from '../state';
import { getDuplicatePlayerNames, validatePlayerName, validateForm } from '../utils';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function* validateFormSaga() {
    try {
        const state: GameCreateState = yield select();

        const formValidations: string[] = yield call(validateForm, state);
        yield put(setFormValidationsAction(formValidations));

        const playerNameDuplicates: Set<string> = yield call(getDuplicatePlayerNames, state.players.map(s=> s.name));
        yield put(setPlayerDuplicatesAction(playerNameDuplicates));

        const playerValidations: ValidationResult[] = yield all(state.players.map(s => call(validatePlayerName, s)));
        yield put(setPlayerValidationAction(playerValidations));

        if (formValidations.length > 0 ||
            playerNameDuplicates.size > 0 ||
            playerValidations.map(s => s.value).reduce((p,c) => p+c, '')) {

            yield put(validateFormAction.failed);
            return;
        }

        yield put(validateFormAction.done);
    } catch {
        yield put(validateFormAction.failed);
    }
}
