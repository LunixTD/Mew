// Animatable自定义动画
import { Animated } from 'react-native'
import * as Animatable from 'react-native-animatable'

// musicPlayer页面动画
export const musicPlayerAnime = new Animated.Value(0)
export const musicPlayerCtr = {
  open: Animated.spring(musicPlayerAnime, {
    toValue: 1,
    tension: 80,
    friction: 17,
    useNativeDriver: true
  }),
  close: Animated.spring(musicPlayerAnime, {
    toValue: 0,
    tension: 60,
    friction: 17,
    useNativeDriver: true
  })
}

// scrollPage页面相关动画
// tabIcon动画
export const tabIconAnime: any = Animatable.initializeRegistryWithDefinitions({
  tabIconIn: {
    0: { scaleX: 1, scaleY: 1 },
    1: { scaleX: 1.15, scaleY: 1.15 }
  }
})