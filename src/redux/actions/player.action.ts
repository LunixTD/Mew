import { createAction } from 'redux-actions'
import * as types from '../actions/actionTypes'

export const watchPlayer = createAction(types.PLAYER_WATCHER)
export const oepnPlayer = createAction(types.PLAYER_OPEN)
export const closePlayer = createAction(types.PLAYER_CLOSE)
export const changePlayerStatus = createAction(types.PLAYER_STATUS, (status: boolean) => ({ status }))