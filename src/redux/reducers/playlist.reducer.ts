import * as types from '../actions/actionTypes'
import { ITrack, IPlaylistState } from '../../config/interfaces'

const initialState: IPlaylistState = {
  playingIndex: 0,
  playlist: [],
  modalPlaylist: [],
  playlistModalStatus: 'close'
}

export default function (state = initialState, action: any) {
  const { payload } = action
  switch(action.type) {
    case types.SET_PLAYINGINDEX:
      return { ...state, playingIndex: payload.playingIndex }
    case types.SET_PLAYLIST:
      return { ...state, playlist: payload.playlist }
    case types.SET_MODAL_PLAYLIST:
      return { ...state, modalPlaylist: payload.modalPlaylist }
    case types.PLAYLISTMODAL_STATUS:
      return { ...state, playlistModalStatus: payload.status }
    default:
      return state
  }
}
