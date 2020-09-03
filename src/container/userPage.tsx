import React, { Component } from 'react'
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  TouchableNativeFeedback,
  TouchableWithoutFeedback,
  InteractionManager,
  Animated,
  ScrollView,
  NativeModules
} from 'react-native'
import { Dispatch, Action } from 'redux'
import { connect } from 'react-redux'
import navigationService from '@common/js/navigationService'
import { getUserAlbumAction, getAlbumInfoAction } from '@redux/actions/album.action'

import { ListItem } from './albumPage'
import IconFont from '@components/icon'

import { IAlbumState, IAlbum } from '@config/interfaces'
import { PX_1, THEME_COLOR, deviceWidth, BACKGROUND_G, centering, FONT_SIZE_TITLE4, FONT_COLOR_W, FONT_SIZE_L, FONT_COLOR_SS, BACKGROUND_M, FONT_COLOR_S, FONT_SIZE_M, musicBoxH, GAP_COLOR_M } from '../config/styleConfig';

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
    isGap: true
  }
]

const arrowAnime = new Animated.Value(0)
const arrowCtr = {
  open: Animated.spring(arrowAnime, {
    toValue: 0,
    tension: 80,
    friction: 12,
    useNativeDriver: true
  }),
  close: Animated.spring(arrowAnime, {
    toValue: 1,
    tension: 80,
    friction: 12,
    useNativeDriver: true
  }),
}

interface IUserPageProps {
  getUserAlbumAction: () => Action
}
class UserPage extends Component<IUserPageProps, any> {
  constructor(props: any) {
    super(props)
    this.state = {
      albumBoxStatus: true
    }
  }

  componentDidMount() {
    this.props.getUserAlbumAction()
  }

  handleAlbumBoxTouch = () => {
    if (this.state.albumBoxStatus) {
      arrowCtr.close.start()
      this.setState({
        albumBoxStatus: false
      })
    } else {
      arrowCtr.open.start()
      this.setState({
        albumBoxStatus: true
      })
    }
  }

  handleConfiPress = () => {
    console.log('配置歌单')
  }

  render() {
    console.log('userPage渲染')
    return (
      <ScrollView style={styles.container}>
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
              onPress={() => console.log('点击头像')}
            >
              <Image
                source={require('@assets/user/user.jpg')}
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
                  borderColor: GAP_COLOR_M,
                  borderBottomWidth: i === listItems.length - 1 || v.isGap ? 0 : PX_1,
                }]}>
                  <View style={styles.iconBox}>
                    <IconFont
                      name={v.itemIcon}
                      size={24}
                      color={THEME_COLOR}
                    />
                    <Text style={styles.itemName}>{v.itemName}</Text>
                  </View>
                </View>
              </View>
            </TouchableNativeFeedback>
          ))}
        </View>
        <TouchableWithoutFeedback
          onPress={this.handleAlbumBoxTouch}
          style={styles.albumBox}
        >
          <View style={styles.switch}>
            <View style={styles.boxLeft}>
              <Animated.View
                style={{
                  transform: [{
                    rotate: arrowAnime.interpolate({
                      inputRange: [0, 1],
                      outputRange: ['0deg', '-90deg']
                    })
                  }]
                }}
              >
                <IconFont
                  style={styles.iconLeft}
                  name='album-arrow'
                  size={18}
                  color='white'
                />
              </Animated.View>
              <Text style={styles.albumText}>创建的歌单</Text>
              <Text style={styles.albumText}>(num)</Text>
            </View>
            <TouchableWithoutFeedback
              onPress={this.handleConfiPress}
            >
              <IconFont
                style={styles.iconRight}
                name='album-config'
                size={18}
                color='white'
              />
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
        {
          !this.state.albumBoxStatus ? null : <AlbumList />
        }
      </ScrollView>
    )
  }
}

const AlbumList = connect(
  ({ album: { userAlbum } }: { album: IAlbumState }) => ({ userAlbum }),
  (dispatch) => {
    return {
      getAlbumInfoAction: (album: IAlbum) => dispatch(getAlbumInfoAction(album)),
      // stackNavigateTo: (screen: String, params: any) => dispatch(stackNavigateTo(screen, params))
    }
  }
)(
  class AlbumList extends Component<any> {
    onItemPress = (album: IAlbum) => {
      this.props.getAlbumInfoAction(album)
      // this.props.stackNavigateTo('AlbumPage', album)
      // navigationService.stackNavigate('AlbumPage', { album })
    }

    render() {
      const props = this.props
      const albumListLength = props.userAlbum.length
      return (
        <View style={styles.albumContainer}>
          {
            albumListLength <= 0 ? null : 
            props.userAlbum.map((item: IAlbum, index: number) => (
              <ListItem
                key={index}
                type='album'
                index={index}
                length={albumListLength}
                onItemPress={() => this.onItemPress(item)}
                {...item}
              />
            ))
          }
        </View>
      )
    }
  }
)

const avatarW = deviceWidth * 0.3
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BACKGROUND_G
  },
  // 用户信息
  userInfoBox: {
    flexDirection: 'column',
    ...centering
  },
  infoTop: {
    width: deviceWidth,
    height: avatarW * 0.5 + 20,
    backgroundColor: THEME_COLOR,
    paddingLeft: avatarW + 40,
    paddingBottom: 6,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
  },
  nikeName: {
    fontSize: FONT_SIZE_TITLE4,
    fontWeight: 'bold',
    color: FONT_COLOR_W,
    textShadowOffset: { width: 2, height: 2 },
    textShadowColor: 'rgba(0,0,0,0.35)',
    textShadowRadius: 10
  },
  place: {
    fontSize: FONT_SIZE_L,
    color: FONT_COLOR_SS,
  },
  infoBottom: {
    width: deviceWidth,
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
    backgroundColor: BACKGROUND_G,
    flexDirection: 'row',
    ...centering
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
    backgroundColor: BACKGROUND_M
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
    ...centering
  },
  itemName: {
    color: FONT_COLOR_S,
    fontSize: FONT_SIZE_L,
    marginLeft: 15,
    marginRight: 15,
  },
  // 歌单列表
  albumBox: {
    flex: 1,
  },
  switch: {
    width: deviceWidth,
    backgroundColor: THEME_COLOR,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop:5,
    paddingBottom: 5,
    
  },
  boxLeft: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  iconLeft: {
    paddingLeft: 5,
    paddingRight: 5
  },
  iconRight: {
    marginRight: 10,
  },
  albumText: {
    fontSize: FONT_SIZE_M,
    color: 'white'
  },
  albumContainer: {
    flex: 1,
    marginBottom: musicBoxH + PX_1,
    backgroundColor: BACKGROUND_M
  },
})

function mapDispatchToProps(dispatch: Dispatch<Action>) {
  return {
    getUserAlbumAction: () => dispatch(getUserAlbumAction())
  }
}

export default connect(
  null,
  mapDispatchToProps
)(UserPage)