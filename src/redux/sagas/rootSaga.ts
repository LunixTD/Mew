import { all, fork } from 'redux-saga/effects'

import watchPlayer from './player.saga'
import watchAlbum from './album.saga'
import watchCommon from './common.saga'
import watchPlaylist from './playlist.saga'
import watchUserAbout from './user.saga'

export default function* () {
  yield all([
    fork(watchPlayer),
    fork(watchAlbum),
    fork(watchCommon),
    fork(watchPlaylist),
    fork(watchUserAbout)
  ])
}