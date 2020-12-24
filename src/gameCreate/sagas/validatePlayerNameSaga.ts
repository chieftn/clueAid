import { Action } from 'typescript-fsa';
import { call, put } from 'redux-saga/effects';
import { Player } from '../../game/model';
import { validatePlayerName } from '../utils';
import { setPlayerValidationAction } from '../actions';
import { validatePlayerNameDuplicatesSaga } from './validatePlayerNameDuplicatesSaga';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function* validatePlayerNameSaga(action: Action<Player>) {
    const validation: string = yield call(validatePlayerName, action.payload.name);

    yield put(setPlayerValidationAction({ id: action.payload.id, validation }));
    yield call(validatePlayerNameDuplicatesSaga);
}