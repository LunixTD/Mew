import { BackHandler } from "react-native";
import { store } from '../../App'
import { closePlayerAction } from '../../redux/actions/player.action'

BackHandler.addEventListener('hardwareBackPress', () => {
  const { playerStatus } = store.getState().player
  if (playerStatus) {
    store.dispatch(closePlayerAction())
    return true
  }
})