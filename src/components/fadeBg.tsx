import React, { Component, Ref } from 'react'
import {
  StyleSheet,
  View,
  Image
} from 'react-native'
import { ImageSourcePropType } from 'react-native'
import { deviceSize } from '../config/styleConfig'

import * as Animatable from 'react-native-animatable'

const fadeAnime: any = Animatable.initializeRegistryWithDefinitions({
  show: {
    0: { opacity: 1 },
    1: { opacity: 1 }
  },
  hide: {
    0: { opacity: 1 },
    1: { opacity: 0 }
  }
})
const { width, height } = deviceSize
let whoIsShowing = 'A'
let num = 0
const sourceArr = [
  require('../../assets/cover/lwa1.jpg'),
  require('../../assets/cover/lwa2.jpg'),
  require('../../assets/cover/lwa3.jpg'),
  require('../../assets/cover/lwa4.jpg')
]
class FadeBg extends Component<any, any> {
  private ImageA: any
  private ImageB: any
  constructor(props: any) {
    super(props)
    this.state = {
      source: require('../../assets/cover/default.jpg'),
      sourceA: null,
      sourceB: null
    }
  }

  componentDidMount() {
    // this.ImageA = this.refs.ImageA.getRef()
    setInterval(() => {
      if (whoIsShowing === 'A') {
        whoIsShowing = 'B'
        this.setState({
          sourceB: sourceArr[num]
        }, () => {
          if (num + 1 === sourceArr.length) {
            num = 0
          } else {
            num++
          }
        })
      } else {
        whoIsShowing = 'A'
        this.setState({
          sourceA: sourceArr[num]
        }, () => {
          if (num + 1 === sourceArr.length) {
            num = 0
          } else {
            num++
          }
        })
      }
    }, 4000)
  }

  onLoad = (name: string) => {
    // if (name === 'A') {
    //   this.ImageA.show()
    //   this.ImageB.hide()
    // } else {
    //   this.ImageB.show()
    //   this.ImageA.hide()
    // }
  }

  render() {
    return (
      <View style={[styles.container, styles.bgStyle]}>
        <FadeImage
          ref={(ref: any) => this.ImageA = ref}
          name='A'
          source={this.state.sourceA || this.state.source} 
          onLoad={this.onLoad}
        />
        <FadeImage
          ref={(ref: any) => this.ImageB = ref}
          name='B' 
          source={this.state.sourceB || this.state.source}
          onLoad={this.onLoad}
        />
      </View>
    )
  }
}

interface ImageProps {
  name: string,
  source: ImageSourcePropType,
  onLoad: (name: string) => any
}

class FadeImage extends Component<ImageProps, any> {
  private fadeRef: any

  shouldComponentUpdate(nextProps: any) {
    if (this.props.name !== whoIsShowing) {
      this.fadeRef.hide()
      return true
    } else {
      this.fadeRef.show()
      return true
    }
  }

  getRef = () => {
    return this.fadeRef
  }

  onLoad = () => {
    this.props.onLoad(this.props.name)
  }

  render() {
    return (
      <Animatable.Image
        ref={(ref: any) => this.fadeRef = ref}
        animation={fadeAnime}
        duration={700}
        easing='linear'
        useNativeDriver={true}
        resizeMode='cover'
        source={this.props.source}
        onLoad={this.onLoad}
        // blurRadius={10}
        style={[styles.bgStyle, whoIsShowing === this.props.name ? styles.showingItem : null]}
      />
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
  showingItem: {
    zIndex: -1
  }
})

export default FadeBg