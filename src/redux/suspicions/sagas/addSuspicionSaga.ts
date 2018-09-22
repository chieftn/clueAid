import { select } from 'redux-saga/effects';
import { addAssertionAction } from '../../assertions/actions';
import { Action } from 'typescript-fsa';
import { AssertionGenerator } from '../../../utilities/assertionGenerator';
import { State } from '../../state';
import { Suspicion } from '../../../model/suspicion';

const getSuspicions = (state: State) => state.suspicions;
const getAssertions = (state: State) => state.assertions;
const getPlayers = (state: State) => state.players;
const getDeck = (state: State) => state.deck;

export function* addSuspicionSaga(action: Action<Suspicion>) {
    const suspicions = yield select(getSuspicions);
    const assertions = yield select(getAssertions);
    const players = yield select(getPlayers);
    const deck = yield select(getDeck);

    const assertionGenerator = new AssertionGenerator(assertions, players, [...suspicions, action.payload], deck);
    const newAssertions = assertionGenerator.generateAssertions();
    const newAssertionActions = newAssertions.map((assertion) => {
        return addAssertionAction(assertion);
    });
    
    yield newAssertionActions;
}