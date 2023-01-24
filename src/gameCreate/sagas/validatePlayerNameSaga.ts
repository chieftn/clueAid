import { Action } from 'typescript-fsa';
import { call, put } from 'redux-saga/effects';
import { Player } from '../../shared/model';
import { validatePlayerName } from '../utils';
import { ValidationResult } from '../state';
import { setPlayerValidationAction } from '../actions';
import { validatePlayerNameDuplicatesSaga } from './validatePlayerNameDuplicatesSaga';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function* validatePlayerNameSaga(action: Action<Player>) {
    const validation: ValidationResult  = yield call(validatePlayerName, action.payload);

    yield put(setPlayerValidationAction([validation]));
    yield call(validatePlayerNameDuplicatesSaga);
}