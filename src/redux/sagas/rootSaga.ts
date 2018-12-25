import { all, fork } from 'redux-saga/effects'

import watchPlayer from './player.saga'
import watchAlbum from './album.saga'

export default function* () {
  yield all([
    fork(watchPlayer),
    fork(watchAlbum)
  ])
}