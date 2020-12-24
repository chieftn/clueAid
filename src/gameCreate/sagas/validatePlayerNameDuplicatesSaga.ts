import { Action } from 'typescript-fsa';
import { call, put, select } from 'redux-saga/effects';
import { Player } from '../../game/model';
import { GameCreateState } from '../state';
import { getDuplicatePlayerNames } from '../utils';
import { setPlayerDuplicatesAction } from '../actions';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function* validatePlayerNameDuplicatesSaga(action?: Action<Player>) {
    const {players}: GameCreateState = yield select();
    const playerNames = players.filter(s => s.id !== action?.payload.id).map(s =>  s.name);
    const duplicateNames = yield call(getDuplicatePlayerNames, playerNames);

    yield put(setPlayerDuplicatesAction(duplicateNames));
}
