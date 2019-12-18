import React, { Component } from 'react'
import {
  StyleSheet,
  View,
  Text,
  Animated,
  TouchableNativeFeedback,
  ImageRequireSource
} from 'react-native'
import { Dispatch, Action } from 'redux'
import { connect } from 'react-redux'
import { closePlayerBoxAction } from '../redux/actions/player.action'
import navigationService from '../common/js/navigationService'
import LinearGradient from 'react-native-linear-gradient'
import ScrollText from '../components/scrollText'

import IconFont from '../components/icon'
import { deviceSize, statusBarHeight, centering, ICON_SIZE_M } from '../config/styleConfig'

const { width } = deviceSize
interface IPlayerHeaderProps {
  closePlayerBoxAction: () => Action
}
export const PlayerHeader = connect(
  null,
  mapDispatchToProps
)(
  class PlayerHeader extends Component<IPlayerHeaderProps, any> {
    handleBack = () => {
      this.props.closePlayerBoxAction()
    }
  
    render() {
      console.log('player/header渲染')
      return (
        <View style={styles.playerHeader}>
          <TouchableNativeFeedback
            onPress={this.handleBack}
            useForeground={TouchableNativeFeedback.canUseNativeForeground()}
            background={TouchableNativeFeedback.SelectableBackgroundBorderless()}
          >
            <View style={styles.icon}>
              <IconFont name="back" size={22} color="#fff" />
            </View>
          </TouchableNativeFeedback>
          <View style={[styles.info, styles.playerInfo]}>
            <View style={styles.infoContainer}>
              <ScrollText
                style={styles.infoTitle}
                text={'测试的音乐标题标题标题标题标题标题'}
              />
              <Text style={styles.infoAuthor}>{'测试的音乐标题标题标题标题标题标题'}</Text>
            </View>
          </View>
          <TouchableNativeFeedback
            useForeground={TouchableNativeFeedback.canUseNativeForeground()}
            background={TouchableNativeFeedback.SelectableBackgroundBorderless()}
          >
            <View style={styles.icon}>
              <IconFont name="share" size={26} color="#fff" />
            </View>
          </TouchableNativeFeedback>
          <View style={styles.line}>
            <LinearGradient
              start={{x: 0.0, y: 0.0}} end={{x: 1.0, y: 0.0}}
              colors={['rgba(255,255,255,0)', 'rgba(255,255,255,0.5)', 'rgba(255,255,255,0)']}
              style={styles.fillSize}
            />
          </View>
        </View>
      )
    }
  }
)
interface IAlbumHeaderProps {
  source: ImageRequireSource,
  opacity: any
  interactHeight: number
}
export const AlbumHeader = connect(
  null, null
)(
  class AlbumHeader extends Component<IAlbumHeaderProps> {
    handleBack = () => {
      navigationService.stackNavigate('back')
    }
  
    handleShare = () => {
      alert('分享')
    }
  
    render() {
      console.log('album/header渲染')
      return (
        <View style={styles.albumHeader}>
          <Animated.Image
            source={this.props.source}
            style={[styles.albumFillSize, {
              opacity: this.props.opacity
            }]}
            blurRadius={100}
          />
          <TouchableNativeFeedback
            onPress={this.handleBack}
            useForeground={TouchableNativeFeedback.canUseNativeForeground()}
            background={TouchableNativeFeedback.SelectableBackgroundBorderless()}
          >
            <View style={styles.icon}>
              <IconFont name="back" size={22} color="#fff" />
            </View>
          </TouchableNativeFeedback>
          <View style={[styles.info, styles.albumInfo]}>
            <View style={styles.infoContainer}>
              <Text style={styles.albumTitle}>歌单</Text>
            </View>
          </View>
          <TouchableNativeFeedback
            useForeground={TouchableNativeFeedback.canUseNativeForeground()}
            background={TouchableNativeFeedback.SelectableBackgroundBorderless()}
          >
            <View style={styles.icon}>
              <IconFont name="share" size={26} color="#fff" />
            </View>
          </TouchableNativeFeedback>
        </View>
      )
    }
  }
)

const styles = StyleSheet.create({
  playerHeader: {
    height: 50,
    width: width,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  icon: {
    flexDirection: 'row',
    ...ICON_SIZE_M,
    ...centering,
    marginLeft: 10,
    marginRight: 10
  },
  // 滚屏标题
  info: {
    width: width - 112,
    height: 50,
    flexDirection: 'column',
    justifyContent: 'center',
    overflow: 'hidden',
    backgroundColor: 'transparent'
  },
  playerInfo: {
    alignItems: 'flex-start',
  },
  infoContainer: {
    height: 38,
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'flex-start',
  },
  infoTitle: {
    position: 'absolute',
    top: 0,
    color: 'rgba(255,255,255,0.9)',
    fontSize: 18
  },
  infoAuthor: {
    position: 'absolute',
    bottom: 0,
    color: 'rgba(255,255,255,0.4)',
    fontSize: 12
  },
  line: {
    position: 'absolute',
    bottom: 0,
    left: 20,
    right: 20,
    height: 1,
  },
  fillSize: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  // album
  albumHeader: {
    position: 'absolute',
    top: 0,
    height: statusBarHeight + 50,
    width: width,
    paddingTop: statusBarHeight,
    paddingBottom: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    overflow: 'hidden',
    zIndex: 10
  },
  albumInfo: {
    alignItems: 'flex-start',
  },
  albumTitle: {
    color: 'rgba(255,255,255,0.9)',
    fontSize: 20
  },
  albumFillSize: {
    position: 'absolute',
    bottom: -20,
    left: 0,
    width: width,
    height: width,
    zIndex: -99
  },
})

function mapDispatchToProps(dispatch: Dispatch<Action>) {
  return {
    closePlayerBoxAction:() => dispatch(closePlayerBoxAction())
  }
}
