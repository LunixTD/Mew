import React, { Component } from 'react'
import {
  StyleSheet,
  View,
  Text
} from 'react-native'

import Video from 'react-native-video'

import refService from '../common/js/refService'

class Audio extends Component {
  render() {
    return (
      <Video
        source={this.props.mList[this.props.currentIndex].mSource}
        ref={(ref) => {
          refService.setRefBox('video', ref)
        }}
        rate={1.0}
        volume={1.0}
        resizeMode="cover"
        repeat={false}
        paused={this.props.status === 'pause' ? true : false}      
        style={styles.fillSize}
        playInBackground={true}
        playWhenInactive={true}
        onLoad={this.props.onLoad}
        onProgress={this.props.onProgress}
        onEnd={this.props.onEnd}
      />
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
})

export default Audio