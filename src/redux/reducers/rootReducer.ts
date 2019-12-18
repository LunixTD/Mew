import { combineReducers } from 'redux'
import player from './player.reducer'
import common from './common.reducer'
import album from './album.reducer'
import playlist from './playlist.reducer'
import user from './user.reducer'

export default combineReducers({
  player,
  common,
  album,
  playlist,
  user
})