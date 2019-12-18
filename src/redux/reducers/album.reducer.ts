import * as types from '../actions/actionTypes'
import { IAlbumState, IAlbum } from '../../config/interfaces'

const initialState: IAlbumState = {
  userAlbum: [],
  albumInfo: {}
}

export default function (state = initialState, action: any) {
  const { payload } = action
  switch(action.type) {
    case types.SET_USER_ALBUMLIST:
      return { ...state, userAlbum: payload.albumList }
    case types.SET_ALBUM_INFO:
      return { ...state, albumInfo: payload.albumInfo }
    default:
      return state
  }
}
