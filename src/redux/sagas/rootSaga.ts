import { all, fork } from 'redux-saga/effects'

import watchPlayer from './player.saga'

export default function* () {
  yield all([
    fork(watchPlayer)
  ])
}