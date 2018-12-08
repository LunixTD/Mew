// Animatable自定义动画
import { ImageStyle } from 'react-native'
import * as Animatable from 'react-native-animatable'

// scrollPage页面相关动画
// tabIcon动画
export const tabIconAnime = Animatable.initializeRegistryWithDefinitions({
  tabIconIn: {
    0: { scaleX: 1, scaleY: 1 },
    1: { scaleX: 1.15, scaleY: 1.15 }
  }
})