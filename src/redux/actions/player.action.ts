import { createAction } from 'redux-actions'
import * as types from '../actions/actionTypes'

export const watchPlayerAction = createAction(types.PLAYER_WATCHER)
export const oepnPlayerAction = createAction(types.PLAYER_OPEN)
export const closePlayerAction = createAction(types.PLAYER_CLOSE)
export const changePlayerStatusAction = createAction(types.PLAYER_STATUS, (status: boolean) => ({ status }))