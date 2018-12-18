import React, { Component } from 'react'
import {
  StyleSheet
} from 'react-native'
import { connect } from 'react-redux'
import Video from 'react-native-video'
import refService from '../common/js/refService'

class Audio extends Component {
  onLoad = (data: any) => {
    
  }

  onProgress = (data: any) => {
    
  }

  render() {
    return (
      <Video
        source={require('../../assets/music/Locked-Away.mp3')}
        ref={(ref) => {
          refService.setRefBox('video', ref)
        }}
        rate={1.0}
        volume={1.0}
        resizeMode="cover"
        repeat={false}
        // paused={this.props.status === 'pause' ? true : false}
        playInBackground={true}
        playWhenInactive={true}
        onLoad={this.onLoad}
        onProgress={this.onProgress}
        // onEnd={this.onEnd}
      />
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
})

// function 

export default Audio