import React, { Component } from 'react'
import { Dispatch, Action } from 'redux'
import { connect } from 'react-redux'
import { IPlayerState, IPlaylistState } from '../config/interfaces'
import { audioWatcherAction, setDurationAction, setCurrentTimeAction } from '../redux/actions/player.action'
import Video from 'react-native-video'
import refService from '../common/js/refService'
import { getMusicLink } from '../services/api'
import { store } from '../App'

interface IAudio extends IPlaylistState {
  status: 'pause' | 'playing'
  audioWatcherAction: () => Action,
  setDurationAction: (duration: number) => any,
  setCurrentTimeAction: (currentTime: number) => Action
}

class Audio extends Component<IAudio> {
  private _audio: any
  private count: number = 0
  private playingIndex: number = 0
  private sourceUrl: string | undefined = undefined
  componentDidMount() {
    this.props.audioWatcherAction()
  }

  componentWillUpdate(nextProps: any) {
    // console.log(nextProps)
    const musicId = nextProps.playlist[nextProps.playingIndex].id
    this.sourceUrl = getMusicLink(musicId)
  }

  onLoad = (data: any) => {
    this.props.setDurationAction(data.duration)
  }

  onProgress = (data: any) => {
    const { isSliding } = store.getState().player
    this.count++
    if (this.count === 4) {
      if (!isSliding) this.props.setCurrentTimeAction(data.currentTime)
      this.count = 0
    }
  }

  onEnd = () => {
    setTimeout(() => {
      const swiper = refService.getRef('discSwiper')
      swiper.jumpNext()
    }, 200)
  }

  onlayout = () => {
    refService.setRefBox('audio', this._audio)
  }

  render() {
    // let sourceUrl: string | undefined
    // try {
    //   const props = this.props
    //   console.log(props.playlist[props.playingIndex])
    //   sourceUrl = props.playlist[props.playingIndex].sourceUrl
    // } catch (error) {
    //   sourceUrl = undefined
    // }
    
    return (
      this.sourceUrl === undefined ? null : 
      <Video
        source={{uri: this.sourceUrl}}
        ref={(ref) => this._audio = ref}
        rate={1.0}
        volume={1.0}
        muted={false}
        repeat={false}
        paused={this.props.status === 'pause' ? true : false}
        playInBackground={true}
        playWhenInactive={true}
        onLoad={this.onLoad}
        onProgress={this.onProgress}
        onEnd={this.onEnd}
        onLayout={this.onlayout}
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