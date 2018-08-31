import { combineReducers } from 'redux';
import assertionsReducer from './assertions/reducers'
import playersReducer from './players/reducer';
import deckReducer from './deck/reducer';
import suspicionsReducer from './suspicions/reducers';

export default combineReducers({ 
    deck: deckReducer,
    players: playersReducer,
    suscipions: suspicionsReducer
})