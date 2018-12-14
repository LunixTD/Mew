import React, { Component } from 'react'
import {
  StyleSheet,
  View,
  Text,
  Image,
  Animated,
  BackHandler,
  TouchableNativeFeedback
} from 'react-native'
import { Action, Dispatch } from 'redux'
import { connect } from 'react-redux'
import { oepnPlayerAction, closePlayerAction, watchPlayerAction } from '../redux/actions/player.action'
import { store } from '../App'
import Svg, { Circle } from 'react-native-svg'
import IconFont from '../components/icon'
import Header from '../components/header'
import FadeBg from '../components/fadeBg'

import { PX_1, deviceSize, THEME_COLOR, centering, filling, statusBarHeight } from '../config/styleConfig'
import { musicPlayerAnime } from '../config/animeConfig'
import { IPlayerState } from '../config/interfaces'

interface IProps {
  playerStatus: boolean,
  oepnPlayerAction: () => Action,
  closePlayerAction: () => Action,
  watchPlayerAction: () => Action,
}
const { width, height } = deviceSize
const discWidth = width * 0.85
// const discDeltaX = (width - discWidth) * 0.5 - 6
// const discDeltaY = (height - 50 - 6) * 0.14
const discContainerH = (height - 70) * 0.7
const discDeltaX = (width - discWidth) * 0.5
const discDeltaY = (discContainerH - discWidth) * 0.5
const discBoxX = discWidth * 0.5 - 26
const discBoxY = discWidth * 0.5 + 50 + statusBarHeight - 20 - 5
class BottomLinshi extends Component<IProps, any> {
  constructor(props: IProps) {
    super(props)
  }

  componentDidMount() {
    this.props.watchPlayerAction()
    BackHandler.addEventListener('hardwareBackPress', () => {
      const { playerStatus } = store.getState().player
      if(playerStatus) {
        store.dispatch(closePlayerAction())
        return true
      }
    })
  }

  onBoxPress = () => {
    this.props.oepnPlayerAction()
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
        {/* 背景渐变图片 */}
        <FadeBg />
        {/* header */}
        <Animated.View style={[styles.absolutePosition, {
          opacity: musicPlayerAnime.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 1]
          }),
          transform: [{
            translateX: musicPlayerAnime.interpolate({
              inputRange: [0, 1],
              outputRange: [-width, 0]
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
            opacity: musicPlayerAnime.interpolate({
              inputRange: [0, 1],
              outputRange: [1, 0]
            }),
            transform: [{
              translateX: musicPlayerAnime.interpolate({
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
          <View style={styles.discContainer}>
            <Animated.Image
              source={require('../../assets/cover/lwa1.jpg')}
              style={[styles.discCover, {
                transform: [{
                  translateX: musicPlayerAnime.interpolate({
                    inputRange: [0, 1],
                    outputRange: [-discBoxX, discDeltaX]
                  })
                }, {
                  translateY: musicPlayerAnime.interpolate({
                    inputRange: [0, 1],
                    outputRange: [-discBoxY, discDeltaY]
                  })
                }, {
                  scale: musicPlayerAnime.interpolate({
                    inputRange: [0, 1],
                    outputRange: [40 / discWidth, 1]
                  })
                }]
              }]}
            ></Animated.Image>
          </View>
        </View>

      </Animated.View>
    )
  }
}

class PlayCtrBtn extends Component {
  private status: string
  private percentage: number
  
  constructor(props: any) {
    super(props)
    this.status = 'pause'
    this.percentage = 0.68
  }

  render() {
    return (
      <TouchableNativeFeedback
        background={TouchableNativeFeedback.SelectableBackgroundBorderless()}
        
      >
        <View style={[styles.iconConSize, styles.boxControl]}>
          <View style={[styles.iconCtrContainer, this.status === 'pause' ? null : styles.hideBtn ]}>
            <IconFont name="play" size={18} color='rgba(51, 51, 51, 0.8)' />
          </View>
          <View style={[styles.iconCtrContainer, this.status === 'pause' ? styles.hideBtn : null ]}>
            <IconFont name="pause" size={18} color={THEME_COLOR} />
          </View>
          <Svg height="50" width="50" style={[styles.boxControl, styles.circleAngle]}>
            <Circle cx="25" cy="25" r="15" fill="none" stroke={this.status === 'pause' ? 'rgba(51, 51, 51, 0.8)' : 'rgba(51, 51, 51, 0.2)'} strokeWidth="1.5" strokeLinecap="round" />
            <Circle cx="25" cy="25" r="15" fill="none" stroke={THEME_COLOR} strokeWidth="1.5" strokeLinecap="round" strokeDasharray={[2 * Math.PI * 15 * this.percentage, 10000]} 
            // ref={(ref) => this._circle = ref}
            />
          </Svg>
        </View>
      </TouchableNativeFeedback>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    top: height - 50,
    width: width,
    height: height,
    paddingTop: statusBarHeight + 50,
    backgroundColor: 'red'
  },
  absolutePosition: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: width,
    height: 50,
    zIndex: 88
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
    top: 0,
    width: discWidth,
    height: discWidth,
    borderRadius: 3,
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
    height: (height - 70) * 0.7,
    // backgroundColor: 'blue',
    zIndex: 88
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
    oepnPlayerAction: () => dispatch(oepnPlayerAction())
  }
}

export default connect(
  null,
  mapDispatchToProps
)(BottomLinshi)