import * as types from '../actions/actionTypes'
import { IAlbumState, IAlbum } from '../../config/interfaces'

const initialState: IAlbumState = {
  userAlbum: []
}

export default function (state = initialState, action: any) {
  const { payload } = action
  switch(action.type) {
    case types.SET_USER_ALBUM:
      return { ...state, userAlbum: payload.album }
    default:
      return state
  }
}
