import { InteractionManager } from 'react-native'
import { all, takeEvery, take, put, call } from 'redux-saga/effects'
import * as types from '../actions/actionTypes'
import { musicPlayerCtr, bottomBoxCtr } from '../../config/animeConfig'

function* playerOpenAndClose() {
  while(true) {
    // 播放界面打开
    yield take(types.PLAYER_BOX_OPEN)
    yield put({ type: types.PLAYER_STATUS, status: true })
    let anime = yield call(InteractionManager.createInteractionHandle)
    yield call(musicPlayerCtr.open.start)
    yield call(bottomBoxCtr.open.start)
    yield call(InteractionManager.clearInteractionHandle, anime)

    // 播放界面关闭
    yield take(types.PLAYER_BOX_CLOSE)
    yield put({ type: types.PLAYER_STATUS, status: false })
    anime = yield call(InteractionManager.createInteractionHandle)
    yield call(musicPlayerCtr.close.start)
    yield call(bottomBoxCtr.close.start)
    yield call(InteractionManager.clearInteractionHandle, anime)
  }
}

export default function* watchPlayer() {
  yield all([
    takeEvery(types.PLAYER_BOX_WATCHER, playerOpenAndClose)
  ])
}