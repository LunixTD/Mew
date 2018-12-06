import { all, takeEvery } from 'redux-saga/effects'
import * as types from '../actions/actionTypes'

function* playerOpenAndClose() {
  return null
}

export default function* watchPlayer() {
  yield all([
    takeEvery(types.PLAYER_WATCHER, playerOpenAndClose)
  ])
}