import * as actionTypes from './actionTypes'

let gameId = 0
export const addGame = {
    type: actionTypes.GAME_ADD,
    gameId: gameId++
}