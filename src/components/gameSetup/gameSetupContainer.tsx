import { connect } from 'react-redux';
import { Dispatch, compose } from 'redux';
import { Assertion } from '../../model/assertion';
import { AnyAction } from 'typescript-fsa';
import { Player } from '../../model/player';
import { GameSetup, GameSetupProps } from './gameSetup';
import { State } from '../../redux/state';
import { NonFunctionProperties, FunctionProperties } from '../../redux/types';
import { addAssertionAction } from '../../redux/assertions/actions';
import { addPlayerAction } from '../../redux/players/actions';

const mapStateToProps = (state: State): NonFunctionProperties<Partial<GameSetupProps>> => {
    return {
        deck: state.deck
    }
};

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>): FunctionProperties<Partial<GameSetupProps>> => {
    return {
        addAssertion: (assertion: Assertion) => dispatch(addAssertionAction(assertion)),
        addPlayer: (player: Player) => dispatch(addPlayerAction(player))
    };
};

export default compose(
    connect(mapStateToProps, mapDispatchToProps)
)(GameSetup);