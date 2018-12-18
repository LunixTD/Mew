import * as types from '../actions/actionTypes'

const initialState = {
  playerBoxStatus: false,
  status: 'pause',
  currentTime: 0
}

export default function (state = initialState, action: any) {
  switch(action.type) {
    case types.PLAYER_BOX_STATUS:
      return { ...state, playerBoxStatus: action.status }
    case types.PLAYER_STATUS:
      return { ...state, playerStatus: action.status }
    case types.PLAYER_CURRENTTIME:
      return { ...state, currentTime: action.currentTime }
    default:
      return state
  }
}
