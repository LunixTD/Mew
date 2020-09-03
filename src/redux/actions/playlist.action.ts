import * as types from '../actions/actionTypes'
import { createAction } from 'redux-actions'
import { ITrack, PlaylistModalStatus } from '../../config/interfaces'

export const setPlaylistAction = createAction(types.SET_PLAYLIST, (playlist: ITrack[]) => ({ playlist }))
export const setModalPlaylistAction = createAction(types.SET_MODAL_PLAYLIST, (modalPlaylist: ITrack[]) => ({ modalPlaylist }))
export const setPlayingIndexAction = createAction(types.SET_PLAYINGINDEX, (playingIndex: number) => ({ playingIndex }))
// export const setCurrentTrackAction = createAction(types.STE_CURRENTTRACK, (track: ITrack) => ({ track }))
export const putAlbumToPlaylistAction = createAction(types.PUT_ALBUM_TO_PLAYLIST, (index: number) => ({ index }))

// 播放列表弹出框
export const watchPlaylistModalAction = createAction(types.PLAYLISTMODAL_WATCHER)
export const changePlaylistModalStatusAction = createAction(types.PLAYLISTMODAL_STATUS, (status: PlaylistModalStatus) => ({ status }))
export const openPlaylistModalAction = createAction(types.OPEN_PLAYLISTMODAL)
export const closePlaylistModalAction = createAction(types.CLOSE_PLAYLISTMODAL)
export const removeTrackAction = createAction(types.REMOVE_TRACK, (id: number | undefined, index: number) => ({ id, index }))