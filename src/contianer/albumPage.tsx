import React, { Component, ReactChild } from 'react'
import {
  StyleSheet,
  View,
  ScrollView,
  Animated,
  Image,
  Text,
  TouchableOpacity,
  TouchableNativeFeedback
} from 'react-native'
import { AlbumHeader } from '../components/header'
import IconFont from '../components/icon'

import { IAlbum, ITrack } from '../config/interfaces'
import { BACKGROUND_M, PX_1, deviceSize, centering } from '../config/styleConfig'

const { width, height } = deviceSize

const mListAry = [
  {name: '土豆之歌', author: '土豆'},
  {name: '土豆之歌', author: '土豆'},
  {name: '土豆之歌', author: '土豆'},
  {name: '土豆之歌', author: '土豆'},
  {name: '土豆之歌', author: '土豆'},
  {name: '土豆之歌', author: '土豆'},
  {name: '土豆之歌', author: '土豆'},
  {name: '土豆之歌', author: '土豆'},
  {name: '土豆之歌', author: '土豆'},
  {name: '土豆之歌', author: '土豆'},
]

const cover = require('../../assets/cover/lwa1.jpg')
const albumOtherIcon = [
  require('../../assets/icon/listPlay.png'),
  require('../../assets/icon/collect.png'),
  require('../../assets/icon/infoMore.png')
]

class AlbumInfo extends Component {
  render() {
    return (
      <View style={styles.albumInfo}>
        <Image
          source={require('../../assets/icon/defaultAlbumCover.png')}
          style={[styles.bgCover, {zIndex: -15}]}
        />
        <Image
          source={cover}
          blurRadius={100}
          style={[styles.bgCover, {zIndex: -10}]}
        />
        <View style={styles.infoContent}>
          <View style={styles.infoCover}>
            <Image 
              source={cover}
              resizeMode='cover'
              style={styles.cover}
            />
          </View>
          <View style={styles.infoText}>
            <Text style={styles.albumTitle}>标题标题标题标题标题标题标题标题标题标题</Text>
            <TouchableOpacity style={styles.user}>
              <Image
                source={require('../../assets/user/user.jpg')}
                style={styles.userAvatar}
              />
              <Text style={styles.userName}>我的名字叫土豆 ></Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.albumCtr}>
          <TouchableOpacity style={styles.ctrItem}>
            <IconFont name='album-cmt' size={20} color='white' />
            <Text style={styles.ctrText}>123</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.ctrItem}>
            <IconFont name='album-share' size={20} color='white' />
            <Text style={styles.ctrText}>343</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.ctrItem}>
            <IconFont name='album-dld' size={20} color='white' />
            <Text style={styles.ctrText}>下载</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.ctrItem}>
            <IconFont name='album-multi' size={20} color='white' />
            <Text style={styles.ctrText}>多选</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.listCtr}>
          <TouchableNativeFeedback>
            <View style={styles.playAll}>
              <Image
                source={albumOtherIcon[0]}
                style={styles.playAllIcon}
                resizeMode='cover'
              />
              <Text style={styles.albumText}>播放全部</Text>
              <Text style={styles.textCount}>(共XX首)</Text>
            </View>
          </TouchableNativeFeedback>
          <TouchableNativeFeedback>
            <View style={styles.collect}>
              <Image
                source={albumOtherIcon[1]}
                style={styles.collectIcon}
                resizeMode='cover'
              />
              <Text style={[styles.albumText, styles.textCollect]}>收藏 (4321)</Text>
            </View>
          </TouchableNativeFeedback>
        </View>
      </View> 
    )
  }
}

interface IListItemProps {
  type: 'track' | 'album',
  index: number,
  length: number,
  name: string,
  author?: string,
  trackCount?: number,
  albumName?: string,
  coverImgUrl?: any,
}
export class ListItem extends Component<IListItemProps> {
  private indexStyle: any
  private itemMore: any
  constructor(props: any) {
    super(props)
    switch(this.props.type) {
      case 'track':
        this.indexStyle = styles.trackIndex
        this.itemMore = styles.itemMoreTrack
        break
      case 'album':
        this.indexStyle = styles.albumIndex
        this.itemMore = styles.itemMoreAlbum
        break
    }
  }
  render() {
    const props = this.props
    return (
      <TouchableNativeFeedback>
        <View style={styles.listItem}>
          <View style={[this.indexStyle, styles.flexCenter]}>
            {
              !props.coverImgUrl ?
              <Text style={styles.indexText}>{props.index + 1}</Text> :
              <Image
                style={styles.listImg}
                resizeMode='cover'
                source={require('../../assets/cover/lwa3.jpg')}
              />
            }
            
          </View>
          <View style={[styles.listItem, props.index + 1 === props.length ? null : styles.borderLine]}>
            <View style={styles.itemInfo}>
              <Text style={[styles.albumText, styles.infoTitle]} ellipsizeMode='tail' numberOfLines={1}>{props.name}</Text>
              {
                props.author ?
                <Text style={styles.infoAuthor} ellipsizeMode='tail' numberOfLines={1}>{props.author}</Text> : 
                <Text style={styles.infoAuthor}>{props.trackCount + '首'}</Text>
              }
            </View>
            <TouchableNativeFeedback>
              <View style={[this.itemMore, styles.flexCenter]}>
                <IconFont name='album-more' size={16} color='#aaaaaa' />
              </View>
            </TouchableNativeFeedback>
          </View>
        </View>
      </TouchableNativeFeedback>
    )
  }
}

class AlbumList extends Component<any, any> {
  constructor(props: any) {
    super(props)
    this.state = {
      content: false
    }
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        content: true
      })
    }, 400)
  }

  render() {
    return (
      <View style={styles.albumList}>
        {
          !this.state.content ? null : 
          <View style={styles.list}>
          {
            mListAry.map((item: ITrack, index) => (
              <ListItem
                key={index}
                type='track'
                index={index}
                length={mListAry.length}
                name={item.name}
                author={item.author}
              />
            ))
          }
          </View>
        }
      </View> 
    )
  }
}

class AlbumPage extends Component<any, any> {
  constructor(props: any) {
    super(props)
    this.state = {
      opacity: new Animated.Value(0),
      content: true
    }
  }

  componentDidMount() {
    // this.interactable.snapTo({ index: 1 })
    // InteractionManager.runAfterInteractions(() => {
    //   this.setState({
    //     content: true
    //   })
    // })
  }

  render() {
    return (
      <View style={styles.container}>
        <AlbumHeader
          source={cover}
          opacity={this.state.opacity.interpolate({
            inputRange: [0, albumInfoHeight - 70],
            outputRange: [0, 1]
          })}
          interactHeight={albumInfoHeight - 70}
        />
        <ScrollView
          onScroll={
            Animated.event([{
              nativeEvent: {
                contentOffset: {
                  y: this.state.opacity
                }
              }
            }])
          }
        >
          <AlbumInfo />
          <AlbumList />
        </ScrollView>
      </View>
    )
  }
}

const albumInfoHeight = (height - 50) * 0.5

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BACKGROUND_M,
  },
  flexCenter: {
    flexDirection: 'row',
    ...centering
  },
  albumInfo: {
    flex: 1,
    height: albumInfoHeight + 70,
  },
  albumCtr: {
    width: width,
    height: albumInfoHeight * 0.2,
    // backgroundColor: 'lightgrey',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  ctrItem: {
    flex: 1,
    height: 60,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  ctrImg: {
    width: 20,
    height: 20,
    marginBottom: 3
  },
  ctrText: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.9)',
    marginTop: 3,
  },
  bgCover: {
    position: 'absolute',
    bottom: 30,
    width: width,
    height: width
  },

  infoContent: {
    flex: 1,
    marginTop: 70,
    paddingLeft: width * 0.05,
    paddingRight: width * 0.05,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  infoCover: {
    width: width * 0.35,
    height: width * 0.35,
    marginRight: width * 0.04,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cover: {
    width: width * 0.35,
    height: width * 0.35,
    borderRadius: 2
  },
  infoText: {
    flex: 1,
    height: width * 0.38,
    paddingTop: width * 0.03,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  albumTitle: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 20
  },
  user: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  userAvatar: {
    width: albumInfoHeight / 10,
    height: albumInfoHeight / 10,
    borderRadius: albumInfoHeight / 20,
    marginRight: 10
  },
  userName: {
    color: 'rgba(255,255,255,0.9)',
    fontSize: 14,
  },

  albumList: {
    flex: 1,
    // marginTop: -20,
    paddingBottom: 50,
    backgroundColor: BACKGROUND_M,
  },
  listCtr: {
    height: 50,
    flexDirection: 'row',
    backgroundColor: BACKGROUND_M,
    borderBottomWidth: PX_1,
    borderBottomColor: 'rgba(0,0,0,0.1)',
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    overflow: 'hidden'
  },
  albumText: {
    fontSize: 16,
    color: '#323232'
  },
  textCount: {
    color: 'rgba(0,0,0,0.3)',
    fontSize: 14
  },
  textCollect: {
    color: 'white'
  },

  playAll: {
    flex: 0.65,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  playAllIcon: {
    width: 22,
    height: 22,
    marginLeft: 15,
    marginRight: 15
  },
  collect: {
    flex: 0.35,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e6483c',
  },
  collectIcon: {
    width: 8,
    height: 8,
    marginRight: 5,
    transform: [{
      rotate: '45deg'
    }]
  },

  // 列表元素
  list: {
    flex: 1,
  },
  listItem: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  listImg: {
    width: 52,
    height: 52,
    borderRadius: 2,
  },
  itemAlbumHeight: {
    height: 60
  },
  itemTrackHeight: {
    height: 55
  },
  borderLine: {
    borderBottomWidth: PX_1,
    borderBottomColor: 'rgba(0,0,0,0.1)',
  },
  albumIndex: {
    width: 60,
    height: 60,
    marginLeft: 4,
    marginRight: 6,
  },
  trackIndex: {
    width: 55,
    height: 55,
  },
  indexText: {
    fontSize: 16,
    color: 'rgba(0,0,0,0.3)'
  },
  itemInfo: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'flex-start'
  },
  infoTitle: {
    marginBottom: 1,
  },
  infoAuthor: {
    fontSize: 11,
    color: 'rgba(0,0,0,0.4)',
    marginTop: 1,
  },
  itemMoreAlbum: {
    width: 60,
    height: 60
  },
  itemMoreTrack: {
    width: 55,
    height: 55
  },
  moreIcon: {
    width: 16,
    height: 16
  },
})

export default AlbumPage