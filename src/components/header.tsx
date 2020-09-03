import React, { Component } from 'react'
import {
  StyleSheet,
  View,
  Text,
  Animated,
  TouchableNativeFeedback,
  ImageRequireSource,
  RegisteredStyle,
  ViewStyle
} from 'react-native'
import { Dispatch, Action } from 'redux'
import { connect } from 'react-redux'
import { closePlayerBoxAction } from '../redux/actions/player.action'
import navigationService from '../common/js/navigationService'
import LinearGradient from 'react-native-linear-gradient'
import ScrollText from '../components/scrollText'
import { get, forEach } from 'lodash'

import IconFont from '../components/icon'
import { statusBarHeight, centering, ICON_SIZE_M, deviceWidth, THEME_COLOR } from '../config/styleConfig'
import { ITrack, IArtist } from '../config/interfaces'

interface IPlayerHeaderProps {
  title: string,
  author: string,
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
      const props = this.props
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
                text={props.title}
              />
              <Text
                style={styles.infoAuthor}
                numberOfLines={1}
                ellipsizeMode='tail'
              >{`${props.author}`}</Text>
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
  source: string,
  opacity: any
  interactHeight: number
}
export const AlbumHeader = connect(
  null, null
)(
  class AlbumHeader extends Component<IAlbumHeaderProps> {
    shouldComponentUpdate(nextProps: any) {
      if (this.props.source !== nextProps.source) {
        return true
      } else {
        return false
      }
    }

    handleBack = () => {
      navigationService.stackNavigate('back')
    }
  
    handleShare = () => {
      console.log('分享')
    }
  
    render() {
      console.log('album/header渲染')
      return (
        <View style={styles.albumHeader}>
          <Animated.Image
            source={{uri: this.props.source + '?param=50y50'}}
            style={[styles.albumFillSize, {
              opacity: this.props.opacity
            }]}
            blurRadius={4}
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

interface INormalHeader {
  style?: ViewStyle,
  containStatusBar: boolean,
  title: string,
  leftIcon?: string,
  onLeftIconPress?: () => void,
}

export const NormalHeader = class NormalHeader extends Component<INormalHeader> {
  render() {
    const props = this.props
    const statusBar = props.containStatusBar ? styles.hasStatusBar : null
    const headerStyle = get(props, 'style', null) ? props.style : null
    const leftPart = get(props, 'leftIcon', null) ? props.leftIcon : null
    return (
      <View style={[styles.normalHeader, statusBar, headerStyle]}>
        {
          !leftPart ? null : 
          <TouchableNativeFeedback
            background={TouchableNativeFeedback.SelectableBackgroundBorderless()}
            onPress={props.onLeftIconPress}
          >
            <View style={styles.icon}>
              <IconFont name={props.leftIcon} size={26} color="#fff" />
            </View>
          </TouchableNativeFeedback>
        }
        <Text style={styles.normalTitle}>{props.title}</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  playerHeader: {
    height: 50,
    width: deviceWidth,
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
    width: deviceWidth - 112,
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
    top: 1,
    color: 'rgba(255,255,255,0.9)',
    fontSize: 17,
  },
  infoAuthor: {
    position: 'absolute',
    bottom: 1,
    color: 'rgba(255,255,255,0.4)',
    fontSize: 13,
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
    width: deviceWidth,
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
    color: '#fff',
    fontSize: 20
  },
  albumFillSize: {
    position: 'absolute',
    bottom: -20,
    left: 0,
    width: deviceWidth,
    height: deviceWidth,
    zIndex: -99
  },
  // normal
  normalHeader: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: deviceWidth,
    height: 50,
    backgroundColor: THEME_COLOR,
  },
  hasStatusBar: {
    height: statusBarHeight + 50,
    paddingTop: statusBarHeight
  },
  normalTitle: {
    fontSize: 18,
    color: '#fff'
  }
})

function mapDispatchToProps(dispatch: Dispatch<Action>) {
  return {
    closePlayerBoxAction:() => dispatch(closePlayerBoxAction())
  }
}
