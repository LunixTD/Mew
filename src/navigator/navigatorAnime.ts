import { Animated, Easing } from 'react-native'

export const modalAnime = () => ({
  transitionSpec: {
    duration: 750,
    easing: Easing.out(Easing.poly(4)),
    timing: Animated.timing,
    useNativeDriver: true,
  },
  screenInterpolator: (sceneProps: any) => {
    const {position, scene} = sceneProps
    const {index} = scene
    const inputRange = [index - 1, index]
    const opacity = position.interpolate({
        inputRange,
        outputRange: [0, 1],
    })
    const scale = position.interpolate({
        inputRange,
        outputRange: [0.9, 1]
    })

    return {
        opacity,
        transform: [
            {scale}
        ]
    }
  } 
})