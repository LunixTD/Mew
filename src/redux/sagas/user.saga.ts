import { AsyncStorage, InteractionManager } from 'react-native'
import * as types from '../actions/actionTypes'
import { delay } from 'redux-saga'
import { takeLatest, all, call, put, take } from 'redux-saga/effects'
import * as api from '../../services/api'
import request from '../../services/request'
import { md5Encrypt } from '../../services/crypto'
import { toast } from '../../common/js/nativeModules'
import navigationService from '../../common/js/navigationService'
import { authPageAnime, authPageCtr } from '../../config/animeConfig'

export function* checkLoginStatus() {
  const cookie = yield call(AsyncStorage.getItem, 'cookies')
  let expires = null
  console.log(cookie)
  // 存在cookie值
  if (cookie) {
    cookie.split(';').map((item: string, index: number) => {
      if (item.indexOf('Expires') >= 0) {
        expires = item.replace('Expires=', '')
      } 
    })
    // cookie没过期
    if (expires && new Date(expires) > new Date()) {
      yield put({ type: types.INIT_APP_DATA })
      yield call(showMainView, false)
    } else {
      yield call(showAuthPage, false)
    }
  } else {
    yield call(showAuthPage, false)
  }
}

function* loginStart(action: any) {
  const { type, identity, password } = action.payload
  var res
  if (type === 'mobile') {
    const data = {
      countrycode: 86,
      phone: identity,
      password: md5Encrypt(password),
      rememberLogin: 'true'
    }
    res = yield call(request.post, api.LOGIN_MOBILE, data)
    // console.log(res)
  } else if (type === 'username'){
    const data = {
      username: identity,
      password: md5Encrypt(password)
    }
    res = yield call(request.post, api.LOGIN_USERNAME, data)
  }
  const code = res.code
  switch(code) {
    case 400:
    case 501:
    case 502:
      yield call(toast, '用户名或密码错误', 1000)
      break
    case 200:
      yield call(toast, '登录成功', 1000)
      yield call(showMainView, true)
      // yield call(InteractionManager.runAfterInteractions)
      // yield call(navigationService.modalNavigate, 'Home')
  }
}

function* logoutStart() {
  const res = yield call(request.post, api.LOGOUT, {})
  if (res.code === 200) {
    // 确认登出成功后清空cookie
    yield call(AsyncStorage.setItem, 'cookies', '')
    yield call(toast, '登出成功', 1000)
    yield call(showAuthPage, true)
  } else {
    yield call(toast, '登出失败,请重试', 2000)
    console.log('登出失败')
    console.log(res)
  }
}

function* showAuthPage(hasAnime: boolean) {
  if (!hasAnime) {
    authPageAnime.setValue(1)
    yield put({ type: types.SET_AUTH_STATUS, payload: { authStatus: 'noPass' } })
    yield put({ type: types.SET_MAINVIEW_STATUS, payload: { mainViewStatus: 'unMount' } })
  } else {
    yield put({ type: types.SET_AUTH_STATUS, payload: { authStatus: 'noPass' } })
    yield call(authPageCtr.open.start)
    yield call(InteractionManager.runAfterInteractions)
    yield put({ type: types.SET_MAINVIEW_STATUS, payload: { mainViewStatus: 'unMount' } })
  }
}

function* showMainView(hasAnime: boolean) {
  if (!hasAnime) {
    authPageAnime.setValue(0)
    yield put({ type: types.SET_AUTH_STATUS, payload: { authStatus: 'pass' } })
    yield put({ type: types.SET_MAINVIEW_STATUS, payload: { mainViewStatus: 'mount' } })
  } else {
    yield put({ type: types.SET_MAINVIEW_STATUS, payload: { mainViewStatus: 'mount' } })
    yield call(authPageCtr.close.start)
    yield call(InteractionManager.runAfterInteractions)
    yield put({ type: types.SET_AUTH_STATUS, payload: { authStatus: 'pass' } })
  }
}

export default function* watchUserAbout() {
  yield all([
    takeLatest(types.CHECK_LOGIN_STATUS, checkLoginStatus),
    takeLatest(types.LOGIN_START, loginStart),
    takeLatest(types.LOGOUT_START, logoutStart)
  ])
}