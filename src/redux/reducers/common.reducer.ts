import * as types from '../actions/actionTypes'
import { ICommonState } from '../../config/interfaces'

const initialState: ICommonState = {
  drawerLockMode: 'unlocked',
  mainViewStatus: 'notAuth',
  authStatus: 'notAuth',
  reloadMainView: false
}

export default function (state = initialState, action: any) {
  const { payload } = action
  switch(action.type) {
    case types.DRAWER_LOCK_MODE:
      return { ...state, drawerLockMode: payload.mode }
    case types.SET_AUTH_STATUS:
      return { ...state, authStatus: payload.authStatus }
    case types.SET_MAINVIEW_STATUS:
      return { ...state, mainViewStatus: payload.mainViewStatus }
    default:
      return state
  }
}
