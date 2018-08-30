import { connect } from 'react-redux';
import { Dispatch, compose } from 'redux';
import { AnyAction } from 'typescript-fsa';
import { Game } from '../../model/game';
import { GameTracker, GameTrackerProps } from './gameTracker';
import { State } from '../../redux/state';
import { NonFunctionProperties, FunctionProperties } from '../../redux/types';
import { setGameAction } from '../../redux/game/actions';

const mapStateToProps = (state: State, ownProps: GameTrackerProps): NonFunctionProperties<Partial<GameTrackerProps>> => {
    const currentGame = state.game;
    return {
        game: currentGame
    }
};

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>): FunctionProperties<Partial<GameTrackerProps>> => {
    return {
        reviseGame: (game: Game) => dispatch(setGameAction)
    };
};

export default compose(
    connect(mapStateToProps, mapDispatchToProps)
)(GameTracker);