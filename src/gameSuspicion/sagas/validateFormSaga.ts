import { call, put, select } from 'redux-saga/effects';
import { GameSuspicionCreateState } from '../state';
import { validateFormAction, FormValidationResult } from '../actions';
import { validateAlibiCard, validateAlibiPlayer, validateSuspectingPlayer } from '../utils';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function* validateFormSaga() {
    try {
        const state: GameSuspicionCreateState = yield select();

        const alibiCardValidation: string = yield call(validateAlibiCard, {
            key: state.alibiCard,
            suspectingPlayer: state.suspectingPlayer,
            alibiFrom: state.alibiFrom
        });

        const alibiPlayerValidation: string = yield call(validateAlibiPlayer, state.alibiFrom);
        const suspectingPlayerValidation: string = yield call(validateSuspectingPlayer, state.suspectingPlayer);

        const validationResult: FormValidationResult = {
            alibiCardValidation,
            alibiPlayerValidation,
            suspectingPlayerValidation
        };

        (Object.values(validationResult).reduce((prev, curr) => curr + prev)) ?
            yield put(validateFormAction.failed({ error: validationResult })) :
            yield put(validateFormAction.done);

    } catch {
        const problem = 'There was a problem validating this value';
        const error = {
            alibiCardValidation: problem,
            alibiPlayerValidation: problem,
            suspectingPlayerValidation: problem
        }
        yield put(validateFormAction.failed({ error }));
    }
}
