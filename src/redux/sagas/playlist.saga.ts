import { all, takeEvery, take, put, call, select } from 'redux-saga/effects'
import * as types from '../actions/actionTypes'
import refService from '../../common/js/refService'
import * as api from '../../services/api'
import { takeLatest } from 'redux-saga'
import { AsyncStorage } from 'react-native'
import { PlaylistModalStatus, ITrack } from '../../config/interfaces'
import { listModalCtr } from '../../config/animeConfig'

const albumSelector = (state: any) => state.album
const playlistSelector = (state: any) => state.playlist

// 切换歌曲后初始化各项数值
function* initProgressStatusAndSetHistory() {
  const _time = refService.getRef('time')
  const _slider = refService.getRef('slider')
  const _circle = refService.getRef('circle')
  _time.setNativeProps({
    text: '00:00'
  })
  _slider.setNativeProps({
    value: 0
  })
  _circle.setNativeProps({
    strokeDasharray: ['0', '10000']
  })
  // 记录播放歌曲
  const { playlist, playingIndex } = yield select(playlistSelector)
  if (playlist.length !== 0) {
    const history = { playlist, playingIndex }
    AsyncStorage.setItem('history', JSON.stringify(history))
  }
}

// 将歌单推送到临时播放列表
function* putAlbumToPlaylist(action: any) {
  const { index } = action.payload
  const { albumInfo: { tracks } } = yield select(albumSelector)
  const { playlist } = yield select(playlistSelector)
  const discSwiper = refService.getRef('discSwiper')
  if (tracks === playlist) {
    discSwiper.jumpTo(index)
  } else {
    // 更新本地临时列表
    yield put({ type: types.SET_PLAYLIST, payload: { playlist: tracks } })
    // 更新歌单列表弹出框
    yield put({ type: types.SET_MODAL_PLAYLIST, payload: { modalPlaylist: tracks } })
    yield call(discSwiper.jumpTo, index)
  }
}

// 切换播放播放列表弹出框状态
function* changeStatusPlayList() {
  while(true) {
    // 播放列表打开
    yield take(types.OPEN_PLAYLISTMODAL)
    yield call(listModalCtr.open.start)
    yield put({ type: types.PLAYLISTMODAL_STATUS, payload: { status: 'open' } })

    // 播放列表关闭
    yield take(types.CLOSE_PLAYLISTMODAL)
    yield call(listModalCtr.close.start)
    yield put({ type: types.PLAYLISTMODAL_STATUS, payload: { status: 'close' } })
  }
}

// 删除临时播放列表中的歌曲
function* removeTrack(action: any) {
  const { id, index } = action.payload
  let { modalPlaylist, playlist } = yield select(playlistSelector)
  const tracks = yield call(removeTrackById, playlist, id)
  // yield call(removeTrackById, playlist, id)
  console.log(index)
  // yield put({ type: types.SET_MODAL_PLAYLIST, payload: { modalPlaylist: tracks } })
  // yield call(console.log, 555)
  yield put({ type: types.SET_PLAYLIST, payload: { playlist: tracks } })
}

function removeTrackById(tracks: ITrack[], id: number) {
  const playlist = [...tracks]
  tracks.map((item: ITrack, index: number) => {
    if (item.id === id) {
      playlist.splice(index, 1)
      return
    }
  })
  return playlist
}

export default function* watchPlaylist() {
  yield all([
    takeEvery(types.SET_PLAYINGINDEX, initProgressStatusAndSetHistory),
    takeEvery(types.PUT_ALBUM_TO_PLAYLIST, putAlbumToPlaylist),
    takeEvery(types.PLAYLISTMODAL_WATCHER, changeStatusPlayList),
    takeEvery(types.REMOVE_TRACK, removeTrack)
  ])
}