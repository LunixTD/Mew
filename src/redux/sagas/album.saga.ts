import { all, takeEvery, takeLatest, call, put } from 'redux-saga/effects'
import * as types from '../actions/actionTypes'
import * as api from '../../services/api'
import { Action } from 'redux-actions'
import { InteractionManager, NativeModules } from 'react-native'
import { ITrack, IAlbum } from '../../config/interfaces'
import AsyncStorage from '@react-native-community/async-storage'
import navigationService from '../../common/js/navigationService'

// 获取用户歌单
function* getUserAlbum() {
  const profileData = yield call(AsyncStorage.getItem, 'profile')
  const profile = JSON.parse(profileData)
  // console.log(JSON.parse(profile))
  const uid = profile.userId
  // const uid = 288993348
  const userAlbum = yield call(api.getUserAlbum, uid)
  // console.log(userAlbum)
  if (userAlbum.code === 200) {
    const myFavorAlbum = userAlbum.playlist[0]
    const otherAlbum = userAlbum.playlist.slice(1)
    const history = yield call(AsyncStorage.getItem, 'history')
    let playlist = []
    let index = 0
    if (!history) {
      const tmpAlbum = yield call(api.getPlaylistDetail, myFavorAlbum.id)
      playlist = tmpAlbum.playlist.tracks
    } else {
      // 通过播放记录初始化播放器和播放列表
      const historyData = JSON.parse(history)
      playlist = historyData.playlist
      index = historyData.playingIndex
    }

        // const listUrl = api.GET_PLAYLIST_DETAIL + `?id=${myFavorAlbum.id}`
        // const myFavorAlbumInfo = yield call(request.get, listUrl)
        // let tracks: ITrack[] = []
        // myFavorAlbumInfo.playlist.tracks.map((item: ITrack, index: number) => {
        //   const { name, id, ar, al: { name: alName, picUrl } } = item
        //   tracks.push({ name, id, ar, al: { name: alName, picUrl } })
        // })
        // console.log(playlist, index)
    yield put({ type: types.SET_PLAYLIST, payload: { playlist } })
    yield put({ type: types.SET_PLAYINGINDEX, payload: { playingIndex: index } })
    yield put({ type: types.SET_MODAL_PLAYLIST, payload: { modalPlaylist: playlist } })
    yield put({ type: types.SET_USER_ALBUMLIST, payload: { albumList: otherAlbum } })
  } else {
    console.log('获取用户歌单错误')
  }
}

// 获取歌单详情
function* getAlbumInfo({ payload }: Action<any>) {
  // const id = payload.id
  const album = payload.album
  console.log(album)
  yield call(InteractionManager.runAfterInteractions)
  yield call(navigationService.stackNavigate, 'AlbumPage', { album })
  const albumInfo = yield call(api.getPlaylistDetail, album.id)
  if (albumInfo.code === 200) {
    const { playlist } = albumInfo
    yield put({ type: types.SET_ALBUM_INFO, payload: { albumInfo: albumInfo.playlist } })
    const nativeModule = NativeModules.OpenNativeModule
    const { tracks, commentCount, shareCount } = playlist
    const mData = {
      tracks,
      commentCount,
      shareCount
    }

  // 给原生recyclerView发送专辑中的音乐列表数据
  yield call(InteractionManager.runAfterInteractions)
  yield call(nativeModule.getStringFromReactNative, JSON.stringify(mData))
  // yield call(navigationService.stackNavigate, screen, { album: params })
  } else {
    console.log('获取歌单数据错误')
  }
}

export default function* watchAlbum() {
  yield all([
    takeEvery(types.GET_USER_ALBUMLIST, getUserAlbum),
    takeEvery(types.GET_ALBUM_INFO, getAlbumInfo),
  ])
}