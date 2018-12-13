import { combineReducers } from 'redux'
import player from './player.reducer'
import tmp from './tmp.reducer'

export default combineReducers({
  player,
  tmp
})