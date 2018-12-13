import * as types from '../actions/actionTypes'

const initialState = {
  tmpStatus: false
}

export default function (state = initialState, action: any) {
  switch(action.type) {
    case types.TMP:
      return { ...state, tmpStatus: action.status }
    default:
      return state
  }
}
