import React, { Component, Ref } from 'react'
import {
  StyleSheet,
  View,
  Image,
  Animated,
  InteractionManager,
  Easing
} from 'react-native'
import { deviceWidth, deviceHeight } from '../config/styleConfig'
import * as Animatable from 'react-native-animatable'
import { get } from 'lodash'

let num = 0
const sourceArr = [
  require('../../assets/cover/lwa1.jpg'),
  require('../../assets/cover/lwa2.jpg'),
  require('../../assets/cover/lwa3.jpg'),
  require('../../assets/cover/lwa4.jpg')
]
class FadeBg extends Component<any, any> {
  private sourceA: string | undefined
  private sourceB: string | undefined
  private fadeAnime: Animated.CompositeAnimation
  constructor(props: any) {
    super(props)
    this.state = {
      source: require('../../assets/cover/default.jpg'),
      sourceA: null,
      sourceB: null,
      fadeVal: new Animated.Value(0)
    }
    this.sourceA = undefined
    this.sourceB = undefined
    this.fadeAnime = Animated.timing(this.state.fadeVal, {
      toValue: 1,
      easing: Easing.linear,
      duration: 450,
      useNativeDriver: true
    })
  }

  shouldComponentUpdate(nextProps: any) {
    const track = nextProps.playlist[nextProps.playingIndex]
    const picUrl = get(track, 'al.picUrl', '')
    const sourceUrl = picUrl + '?param=100y100'
    if (this.sourceA !== sourceUrl) {
      this.state.fadeVal.setValue(0)
      this.sourceA = sourceUrl
      return true
    }
    if (this.sourceA !== this.state.sourceB) {
      return true
    }
    return false
  }

  onLoad = () => {
    this.fadeAnime.start()
    InteractionManager.runAfterInteractions(() => {
      this.setState({
        sourceB: this.sourceA
      })
    })
  }

  render() {
    console.log(this.state.source)
    return (
      <View style={[styles.container, styles.bgStyle]}>
        <Image
          resizeMode='cover'
          source={this.state.sourceB === null ? this.state.source : {uri: this.state.sourceB}}
          blurRadius={5}
          style={styles.bgStyle}
        />
        <Animated.Image
          resizeMode='cover'
          source={this.sourceA === undefined ? this.state.source : {uri: this.sourceA}}
          onLoad={this.onLoad}
          blurRadius={5}
          style={[styles.bgStyle, {
            opacity: this.state.fadeVal.interpolate({
              inputRange: [0, 1],
              outputRange: [0, 1]
            })
          }]}
        />
        <View style={[styles.bgStyle, styles.mask]}></View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    zIndex: -999
  },
  bgStyle: {
    position: 'absolute',
    top: 0, left: 0,
    width: deviceWidth,
    height: deviceHeight
  },
  mask: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  },
})

export default FadeBg