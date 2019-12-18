import * as types from '../actions/actionTypes'
import { createAction } from 'redux-actions'
import { ICommonState } from '../../config/interfaces'

// type LockStatus = 'unlocked' | 'locked-open' | 'locked-closed'
export const changeDrawerLockMode = createAction(types.DRAWER_LOCK_MODE, (mode: ICommonState) => ({ mode }))