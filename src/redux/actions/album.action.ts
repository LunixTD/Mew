import * as types from '../actions/actionTypes'
import { createAction } from 'redux-actions'
import { IAlbum, IAlbumInfo, IRecommendAlbum } from '../../config/interfaces'

export const getUserAlbumAction = createAction(types.GET_USER_ALBUMLIST)
export const setUserAlbumAction = createAction(types.SET_USER_ALBUMLIST, (albumList: IAlbum[]) => ({ albumList }))
export const getAlbumInfoAction = createAction(types.GET_ALBUM_INFO, (album: IAlbum | IRecommendAlbum) => ({ album }))
export const setAlbumInfoAction = createAction(types.SET_ALBUM_INFO, (albumInfo: IAlbumInfo) => ({ albumInfo }))