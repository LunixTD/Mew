import React, { Component } from 'react'
import {
  StyleSheet,
  View,
  Text,
  Animated
} from 'react-native'

import { deviceWidth } from '../config/styleConfig'

const SCROLL_GAP = 100
const SPEED = 0.025

class ScrollText extends Component<any, any> {
  private scrollAnime: any
  constructor(props: any) {
    super(props)
    this.state = {
      textWidth: 500,
      scroll: false,
      scrollWidth: 0,
      scrollTime: 15000,
      scrollValue: new Animated.Value(0)
    }
  }

  componentDidMount() {
    this.scrollAnime = Animated.loop(
      Animated.timing(this.state.scrollValue, {
        toValue: 1,
        delay: 1000,
        duration: this.state.scrollTime,
        isInteraction: false,
        useNativeDriver: true
      })
    )
  }

  render() {
    const props = this.props
    const state = this.state
    return (
      <Animated.View style={{
        flex: 1,
        width: state.textWidth,
        transform: [{
          translateX: state.scrollValue.interpolate({
            inputRange: [0, 1],
            outputRange: [0, -state.scrollWidth]
          })
        }]
      }}>
        <Text
          style={props.style}
          onLayout={
            ({ nativeEvent }) => {
              if(nativeEvent.layout.width > deviceWidth - 112) {
                this.setState({
                  scroll: true,
                  scrollTime: (nativeEvent.layout.width + SCROLL_GAP) / SPEED,
                  scrollWidth: nativeEvent.layout.width + SCROLL_GAP,
                  textWidth: nativeEvent.layout.width * 2 + SCROLL_GAP
                }, () => {
                  setTimeout(() => {
                    this.scrollAnime.start()
                  }, 2000)
                })
              } else {
                this.state.scrollValue.stopAnimation()
                this.state.scrollValue.setValue(0)
              }
            }
          }
        >
          {props.text}
        </Text>
        {state.scroll ? <Text style={[props.style, { left: state.scrollWidth }]}>{props.text}</Text> : null}
      </Animated.View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  infoTitle: {
    position: 'absolute',
    top: 0,
    color: 'rgba(255,255,255,0.9)',
    fontSize: 18
  },
})

export default ScrollText