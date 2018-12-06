import * as types from '../actions/actionTypes'

const initialState = {
  playerStatus: false
}

export default function (state = initialState, action: any) {
  switch(action.type) {
    case types.PLAYER_STATUS: 
      return { ...state, playerStatus: action.status }
    default:
      return state
  }
}
