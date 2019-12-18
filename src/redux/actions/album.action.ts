import * as types from '../actions/actionTypes'
import { createAction } from 'redux-actions'
import { IAlbum } from '../../config/interfaces'

export const getUserAlbumAction = createAction(types.GET_USER_ALBUM)
export const setUserAlbumAction = createAction(types.SET_USER_ALBUM, (album: IAlbum[]) => ({ album }))