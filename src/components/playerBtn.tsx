import React , { Component } from 'react'
import {
  StyleSheet,
  View,
  Image,
  TouchableWithoutFeedback,
} from 'react-native'
import { deviceSize, statusBarHeight } from '../config/styleConfig'

import { relate_btn_ary, player_btn_ary } from '../config/assetsConfig'

const { width, height } = deviceSize

export class UserCtr extends Component<any, any> {
  constructor(props: any) {
    super(props)
    this.state = {
      love: 'love',
      download: 'download',
      comment: 'noComments'
    }
  }

  getStatus = (icon: string) => {
    switch(icon) {
      case 'love':
        return this.state.love
      case 'download':
        return this.state.download
      case 'comment':
        return this.state.comment
      case 'more':
        return null
      default: return null
    }
  }

  onPress = (icon: string) => {
    switch(icon) {
      case 'love':
        this.setState({ love: 'loved' })
        break
      case 'download':
        this.setState({ download: 'downloaded' })
        break
      case 'comment':
        this.setState({ comment: 'comments' })
        break
      case 'more':
        return null
      default: return null
    }
  }

  render() {
    return (
      <View style={userBtnStyles.ctr}>
        {
          relate_btn_ary.map((item: any, index: number) => (
            <UserBtn
              type='user'
              key={index}
              icon={item.icon}
              imgList={item.imgList}
              status={this.getStatus(item.icon)}
              onPress={this.onPress}
            />
          ))
        }
      </View>
    )
  }
}

export class PlayerCtr extends Component<any, any> {
  constructor(props: any) {
    super(props)
    this.state = {
      mode: 'loop-g',
      play: 'playing'
    }
  }

  getStatus = (icon: string) => {
    switch(icon) {
      case 'mode':
        return this.state.mode
      case 'play':
        return this.state.play
      case 'prev':
      case 'next':
      case 'info':
        return null
      default: return null
    }
  }

  onPress = (icon: string) => {
    switch(icon) {
      case 'mode':
        // this.setState({ love: 'loved' })
        break
      case 'play':
        // this.setState({ download: 'downloaded' })
        break
      case 'comment':
        // this.setState({ comment: 'comments' })
        break
      case 'prev':
        return null
      case 'next':
        return null
      case 'info':
        return null
      default: return null
    }
  }

  render() {
    return (
      <View style={playerBtnStyles.ctr}>
        {
          player_btn_ary.map((item: any, index: number) => (
            <UserBtn
              type='player'
              key={index}
              icon={item.icon}
              imgList={item.imgList}
              status={this.getStatus(item.icon)}
              style={item.icon === 'play' ? playerBtnStyles.btn_play : null}
              onPress={this.onPress}
            />
          ))
        }
      </View>
    )
  }
}

type btnType = 'player' | 'user'
interface IPlayerBtn {
  type: btnType
  icon: string,
  status: string | null,
  imgList: any,
  style?: any,
  onPress: (icon: string) => any
}
class UserBtn extends Component<IPlayerBtn, any> {
  private styles: any
  constructor(props: any) {
    super(props)
    this.state = {
      pressStatus: false
    }
    switch(this.props.type) {
      case 'user':
        this.styles = userBtnStyles
        break
      case 'player':
        this.styles = playerBtnStyles
        break
      default: break
    }
  }

  onPressIn = () => {
    this.setState({ pressStatus: true })
  }

  onPressOut = () => {
    this.setState({ pressStatus: false })
  }

  onPress = (icon: string) => {
    this.props.onPress(icon)
  }

  render() {
    return (
      <TouchableWithoutFeedback
        onPress={() => this.onPress(this.props.icon)}
        onPressIn={this.onPressIn}
        onPressOut={this.onPressOut}
      >
        <View style={this.styles.btn_box}>
        {
          this.props.imgList.map((item: any, index: number) => {
            if (this.props.status !== null) {
              return (
                <Image
                  key={index}
                  style={[this.styles.btn, this.props.status === item.status ? null : this.styles.btn_hide ,item.isPrsImg === this.state.pressStatus ? null : this.styles.btn_hide, this.props.style]}
                  resizeMode='center'
                  source={item.src}
                />
              )
            } else {
              return (
                <Image
                  key={index}
                  style={[this.styles.btn, item.isPrsImg === this.state.pressStatus ? null : this.styles.btn_hide, this.props.style]}
                  resizeMode='center'
                  source={item.src}
                />
              )
            }
          })
        }
        </View>
      </TouchableWithoutFeedback>
    )
  }
}

const btn_group_height = (height - statusBarHeight - 50) * 0.3
const userBtnBoxH = btn_group_height * 0.35
const playerBtnBoxH = btn_group_height * 0.45
const userBtnStyles = StyleSheet.create({
  // 按钮组-用户相关按钮
  ctr: {
    width: width,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingLeft: 40,
    paddingRight: 40,
  },
  btn_box: {
    flex: 1,
    height: userBtnBoxH,
  },
  btn: {
    position: 'absolute',
    left: (width - 80 - userBtnBoxH * relate_btn_ary.length) / 8,
    width: userBtnBoxH,
    height: userBtnBoxH,
  },
  btn_hide: {
    opacity: 0
  }
})

const playerBtnStyles = StyleSheet.create({
  // 按钮组-控制按钮
  ctr: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  btn_box: {
    flex: 1,
    height: playerBtnBoxH
  },
  btn: {
    position: 'absolute',
    width: width / player_btn_ary.length,
    height: width / player_btn_ary.length,
  },
  btn_play: {
    position: 'absolute',
    width: width / 4.4,
    height: width / 4.4,
    top: -(width / 4.4 - width / 5) / 2,
    left: -(width / 4.4 - width / 5) / 2
  },
  btn_hide: {
    opacity: 0
  }
})