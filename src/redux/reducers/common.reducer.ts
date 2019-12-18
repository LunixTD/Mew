import * as types from '../actions/actionTypes'
import { ICommonState } from '../../config/interfaces'

const initialState: ICommonState = {
  drawerLockMode: 'unlocked'
}

export default function (state = initialState, action: any) {
  const { payload } = action
  switch(action.type) {
    case types.DRAWER_LOCK_MODE:
      return { ...state, drawerLockMode: payload.mode }
    default:
      return state
  }
}
