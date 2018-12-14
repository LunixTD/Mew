import React, { Component } from 'react'
import {
  StyleSheet,
  View,
  Text,
  Image,
  Animated,
  BackHandler
} from 'react-native'
import { Action, Dispatch } from 'redux'
import { connect } from 'react-redux'
import { watchPlayerAction, closePlayerAction } from '../redux/actions/player.action'

import { musicPlayerAnime } from '../config/animeConfig'
import { deviceSize } from '../config/styleConfig'
import { IPlayerState } from '../config/interfaces'

interface IProps {
  playerStatus: boolean,
  watchPlayerAction: () => Action,
  closePlayerAction: () => Action
}

class MusicPlayer extends Component<IProps, any> {
  constructor(props: IProps) {
    super(props)
  }

  componentDidMount() {
    this.props.watchPlayerAction()
  }

  render() {
    return (
      <Animated.View
        style={[styles.container, {
          opacity: musicPlayerAnime.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 1]
          }),
          transform: [{
            translateY: musicPlayerAnime.interpolate({
              inputRange: [0, 1],
              outputRange: [0, -height]
            })
          }]
        }]}
      >
        <TransformBg />
      </Animated.View>
    )
  }
}

class TransformBg extends Component {
  render() {
    return (
      <View style={styles.tranformBg}>
        <Image
          source={require('../../assets/cover/lwa1.jpg')}
          resizeMode='cover'
        />
      </View>
    )
  }
}

const { width, height } = deviceSize
const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: height,
    width: width,
    height: height,
    // backgroundColor: 'blue',
    opacity: 0
  },
  // 动画背景
  tranformBg: {
    position: 'absolute',
    top: 0, bottom: 0, left: 0, right:0,
    
  }
})

function mapStateToProps(
  {
    player: {
      playerStatus
    }
  }: { player: IPlayerState }
) {
  return {
    playerStatus
  }
}

function mapDispatchToProps(dispatch: Dispatch<Action>) {
  return {
    watchPlayerAction: () => dispatch(watchPlayerAction()),
    closePlayerAction: () => dispatch(closePlayerAction())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MusicPlayer)