import React, { Component } from 'react'
import {
  StyleSheet,
  View,
  TextInput
} from 'react-native'
import Slider from '@react-native-community/slider'
import { Dispatch, Action } from 'redux'
import { connect } from 'react-redux'
import { isSlidingAction, setSliderValueAction, sliderWatcherAction, setSliderValueEndAction } from '../redux/actions/player.action'
import { IPlayerState } from '../config/interfaces'
// import Slider from 'react-native-slider'
import { THEME_COLOR, statusBarHeight, deviceWidth, deviceHeight } from '../config/styleConfig'
import refService from '@common/js/refService'


interface IProps {
  duration: number,
  sliderWatcherAction: () => Action,
  isSlidingAction: (isSliding: boolean) => Action,
  setSliderValueAction: (value: number) => Action,
  setSliderValueEndAction: (value: number) => Action
}

class PlayerSlider extends Component<IProps> {
  private _time: any
  private _slider: any
  private value: number = 0
  private isSliding: boolean = false
  componentDidMount() {
    this.props.sliderWatcherAction()
    refService.setRefBox('time', this._time)
    refService.setRefBox('slider', this._slider)
  }
  
  formatDuration = (time: number) => {
    let min = parseInt(String(time / 60))
    let sec = -(time % 60).toFixed()
    sec = sec === -60 ? 0 : sec
    return (min >= 10 ? min : '0' + min) + ':' + (-sec >= 10 ? -sec : '0' + -sec)
  }

  onValueChange = (value: number) => {
    if (this.isSliding === false) {
      this.props.isSlidingAction(true)
      this.isSliding = true
    }
    if (value !== this.value) {
      this.props.setSliderValueAction(value)
      this.value = value
    }
  }

  onSlidingStart = () => {
    this.props.isSlidingAction(true)
  }

  onSlidingComplete = (value: number) => {
    this.isSliding = false
    this.props.setSliderValueEndAction(value)
  }

  render() {
    console.log('slider渲染')
    return (
      <View style={styles.sliderBox}>
        <TextInput
          underlineColorAndroid='transparent'
          editable={false}
          defaultValue='00:00'
          style={styles.time}
          ref={(el: any) => this._time = el}
        />
        <Slider
          ref={(el: any) => this._slider = el}
          style={styles.slider}
          value={0}
          // step={1/this.props.duration}
          // trackStyle={styles.track}
          // thumbStyle={styles.thumb}
          thumbTintColor={THEME_COLOR}
          minimumTrackTintColor='rgba(211,58,50,0.6)'
          maximumTrackTintColor='rgba(255,255,255,0.3)'
          onValueChange={this.onValueChange}
          // onSlidingStart={this.onSlidingStart}
          onSlidingComplete={this.onSlidingComplete}
        />
        <TextInput
          underlineColorAndroid='transparent'
          editable={false}
          defaultValue={this.formatDuration(this.props.duration)}
          style={styles.time}
        />
      </View>
    )
  }
}
const ctrGroupH = (deviceHeight - 50 - statusBarHeight) * 0.3
const styles = StyleSheet.create({
  // Slider
  sliderBox: {
    flexDirection: 'row',
    height: ctrGroupH * 0.2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  slider: {
    width: deviceWidth * 0.8,
    marginLeft: -7,
    marginRight: -7,
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
    // marginLeft: 2,
    // marginRight: 2,
    marginBottom: -1,
    fontSize: 11,
    color: 'rgba(255, 255, 255, 0.8)',
  }
})

function mapStateToProps(
  {
    player: {
      // currentTime,
      duration
    }
  }: { player: IPlayerState }
) {
  return {
    // currentTime,
    duration
  }
}

function mapDispatchToProps(dispatch: Dispatch<Action>) {
  return {
    sliderWatcherAction: () => dispatch(sliderWatcherAction()),
    isSlidingAction: (isSliding: boolean) => dispatch(isSlidingAction(isSliding)),
    setSliderValueAction: (value: number) => dispatch(setSliderValueAction(value)),
    setSliderValueEndAction: (value: number) => dispatch(setSliderValueEndAction(value))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PlayerSlider)