import { combineReducers } from 'redux'
import player from './player.reducer'
import common from './common.reducer'

export default combineReducers({
  player,
  common
})