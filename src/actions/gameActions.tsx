import * as actionTypes from './actionTypes';
import { Game } from "../model/Game";

let gameId = 0
export const addGame = (game: Game) =>({
    type: actionTypes.GAME_ADD,
    gameId: gameId++
})