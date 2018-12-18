import React, { Component, Ref } from 'react'
import {
  StyleSheet,
  View,
  Image
} from 'react-native'
import { deviceSize } from '../config/styleConfig'

const { width, height } = deviceSize
let num = 0
const sourceArr = [
  require('../../assets/cover/lwa1.jpg'),
  require('../../assets/cover/lwa2.jpg'),
  require('../../assets/cover/lwa3.jpg'),
  require('../../assets/cover/lwa4.jpg')
]
class FadeBg extends Component<any, any> {
  constructor(props: any) {
    super(props)
    this.state = {
      source: require('../../assets/cover/lwa1.jpg'),
      sourceA: null,
      sourceB: null
    }
  }

  componentDidMount() {
    // setInterval(() => {
    //   this.setState({
    //     sourceA: sourceArr[num]
    //   }, () => {
    //     if (num + 1 === sourceArr.length) {
    //       num = 0
    //     } else {
    //       num++
    //     }
    //   })
    // }, 5000)
  }

  onLoadStart = () => {
    setTimeout(() => {
      this.setState({
        sourceB: this.state.sourceA
      })
    }, 1000)
  }

  render() {
    return (
      <View style={[styles.container, styles.bgStyle]}>
        <Image
          resizeMode='cover'
          source={this.state.sourceB || this.state.source}
          blurRadius={10}
          style={styles.bgStyle}
        />
        <Image
          fadeDuration={700}
          resizeMode='cover'
          source={this.state.sourceA || this.state.source}
          onLoadStart={this.onLoadStart}
          blurRadius={10}
          style={styles.bgStyle}
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
    width: width,
    height: height
  },
  mask: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  },
})

export default FadeBg