import { createAction } from 'redux-actions'
import * as types from '../actions/actionTypes'

export const watchPlayerBoxAction = createAction(types.PLAYER_BOX_WATCHER)
export const oepnPlayerBoxAction = createAction(types.PLAYER_BOX_OPEN)
export const closePlayerBoxAction = createAction(types.PLAYER_BOX_CLOSE)
export const changePlayerBoxStatusAction = createAction(types.PLAYER_BOX_STATUS, (status: boolean) => ({ status }))
export const setPlayerCurrentTime = createAction(types.PLAYER_CURRENTTIME)