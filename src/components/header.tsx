import React, { Component } from 'react'
import {
  StyleSheet,
  View,
  Text,
  TouchableNativeFeedback
} from 'react-native'
import { Dispatch, Action } from 'redux'
import { connect } from 'react-redux'
import { closePlayerBoxAction } from '../redux/actions/player.action'
import LinearGradient from 'react-native-linear-gradient'
import ScrollText from '../components/scrollText'

import IconFont from '../components/icon'
import { deviceSize, statusBarHeight, centering, ICON_SIZE_M } from '../config/styleConfig'

const { width } = deviceSize
interface IProps {
  closePlayerBoxAction: () => Action
}

class Header extends Component<IProps, any> {
  handleBack = () => {
    this.props.closePlayerBoxAction()
  }

  render() {
    return (
      <View style={styles.header}>
        <TouchableNativeFeedback
          onPress={this.handleBack}
          background={TouchableNativeFeedback.SelectableBackgroundBorderless()}
        >
          <View style={styles.icon}>
            <IconFont name="back" size={22} color="#fff" />
          </View>
        </TouchableNativeFeedback>
        <View style={styles.info}>
          <View style={styles.infoContainer}>
            <ScrollText
              style={styles.infoTitle}
              text={'测试的音乐标题标题标题标题标题标题'}
            />
            <Text style={styles.infoAuthor}>{'测试的音乐标题标题标题标题标题标题'}</Text>
          </View>
        </View>
        <TouchableNativeFeedback
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

const styles = StyleSheet.create({
  header: {
    height: 50,
    width: width,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.0001)'
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
    alignItems: 'flex-start',
    overflow: 'hidden',
    backgroundColor: 'rgba(0,0,0,0)'
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
})

function mapDispatchToProps(dispatch: Dispatch<Action>) {
  return {
    closePlayerBoxAction:() => dispatch(closePlayerBoxAction())
  }
}

export default connect(
  null,
  mapDispatchToProps
)(Header)