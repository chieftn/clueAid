import { combineReducers } from 'redux';
import playersReducer from './players/reducer';
import deckReducer from './deck/reducer';
import suspicionReducer from './suspicions/reducers';

export default combineReducers({ 
    deck: deckReducer,
    players: playersReducer,
    suscipion: suspicionReducer
})