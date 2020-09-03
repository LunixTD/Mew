import * as types from '../actions/actionTypes'
import { createAction } from 'redux-actions'
import { IProfile } from '../../config/interfaces'

export const setUserProfileAction = createAction(types.SET_PROFILE, (profile: IProfile) => ({ profile }))
export const loginStartAction = createAction(types.LOGIN_START, (type: string, identity: string, password: string) => ({ type, identity, password }))
export const logoutStartAction = createAction(types.LOGOUT_START)
export const checkLoginStatusAction = createAction(types.CHECK_LOGIN_STATUS)