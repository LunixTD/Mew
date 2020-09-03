import * as types from '../actions/actionTypes'
import { IProfile } from '../../config/interfaces'

interface IUserState {
  profile: IProfile | {}
}

const initialState: IUserState = {
  profile: {}
}

export default function (state = initialState, action: any) {
  const { payload } = action
  switch(action.type) {
    case types.SET_PROFILE: 
      return { ...state, profile: payload.profile }
    default:
      return state
  }
}