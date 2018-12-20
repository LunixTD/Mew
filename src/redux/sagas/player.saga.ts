import { InteractionManager } from 'react-native'
import { all, takeEvery, take, put, call, select } from 'redux-saga/effects'
import * as types from '../actions/actionTypes'
import { musicPlayerCtr, bottomBoxCtr } from '../../config/animeConfig'
import refService from '../../common/js/refService'

const playerSelector = (state: any) => state.player

function* playerOpenAndClose() {
  while(true) {
    // 播放界面打开
    yield take(types.PLAYER_BOX_OPEN)
    yield put({ type: types.PLAYER_BOX_STATUS, payload: { status: true } })
    // let anime = yield call(InteractionManager.createInteractionHandle)
    yield call(musicPlayerCtr.open.start)
    yield call(bottomBoxCtr.open.start)
    // yield call(InteractionManager.clearInteractionHandle, anime)

    // 播放界面关闭
    yield take(types.PLAYER_BOX_CLOSE)
    yield put({ type: types.PLAYER_BOX_STATUS, payload: { status: false } })
    // anime = yield call(InteractionManager.createInteractionHandle)
    yield call(musicPlayerCtr.close.start)
    yield call(bottomBoxCtr.close.start)
    // yield call(InteractionManager.clearInteractionHandle, anime)
  }
}

function* audioWatcher() {
  while(true) {
    // 设置各控件的歌曲当前时间以及进度
    yield take(types.SET_CURRENTTIME)
    const { currentTime, duration, isSliding } = yield select(playerSelector)
    if (!isSliding) {
      setPropsRelatePlayer(currentTime, duration)
    }
  }
}

function* sliderWatcher() {
  while(true) {
    yield take(types.SET_SLIDER_VALUE)
    const { duration, sliderValue } = yield select(playerSelector)
    const currentTime = duration * sliderValue
    const _time = refService.getRef('time')
    _time.setNativeProps({
      text: formatTime(currentTime)
    })
  }
}

function* setSliderValueEnd(action: any) {
  const { value } = action.payload
  const { duration } = yield select(playerSelector)
  const currentTime = duration * value
  setPropsRelatePlayer(currentTime, duration)
  const _audio = refService.getRef('audio')
  _audio.seek(currentTime)
  yield put({ type: types.IS_SLIDING, payload: { isSliding: false } })
}

function setPropsRelatePlayer(currentTime: number, duration: number) {
  const _time = refService.getRef('time')
  const _slider = refService.getRef('slider')
  const _circle = refService.getRef('circle')
  const percentage = currentTime / duration
  const ary = [(2 * Math.PI * 15 * percentage).toString(), '10000']
  _time.setNativeProps({
    text: formatTime(currentTime)
  })
  _slider._setCurrentValue(percentage)
  _circle.setNativeProps({
    strokeDasharray: ary
  })
}

// 格式化时间
function formatTime(time: number) {
  let min = parseInt(String(time / 60))
  let sec = -(time % 60).toFixed()
  if (sec === -60 || sec === 0) {
    sec = 0
  }
  return (min >= 10 ? min : '0' + min) + ':' + (-sec >= 10 ? -sec : '0' + -sec)
}

export default function* watchPlayer() {
  yield all([
    takeEvery(types.PLAYER_BOX_WATCHER, playerOpenAndClose),
    takeEvery(types.AUDIO_WATCHER, audioWatcher),
    takeEvery(types.SLIDER_WATCHER, sliderWatcher),
    takeEvery(types.SET_SLIDER_VALUE_END, setSliderValueEnd)
  ])
}