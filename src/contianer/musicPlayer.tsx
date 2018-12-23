import React, { Component } from 'react'
import {
  StyleSheet,
  View,
  Text,
  Image,
  Animated,
  TextInput,
  BackHandler,
  TouchableNativeFeedback
} from 'react-native'
import { Action, Dispatch } from 'redux'
import { connect } from 'react-redux'
import { openPlayerBoxAction, closePlayerBoxAction, watchPlayerBoxAction, changePlayerStatusAction } from '../redux/actions/player.action'
import { store } from '../App'
import Svg, { Circle } from 'react-native-svg'
import IconFont from '../components/icon'

import Audio from '../components/player'
import Header from '../components/header'
import FadeBg from '../components/fadeBg'
import Banner from '../components/banner'
import PlayerController from './playerController'

import { PX_1, deviceSize, THEME_COLOR, centering, filling, statusBarHeight } from '../config/styleConfig'
import { musicPlayerAnime, bottomBoxAnime } from '../config/animeConfig'
import { IPlayerState } from '../config/interfaces'
import refService from '../common/js/refService';

interface IProps {
  // playerStatus: boolean,
  duration: number,
  openPlayerBoxAction: () => Action,
  // closePlayerBoxAction: () => Action,
  watchPlayerBoxAction: () => Action,
}
const { width, height } = deviceSize
const discWidth = width * 0.85
const discContainerH = (height - 50 - statusBarHeight) * 0.7
const ctrGroupH = (height - 50 - statusBarHeight) * 0.3
const discTop = (discContainerH - width) * 0.5
const discDeltaX = (width - discWidth) * 0.5
const discDeltaY = (discContainerH - discWidth) * 0.5
const discBoxX = width * 0.5 - 26
const discBoxY = width * 0.5 + discTop + statusBarHeight +25

const banner_list = [
  require('../../assets/cover/lwa1.jpg'),
  require('../../assets/cover/lwa2.jpg'),
  require('../../assets/cover/lwa3.jpg'),
  require('../../assets/cover/lwa4.jpg')
]

const banner_config = {
  loop: true,
  autoplay: false,
  horizontal: true,
  style: {
    width: width,
    height: width
  }
}

class BottomLinshi extends Component<IProps, any> {
  constructor(props: IProps) {
    super(props)
  }

  shouldComponentUpdate() {
    return false
  }

  componentDidMount() {
    this.props.watchPlayerBoxAction()
    BackHandler.addEventListener('hardwareBackPress', () => {
      const { playerBoxStatus } = store.getState().player
      if(playerBoxStatus) {
        store.dispatch(closePlayerBoxAction())
        return true
      }
    })
  }

  onBoxPress = () => {
    this.props.openPlayerBoxAction()
  }

  renderBanner = () => {
    return (
      <Banner config={banner_config}>
      {
        banner_list.map((item, index) => (
          <View key={index} style={styles.swiperItem}>
            <Image style={styles.swiperImg} source={item} resizeMode='cover'/>
          </View>
        ))
      }
      </Banner>
    )
  }

  render() {
    console.log('player页面渲染')
    return (
      <Animated.View
        style={[styles.container, {
          transform: [{
            translateY: musicPlayerAnime.interpolate({
              inputRange: [0, 1],
              outputRange: [0, -height + 50]
            })
          }]
        }]}
      >
        {/* 播放器 */}
        <Audio />
        {/* 背景渐变图片 */}
        <Animated.View style={[filling, {
          opacity: bottomBoxAnime.interpolate({
            inputRange: [0, 0.8, 1],
            outputRange: [0, 0.5, 1]
          }),
        }]}>
          <FadeBg />
        </Animated.View>
        {/* header */}
        <Animated.View style={[styles.absolutePosition, {
          opacity: bottomBoxAnime.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 1]
          }),
          transform: [{
            translateX: bottomBoxAnime.interpolate({
              inputRange: [0, 1],
              outputRange: [0, width]
            })
          }]
        }]}>
          <Header />
        </Animated.View>
        
        {/* bottomBox */}
        <TouchableNativeFeedback
          onPress={this.onBoxPress}
        >
          <Animated.View style={[styles.boxContainer, {
            opacity: bottomBoxAnime.interpolate({
              inputRange: [0, 0.8, 1],
              outputRange: [1, 0.05, 0]
            }),
            transform: [{
              translateX: bottomBoxAnime.interpolate({
                inputRange: [0, 1],
                outputRange: [0, width]
              })
            }]
          }]}>
            <View style={styles.boxLeft}>
              <View style={styles.coverBox}></View>
              <View style={styles.boxInfo}>
                <Text style={styles.title}>啦啦啦啦啦啦啦</Text>
                <Text style={styles.author}>土豆</Text>
              </View>
            </View>

            <View style={styles.boxRight}>
              <PlayCtrBtn />
              <TouchableNativeFeedback
                background={TouchableNativeFeedback.SelectableBackgroundBorderless()}
              >
                <View style={[styles.iconConSize, styles.boxControl]}>
                  <IconFont name="list" size={23} color={THEME_COLOR} />
                </View>
              </TouchableNativeFeedback>
            </View>
          </Animated.View>
        </TouchableNativeFeedback>
        {/* disc */}
        <View style={styles.discContainer}>
          <Animated.View
            style={[styles.discCover, {
              transform: [{
                translateX: musicPlayerAnime.interpolate({
                  inputRange: [0, 1],
                  outputRange: [-discBoxX, 0]
                })
              }, {
                translateY: musicPlayerAnime.interpolate({
                  inputRange: [0, 1],
                  outputRange: [-discBoxY, 0]
                })
              }, {
                scale: musicPlayerAnime.interpolate({
                  inputRange: [0, 1],
                  outputRange: [40 / discWidth, 1]
                })
              }]
            }]}
          >
            {this.renderBanner()}
          </Animated.View>
        </View>
        {/* 用户相关操作控件 */}
        <PlayerController />
        
      </Animated.View>
    )
  }
}
type PlayerStatus = 'playing' | 'pause'
const PlayCtrBtn = connect(
  ({ player: { status } }: {player: IPlayerState}) => ({ status }),
  (dispatch) => ({
    changePlayerStatusAction: (status: PlayerStatus) => dispatch(changePlayerStatusAction(status))
  })
) (
  class PlayCtrBtn extends Component<any> {
    private _circle: any
  
    constructor(props: any) {
      super(props)
    }
  
    componentDidMount() {
      refService.setRefBox('circle', this._circle)
    }
  
    onPress = () => {
      if (this.props.status === 'pause') {
        this.props.changePlayerStatusAction('playing')
      } else {
        this.props.changePlayerStatusAction('pause')
      }
    }

    render() {
      return (
        <TouchableNativeFeedback
          onPress={this.onPress}
          background={TouchableNativeFeedback.SelectableBackgroundBorderless()}
        >
          <View style={[styles.iconConSize, styles.boxControl]}>
            <View style={[styles.iconCtrContainer, this.props.status === 'pause' ? null : styles.hideBtn ]}>
              <IconFont name="play" size={18} color='rgba(51, 51, 51, 0.8)' />
            </View>
            <View style={[styles.iconCtrContainer, this.props.status === 'pause' ? styles.hideBtn : null ]}>
              <IconFont name="pause" size={18} color={THEME_COLOR} />
            </View>
            <Svg height="50" width="50" style={[styles.boxControl, styles.circleAngle]}>
              <Circle cx="25" cy="25" r="15" fill="none" stroke={this.props.status === 'pause' ? 'rgba(51, 51, 51, 0.8)' : 'rgba(51, 51, 51, 0.2)'} strokeWidth="1.5" strokeLinecap="round" />
              <Circle cx="25" cy="25" r="15" fill="none" stroke={THEME_COLOR} strokeWidth="1.5" strokeLinecap="round" strokeDasharray={[2 * Math.PI * 15 * 0, 10000]} 
              ref={(ref) => this._circle = ref}
              />
            </Svg>
          </View>
        </TouchableNativeFeedback>
      )
    }
  }
)


const discContainerHStatus = discContainerH >= width
const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    top: height - 50,
    width: width,
    height: height,
    paddingTop: statusBarHeight + 50,
    backgroundColor: 'transparent',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  absolutePosition: {
    position: 'absolute',
    width: width,
    top: statusBarHeight,
    left: -width,
    height: 50,
    flexDirection: 'row',
    ...centering,
    backgroundColor: 'rgba(0,0,0,0.005)',
    zIndex: 8
  },
  boxContainer: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: width,
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: PX_1,
    borderTopColor: 'rgba(0,0,0,0.05)',
    backgroundColor: 'rgba(255,255,255,0.95)',
    zIndex: 8,
  },
  // box左边区域
  boxLeft: {
    flexDirection: 'row',
  },
  coverBox: {
    width: 40,
    height: 40,
    marginRight: 6,
    marginLeft: 6,
  },
  discCover: {
    position: 'absolute',
    left: 0,
    top: discContainerHStatus ? discTop : 0,
    width: width,
    height: width,
    overflow: 'hidden'
  },
  boxInfo: {
    justifyContent: 'space-around'
  },
  title: {
    color: '#444444'
  },
  author: {
    color: '#888888',
    fontSize: 12
  },
  // box右边区域
  boxRight: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  iconConSize: {
    width: 50,
    height: 50,
  },
  circleAngle: {
    transform: [{
      rotate: '-90deg'
    }]
  },
  boxControl: {
    flexDirection: 'row',
    ...centering
  },
  hideBtn: {
    opacity: 0
  },
  iconCtrContainer: {
    ...centering,
    ...filling
  },
  // Disc
  discContainer: {
    position: 'relative',
    width: width,
    height: discContainerHStatus ? discContainerH : width,
    // backgroundColor: 'blue',
    zIndex: 88
  },
  swiperItem: {
    width: width,
    height: width,
    flexDirection: 'row',
    ...centering
  },
  swiperImg: {
    width: discWidth,
    height: discWidth,
    borderRadius: 3,
  }
})

function mapStateToProps(
  {
    player: {
      duration
    }
  }: { player: IPlayerState }
) {
  return {
    duration
  }
}

function mapDispatchToProps(dispatch: Dispatch<Action>) {
  return {
    watchPlayerBoxAction: () => dispatch(watchPlayerBoxAction()),
    openPlayerBoxAction: () => dispatch(openPlayerBoxAction())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BottomLinshi)