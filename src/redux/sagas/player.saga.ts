import { all, takeEvery, take, put, call } from 'redux-saga/effects'
import * as types from '../actions/actionTypes'
import { musicPlayerCtr } from '../../config/animeConfig'

function* playerOpenAndClose() {
  while(true) {
    // 播放界面打开
    yield take(types.PLAYER_OPEN)
    yield put({ type: types.PLAYER_STATUS, status: true })
    yield call(musicPlayerCtr.open.start)

    // 播放界面关闭
    yield take(types.PLAYER_CLOSE)
    yield put({ type: types.PLAYER_STATUS, status: false })
    yield call(musicPlayerCtr.close.start)
  }
}

export default function* watchPlayer() {
  yield all([
    takeEvery(types.PLAYER_WATCHER, playerOpenAndClose)
  ])
}