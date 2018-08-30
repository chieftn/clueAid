import { connect } from 'react-redux';
import { Dispatch, compose } from 'redux';
import { AnyAction } from 'typescript-fsa';
import { Game } from '../../model/game';
import { GameSetup, GameSetupProps } from './gameSetup';
import { State } from '../../redux/state';
import { NonFunctionProperties, FunctionProperties } from '../../redux/types';
import { setGameAction } from '../../redux/game/actions';

const mapStateToProps = (state: State): NonFunctionProperties<Partial<GameSetupProps>> => {
    const currentGame = state.game;
    return {
        currentGame: currentGame
    }
};

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>): FunctionProperties<Partial<GameSetupProps>> => {
    return {
        createGame: (game: Game) => dispatch(setGameAction(game))
    };
};

export default compose(
    connect(mapStateToProps, mapDispatchToProps)
)(GameSetup);