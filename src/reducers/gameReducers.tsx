import * as actionTypes from "../actions/actionTypes";
import { Action } from "redux";
import { Game } from "../model/Game";

export const gameReducers = (state: Game[] = [], action: Action) => {
    switch (action.type) {
        case actionTypes.GAME_ADD: 
            return [
                ...state,{
                    id: 200
                }
            ]
        case actionTypes.GAME_REMOVE:
            return []

        default: 
            return state
    }
}