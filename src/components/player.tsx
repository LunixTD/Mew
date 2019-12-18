import React, { Component } from 'react'
import { Dispatch, Action } from 'redux'
import { connect } from 'react-redux'
import { IPlayerState } from '../config/interfaces'
import { audioWatcherAction, setDurationAction, setCurrentTimeAction } from '../redux/actions/player.action'
import Video from 'react-native-video'
import refService from '../common/js/refService'

interface IAudio {
  status: 'pause' | 'playing'
  audioWatcherAction: () => Action,
  setDurationAction: (duration: number) => any,
  setCurrentTimeAction: (currentTime: number) => Action
}

class Audio extends Component<IAudio> {
  private _audio: any
  private count: number = 0
  componentDidMount() {
    refService.setRefBox('audio', this._audio)
    this.props.audioWatcherAction()
  }

  onLoad = (data: any) => {
    this.props.setDurationAction(data.duration)
  }

  onProgress = (data: any) => {
    this.count++
    if (this.count === 4) {
      this.props.setCurrentTimeAction(data.currentTime)
      this.count = 0
    }
  }

  render() {
    return (
      <Video
        source={require('../../assets/music/Locked-Away.mp3')}
        ref={(ref) => this._audio = ref}
        rate={1.0}
        volume={1.0}
        resizeMode="cover"
        repeat={false}
        paused={this.props.status === 'pause' ? true : false}
        playInBackground={true}
        playWhenInactive={true}
        onLoad={this.onLoad}
        onProgress={this.onProgress}
        // onEnd={this.onEnd}
      />
    )
  }
}

function mapStateToProps(
  {
    player: {
      status
    }
  }: { player: IPlayerState }
) {
  return {
    status
  }
}

function mapDispatchToProps(dispatch: Dispatch<Action>) {
  return {
    audioWatcherAction: () => dispatch(audioWatcherAction()),
    setDurationAction: (duration: number) => dispatch(setDurationAction(duration)),
    setCurrentTimeAction: (currentTime: number) => dispatch(setCurrentTimeAction(currentTime))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Audio)