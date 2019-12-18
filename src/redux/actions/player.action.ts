import { createAction } from 'redux-actions'
import * as types from '../actions/actionTypes'

// playerBox
export const watchPlayerBoxAction = createAction(types.PLAYER_BOX_WATCHER)
export const openPlayerBoxAction = createAction(types.PLAYER_BOX_OPEN)
export const closePlayerBoxAction = createAction(types.PLAYER_BOX_CLOSE)
export const changePlayerBoxStatusAction = createAction(types.PLAYER_BOX_STATUS, (status: boolean) => ({ status }))

// audio、slider
export const audioWatcherAction = createAction(types.AUDIO_WATCHER)
export const changePlayerStatusAction = createAction(types.PLAYER_STATUS, (status: 'playing' | 'pause') => ({ status }))
export const isSlidingAction = createAction(types.IS_SLIDING, (isSliding: boolean) => ({ isSliding }))
export const setCurrentTimeAction = createAction(types.SET_CURRENTTIME, (currentTime: number) => ({ currentTime }))
export const setDurationAction = createAction(types.SET_DURATION, (duration: number) => ({ duration }))
export const sliderWatcherAction = createAction(types.SLIDER_WATCHER)
export const setSliderValueAction = createAction(types.SET_SLIDER_VALUE, (value: number) => ({ value }))
export const setSliderValueEndAction = createAction(types.SET_SLIDER_VALUE_END, (value: number) => ({ value }))
