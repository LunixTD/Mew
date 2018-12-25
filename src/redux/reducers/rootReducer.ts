import { combineReducers } from 'redux'
import player from './player.reducer'
import common from './common.reducer'
import album from './album.reducer'

export default combineReducers({
  player,
  common,
  album
})