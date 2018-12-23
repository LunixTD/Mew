import React, { Component } from 'react'
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  TouchableNativeFeedback
} from 'react-native'

import IconFont from '../components/icon'

import * as styleConfig from '../config/styleConfig'

const listItems = [
  {
    itemName: '本地音乐',
    itemIcon: 'localMusic',
    isGap: false
  }, {
    itemName: '最近播放',
    itemIcon: 'history',
    isGap: false
  }, {
    itemName: '下载管理',
    itemIcon: 'downloaded',
    isGap: true
  }, {
    itemName: '我喜欢的音乐',
    itemIcon: 'myFavor',
    isGap: false
  }
]

class UserPage extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.userInfoBox}>
          <View style={styles.infoTop}>
            <Text style={styles.nikeName}>LunixTD</Text>
          </View>
          <View style={styles.infoBottom}>
            <Text style={styles.place}>address</Text>
          </View>
          <View style={styles.avatarBg}>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => alert('点击头像')}
            >
              <Image
                source={require('../../assets/user/user.jpg')}
                style={styles.avatar}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.select}>
          {listItems.map((v, i) => (
            <TouchableNativeFeedback
              key={v.itemName}
            >
              <View style={[styles.item, {
                marginBottom: v.isGap ? 10 : 0
              }]}>
                <View style={[styles.itemCon, {
                  borderColor: '#e5e5e5',
                  borderBottomWidth: i === listItems.length - 1 || v.isGap ? 0 : styleConfig.PX_1,
                }]}>
                  <View style={styles.iconBox}>
                    <IconFont
                      name={v.itemIcon}
                      size={24}
                      color={styleConfig.THEME_COLOR}
                    />
                    <Text style={styles.itemName}>{v.itemName}</Text>
                  </View>
                </View>
              </View>
            </TouchableNativeFeedback>
          ))}
        </View>
      </View>
    )
  }
}

const { width, height } = styleConfig.deviceSize
const avatarW = width * 0.3
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: styleConfig.BACKGROUND_G
  },
  // 用户信息
  userInfoBox: {
    flexDirection: 'column',
    ...styleConfig.centering
  },
  infoTop: {
    width: width,
    height: avatarW * 0.5 + 20,
    backgroundColor: styleConfig.THEME_COLOR,
    paddingLeft: avatarW + 40,
    paddingBottom: 6,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
  },
  nikeName: {
    fontSize: styleConfig.FONT_SIZE_TITLE4,
    fontWeight: 'bold',
    color: styleConfig.FONT_COLOR_W,
    textShadowOffset: { width: 2, height: 2 },
    textShadowColor: 'rgba(0,0,0,0.35)',
    textShadowRadius: 10
  },
  place: {
    fontSize: styleConfig.FONT_SIZE_L,
    color: styleConfig.FONT_COLOR_SS,
  },
  infoBottom: {
    width: width,
    height: avatarW * 0.5 - 20,
    paddingLeft: avatarW + 40,
    paddingTop: 3,
  },
  avatarBg: {
    position: 'absolute',
    top: 0,
    left: 20,
    width: avatarW,
    height: avatarW,
    borderRadius: avatarW / 2,
    backgroundColor: styleConfig.BACKGROUND_G,
    flexDirection: 'row',
    ...styleConfig.centering
  },
  avatar: {
    width: avatarW - 6,
    height: avatarW - 6,
    borderRadius: avatarW / 2,
    overflow: 'hidden'
  },
  // 选项
  select: {
    paddingTop: 15,
  },
  item: {
    paddingLeft: 15,
    backgroundColor: styleConfig.BACKGROUND_M
  },
  itemCon: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingRight: 15,
    paddingTop: 15,
    paddingBottom: 15,
  },
  iconBox: {
    flexDirection: 'row',
    ...styleConfig.centering
  },
  itemName: {
    color: styleConfig.FONT_COLOR_S,
    fontSize: styleConfig.FONT_SIZE_L,
    marginLeft: 15,
    marginRight: 15,
  }
})

export default UserPage