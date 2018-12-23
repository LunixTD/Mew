import React, { Component } from 'react'
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableNativeFeedback
} from 'react-native'
import { Action, Dispatch } from 'redux'
import { connect } from 'react-redux'
import { oepnPlayerAction } from '../redux/actions/player.action'
import Svg, { Circle } from 'react-native-svg'
import IconFont from '../components/icon'

import { PX_1, deviceSize, THEME_COLOR, centering, filling } from '../config/styleConfig'

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

interface IProps {
  oepnPlayerAction: () => Action
}

class BottomBox extends Component<IProps, any> {
  constructor(props: IProps) {
    super(props)
  }

  onBoxPress = () => {
    this.props.oepnPlayerAction()
  }

  render() {
    return (
      <TouchableNativeFeedback
        onPress={this.onBoxPress}
      >
        <View style={styles.container}>
          <View style={styles.boxLeft}>
            <View>
              <Image style={styles.boxCover} source={require('../../assets/cover/lwa1.jpg')} />
            </View>
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
        </View>
      </TouchableNativeFeedback>
    )
  }
}

const { width } = deviceSize
const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    bottom: 0,
    width: width,
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: PX_1,
    borderTopColor: 'rgba(0,0,0,0.05)',
    backgroundColor: 'rgba(255,255,255,0.95)',
    zIndex: 99,
  },
  // box左边区域
  boxLeft: {
    flexDirection: 'row',
  },
  boxCover: {
    width: 40,
    height: 40,
    borderRadius: 3,
    marginRight: 6,
    marginLeft: 6,
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
  }
})

function mapDispatchToProps(dispatch: Dispatch<Action>) {
  return {
    oepnPlayerAction: () => dispatch(oepnPlayerAction())
  }
}

export default connect(
  null,
  mapDispatchToProps
)(BottomBox)