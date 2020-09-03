// Animatable自定义动画
import { Animated } from 'react-native'
import * as Animatable from 'react-native-animatable'

// musicPlayer页面动画
// disc动画
export const musicPlayerAnime = new Animated.Value(0)
export const musicPlayerCtr = {
  open: Animated.spring(musicPlayerAnime, {
    toValue: 1,
    tension: 40,
    friction: 12,
    useNativeDriver: true
  }),
  close: Animated.spring(musicPlayerAnime, {
    toValue: 0,
    tension: 40,
    friction: 12,
    useNativeDriver: true
  })
}

export const bottomBoxAnime = new Animated.Value(0)
export const bottomBoxCtr = {
  open: Animated.spring(bottomBoxAnime, {
    toValue: 1,
    tension: 12,
    friction: 17,
    useNativeDriver: true
  }),
  close: Animated.spring(bottomBoxAnime, {
    toValue: 0,
    tension: 12,
    friction: 17,
    useNativeDriver: true
  })
}

// playlistModal动画
export const listModalAnime = new Animated.Value(0)
export const listModalCtr = {
  open: Animated.spring(listModalAnime, {
    toValue: 1,
    tension: 80,
    friction: 17,
    useNativeDriver: true
  }),
  close: Animated.spring(listModalAnime, {
    toValue: 0,
    tension: 80,
    friction: 17,
    useNativeDriver: true
  })
}

// authPage切换动画
export const authPageAnime = new Animated.Value(0)
export const authPageCtr = {
  open: Animated.spring(authPageAnime, {
    toValue: 1,
    tension: 40,
    friction: 12,
    useNativeDriver: true
  }),
  close: Animated.spring(authPageAnime, {
    toValue: 0,
    tension: 40,
    friction: 12,
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