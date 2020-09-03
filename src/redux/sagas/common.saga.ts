import { InteractionManager, NativeModules, AsyncStorage } from 'react-native'
import { all, takeEvery, takeLatest, call, put, fork, take } from 'redux-saga/effects'
import * as types from '../actions/actionTypes'
import { Action } from 'redux-actions'
import refService from '@common/js/refService'
import { PlaylistModalStatus, IAlbum, IrecommendListData } from '@config/interfaces'
import { getRecommendPlaylist, getAllToplist } from '@services/api'

// 获取主页内容
// 获取推荐及排行内容
function* getRecommendListData() {
  const recommendList = yield call(getRecommendPlaylist)
  const topList = yield call(getAllToplist)
  let recommendListData: IrecommendListData = {
    recommendList: recommendList.slice(0, 6),
    officialTopList: [],
    recommendTopList: [],
    worldTopList: [],
  }
  topList.map((item: IAlbum, index: number) => {
    switch(item.id) {
      // 官方榜单
      case 3779629:
      case 3778678:
      case 19723756:
        recommendListData.officialTopList.push(item)
        break
      // 推荐榜单
      case 991319590:
      case 71384707:
      case 71385702:
      case 10520166:
      case 1978921795:
      case 2250011882:
        recommendListData.recommendTopList.push(item)
        break
      // 全球榜
      case 60198:
      case 180106:
      case 3812895:
      case 60131:
      case 11641012:
      case 27135204:
        recommendListData.worldTopList.push(item)
        break
      default: break
    }
  })
  // console.log(recommendListData)
  yield put({ type: types.SET_RECOMMEND_LIST_DATA, payload: { data: recommendListData } })
}


// 初始化app部分值
function* initAppData() {
  yield all([
    fork(getRecommendListData)
  ])
}

export default function* watchCommon() {
  yield all([
    takeEvery(types.INIT_APP_DATA, initAppData)
  ])
}