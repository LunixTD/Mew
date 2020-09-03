import * as types from '../actions/actionTypes'
import { createAction } from 'redux-actions'
import { LockMode, AuthStatus } from '../../config/interfaces'

// type LockStatus = 'unlocked' | 'locked-open' | 'locked-closed'
export const initAppDataAction = createAction(types.INIT_APP_DATA)
export const changeDrawerLockModeAction = createAction(types.DRAWER_LOCK_MODE, (mode: LockMode) => ({ mode }))
export const setAuthStatusAction = createAction(types.SET_AUTH_STATUS, (authStatus: AuthStatus) => ({ authStatus }))