import { all, takeEvery, takeLatest, call, put } from 'redux-saga/effects'
import * as types from '../actions/actionTypes'
import asios from 'axios'
import * as api from '../../services/api'

const { request } = api

function* getUserAlbum() {
  const userAlbum = yield call(request.post, api.GET_USER_PLAYLIST, { uid: 288993348 })
  yield put({ type: types.SET_USER_ALBUM, payload: { album: userAlbum.data.playlist } })
}

export default function* watchAlbum() {
  yield all([
    takeEvery(types.GET_USER_ALBUM, getUserAlbum)
  ])
}