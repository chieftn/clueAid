import { connect } from 'react-redux';
import { Dispatch, compose } from 'redux';
import { AnyAction } from 'typescript-fsa';
import { addSuspicionAction} from '../../redux/suspicions/actions';
import { GameTracker, GameTrackerProps } from './gameTracker';
import { State } from '../../redux/state';
import { NonFunctionProperties, FunctionProperties } from '../../redux/types';
import { Suspicion } from '../../model/suspicion';

const mapStateToProps = (state: State): NonFunctionProperties<Partial<GameTrackerProps>> => {
    return {
        players: state.players,
        deck: state.deck,
        suspicions: state.suspicions,
        assertions: state.assertions
    }
};

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>): FunctionProperties<Partial<GameTrackerProps>> => {
    return {
        addSuspicion: (suspicion: Suspicion) => dispatch(addSuspicionAction(suspicion))
    };
};

export default compose(
    connect(mapStateToProps, mapDispatchToProps)
)(GameTracker);