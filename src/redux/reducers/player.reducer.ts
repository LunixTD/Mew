import * as types from '../actions/actionTypes'
import { IPlayerState } from '../../config/interfaces'
const initialState: IPlayerState = {
  playerBoxStatus: false,
  status: 'pause',
  currentTime: 0,
  duration: 0,
  sliderValue: 0,
  isSliding: false
}

export default function (state = initialState, action: any) {
  const { payload } = action
  switch(action.type) {
    case types.PLAYER_BOX_STATUS:
      return { ...state, playerBoxStatus: payload.status }
    case types.PLAYER_STATUS:
      return { ...state, status: payload.status }
    case types.IS_SLIDING:
      return { ...state, isSliding: payload.isSliding }
    case types.SET_CURRENTTIME:
      return { ...state, currentTime: payload.currentTime }
    case types.SET_DURATION:
      return { ...state, duration: payload.duration }
    case types.SET_SLIDER_VALUE:
      return { ...state, sliderValue: payload.value }
    default:
      return state
  }
}
