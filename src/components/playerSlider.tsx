import React, { Component } from 'react'
import {
  StyleSheet,
  View,
  TextInput
} from 'react-native'
import Slider from 'react-native-slider'
import { deviceSize, THEME_COLOR, statusBarHeight } from '../config/styleConfig'

class playerSlider extends Component {
  private _time: any

  render() {
    return (
      <View style={styles.sliderBox}>
        <TextInput
          underlineColorAndroid='transparent'
          editable={false}
          defaultValue='00:00'
          // defaultValue={this.formatTime(this.state.currentTime)}
          style={styles.time}
          ref={(el: any) => this._time = el}
        />
        <Slider
          style={styles.slider}
          trackStyle={styles.track}
          thumbStyle={styles.thumb}
          minimumTrackTintColor={THEME_COLOR}
          maximumTrackTintColor='rgba(255,255,255,0.3)'
        />
        <TextInput
          underlineColorAndroid='transparent'
          editable={false}
          defaultValue='00:00'
          // defaultValue={this.formatTime(this.state.duration)}
          style={styles.time}
        />
      </View>
    )
  }
}
const { width, height } = deviceSize
const ctrGroupH = (height - 50 - statusBarHeight) * 0.3
const styles = StyleSheet.create({
  // Slider
  sliderBox: {
    flexDirection: 'row',
    height: ctrGroupH * 0.2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  slider: {
    width: width * 0.7,
  },
  track: {
    height: 3,
    borderRadius: 3,
  },
  thumb: {
    width: 16,
    height: 16,
    borderWidth: 6,
    borderColor: 'white',
    borderRadius: 8,
    backgroundColor: THEME_COLOR,
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 2,
    shadowOpacity: 0.35,
  },
  // 时间
  time: {
    marginLeft: 5,
    marginRight: 5,
    marginBottom: -1,
    fontSize: 11,
    color: 'rgba(255, 255, 255, 0.8)',
  }
})

export default playerSlider