import { InteractionManager, NativeModules, AsyncStorage } from 'react-native'
import { delay } from 'redux-saga'
import { all, takeEvery, takeLatest, call, put, fork, take } from 'redux-saga/effects'
import * as types from '../actions/actionTypes'
import { Action } from 'redux-actions'
import refService from '../../common/js/refService'
import { PlaylistModalStatus } from '../../config/interfaces'


// 初始化app部分值
function* initAppData() {
  yield all([
    // fork()
  ])
  // const cookie = AsyncStorage.getItem('cookies')
  // console.log(cookie)
}

export default function* watchCommon() {
  yield all([
    // takeEvery(types.STACK_NAVIGATE, stackNavigateHandler),
    takeEvery(types.INIT_APP_DATA, initAppData)
  ])
}