import React, { Component, ReactChild } from 'react'
import {
  StyleSheet,
  View,
  ScrollView,
  Animated,
  Image,
  Text,
  findNodeHandle,
  InteractionManager,
  TouchableOpacity,
  TouchableNativeFeedback,
  FlatList,
  requireNativeComponent,
  NativeModules,
  DeviceEventEmitter
} from 'react-native'

import { Dispatch, Action } from 'redux'
import { connect } from 'react-redux'
import { putAlbumToPlaylistAction } from '../redux/actions/playlist.action'
import { NavigationParams } from 'react-navigation'
import { BlurView } from 'react-native-blur'
import { AlbumHeader } from '../components/header'
import IconFont from '../components/icon'

import { IAlbum, ITrack, IAlbumState, IAlbumInfo } from '../config/interfaces'
import { BACKGROUND_M, PX_1, centering, statusBarHeight, deviceWidth, deviceHeight } from '../config/styleConfig'
import { get } from 'lodash'

var RCTCusListView = requireNativeComponent('RCTCusListView')
var RCTRecycleView = requireNativeComponent('RCTRecycleView')
var RCTCusScrollView = requireNativeComponent('RCTCusScrollView')
var RCTCusViewGroup = requireNativeComponent('RCTCusViewGroup')
var RCTCusLinearLayout = requireNativeComponent('RCTCusLinearLayout')

// const mListAry = [
//   {name: '土豆之歌', author: '土豆'},
//   {name: '土豆之歌', author: '土豆'},
//   {name: '土豆之歌', author: '土豆'},
//   {name: '土豆之歌', author: '土豆'},
//   {name: '土豆之歌', author: '土豆'},
//   {name: '土豆之歌', author: '土豆'},
//   {name: '土豆之歌', author: '土豆'},
//   {name: '土豆之歌', author: '土豆'},
//   {name: '土豆之歌', author: '土豆'},
//   {name: '土豆之歌', author: '土豆'},
// ]

// const albumOtherIcon = [
//   require('../../assets/icon/listPlay.png'),
//   require('../../assets/icon/collect.png'),
//   require('../../assets/icon/infoMore.png')
// ]
// const AlbumCtr = connect(
//   mapStateToProps,
//   null
// ) (
//   class AlbumCtr extends Component<IAlbumListProps, any> {
//     private albumInfo: any
//     constructor(props: any) {
//       super(props)
//       this.albumInfo = {}
//     }

//     componentWillReceiveProps(nextProps: any) {
//       this.albumInfo = nextProps.albumInfo
//     }

//     render() {
//       const { shareCount, trackCount, commentCount, cloudTrackCount } = this.albumInfo
//       return (
//         <View>
//           <View style={styles.albumCtr}>
//             <TouchableOpacity style={styles.ctrItem}>
//               <IconFont name='album-cmt' size={20} color='white' />
//               <Text style={styles.ctrText}>{commentCount === ( 0 || undefined ) ? '评论' : commentCount}</Text>
//             </TouchableOpacity>
//             <TouchableOpacity style={styles.ctrItem}>
//               <IconFont name='album-share' size={20} color='white' />
//               <Text style={styles.ctrText}>{shareCount === ( 0 || undefined ) ? '分享' : shareCount}</Text>
//             </TouchableOpacity>
//             <TouchableOpacity style={styles.ctrItem}>
//               <IconFont name='album-dld' size={20} color='white' />
//               <Text style={styles.ctrText}>下载</Text>
//             </TouchableOpacity>
//             <TouchableOpacity style={styles.ctrItem}>
//               <IconFont name='album-multi' size={20} color='white' />
//               <Text style={styles.ctrText}>多选</Text>
//             </TouchableOpacity>
//           </View>
            
//           <View style={styles.listCtr}>
//             <TouchableNativeFeedback>
//               <View style={styles.playAll}>
//                 <Image
//                   source={albumOtherIcon[0]}
//                   style={styles.playAllIcon}
//                   resizeMode='cover'
//                 />
//                 <Text style={styles.albumText}>播放全部</Text>
//                 <Text style={styles.textCount}>(共{trackCount}首)</Text>
//               </View>
//             </TouchableNativeFeedback>
//             <TouchableNativeFeedback>
//               <View style={styles.collect}>
//                 <Image
//                   source={albumOtherIcon[1]}
//                   style={styles.collectIcon}
//                   resizeMode='cover'
//                 />
//                 <Text style={[styles.albumText, styles.textCollect]}>收藏 ({cloudTrackCount})</Text>
//               </View>
//             </TouchableNativeFeedback>
//           </View>
//         </View>
//       )
//     }
//   }
// )


// interface IAlbumInfoProps {
//   album: IAlbum
// }
// class AlbumInfo extends Component<IAlbumInfoProps, any> {
//   private backgroundImage: any
//   constructor(props: IAlbumInfoProps) {
//     super(props)
//     this.state = {
//       viewRef: 0
//     }
//   }

//   imgLoaded = () => {
//     this.setState({
//       viewRef: findNodeHandle(this.backgroundImage)
//     })
//   }

//   render() {
//     const props = this.props
//     const { name, coverImgUrl, creator } = props.album
//     return (
//       <View style={styles.albumInfo}>
//         {/* <Image
//           source={require('../../assets/icon/defaultAlbumCover.png')}
//           style={[styles.bgCover, {zIndex: -15}]}
//         /> */}
//         <Image
//           ref={(ref) => { this.backgroundImage = ref }}
//           source={{uri: coverImgUrl}}
//           // loadingIndicatorSource={require('../../assets/icon/defaultAlbumCover.png')}
//           // blurRadius={100}
//           style={[styles.bgCover, {zIndex: -10}]}
//           fadeDuration={0}
//           // onLoadEnd={this.imgLoaded}
//         />
        
//         {/* <BlurView
//           style={[styles.bgCover, {zIndex: -1}]}
//           viewRef={this.state.viewRef}
//           blurType='light'
//           blurAmount={100}
//         /> */}

//         <View style={styles.infoContent}>
//           <View style={styles.infoCover}>
//             <Image 
//               source={{uri: coverImgUrl}}
//               resizeMode='cover'
//               style={styles.cover}
//               fadeDuration={0}
//             />
//           </View>
//           <View style={styles.infoText}>
//             <Text style={styles.albumTitle}>{name}</Text>
//             <TouchableOpacity style={styles.user}>
//               <Image
//                 source={{uri: creator.avatarUrl + '?param=100y100'} || require('../../assets/user/user.jpg')}
//                 style={styles.userAvatar}
//               />
//               <Text style={styles.userName}>{creator.nickname} ></Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//         <AlbumCtr />
//       </View> 
//     )
//   }
// }

var nativeModule = NativeModules.OpenNativeModule;

interface IListItemProps {
  type: 'track' | 'album',
  index: number,
  length: number,
  name: string,
  author?: string,
  trackCount?: number
  coverImgUrl?: any,
  onItemPress: () => any
}
export class ListItem extends Component<IListItemProps> {
  private indexStyle: any
  private itemMore: any
  private itemH: any
  constructor(props: any) {
    super(props)
    switch(this.props.type) {
      case 'track':
        this.indexStyle = styles.trackIndex
        this.itemMore = styles.itemMoreTrack
        this.itemH = styles.itemTrackHeight
        break
      case 'album':
        this.indexStyle = styles.albumIndex
        this.itemMore = styles.itemMoreAlbum
        this.itemH = styles.itemAlbumHeight
        break
    }
  }

  render() {
    const props = this.props
    return (
      <TouchableNativeFeedback
        onPress={props.onItemPress}
      >
        <View style={[styles.listItem]}>
          <View style={[this.indexStyle, styles.flexCenter]}>
            {
              !props.coverImgUrl ?
              <Text style={styles.indexText}>{props.index + 1}</Text> : 
              <Image
                style={styles.listImg}
                resizeMode='cover'
                source={{uri: props.coverImgUrl + '?param=300y300'}}
              />
            }
          </View>
          <View style={[styles.listItem, this.itemH, props.index + 1 === props.length ? null : styles.borderLine]}>
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

// interface IAlbumListProps {
//   albumInfo: IAlbumInfo
// }
// const AlbumList = connect(
//   mapStateToProps,
//   null
// ) (
//   class AlbumList extends Component<IAlbumListProps, any> {
//     private tracks: ITrack[]
//     constructor(props: any) {
//       super(props)
//       this.tracks = []
//     }

//     componentWillReceiveProps(nextProps: any) {
//       this.tracks = nextProps.albumInfo.tracks
//       // console.log(this.tracks)
//     }

//     _keyExtractor = (item: any) => item.id + ''

//     render() {
//       const tracksLength = this.tracks.length
//       return (
//         <View style={styles.albumList}>
//           {
//             tracksLength === 0 ? null : 
//             // <ScrollView style={styles.list}>
//             // {
//               // <RecyclerviewList
//               //   style={{flex: 1}}
//               //   dataSource={dataSource}
//               //   itemAnimatorEnabled={false}
//               //   renderItem={(item: ITrack, index: number) => (
//               //     <ListItem
//               //       type='track'
//               //       index={index}
//               //       length={this.tracks.length}
//               //       onItemPress={this.onItemPress}
//               //       {...item}
//               //     />
//               //   )}
//               // />
//               <RCTCusListView
//                 ref='RCTCusListView'
//                 data={JSON.stringify(this.tracks)}
//                 // tracksLength * ( 55 + PX_1)
//                 style={{height: tracksLength * ( 55 + PX_1), width: deviceWidth}}
//               >
//               </RCTCusListView>
              
//               // this.tracks.map((item: ITrack, index: number) => (
//               //   <ListItem
//               //     key={index}
//               //     type='track'
//               //     index={10}
//               //     length={this.tracks.length}
//               //     onItemPress={this.onItemPress}
//               //     {...item}
//               //   />
//               // ))
//               // <FlatList
//               //   data={this.tracks}
//               //   initialNumToRender={20}
//               //   keyExtractor={this._keyExtractor}
//               //   getItemLayout={(data, index) => (
//               //     {length: 55, offset: 55 * index, index}
//               //   )}
//               //   renderItem={({item, index}) => (
//               //     <ListItem
//               //       type='track'
//               //       index={index}
//               //       length={this.tracks.length}
//               //       onItemPress={this.onItemPress}
//               //       {...item}
//               //     />
//               //   )}
//               // />
//               // <NativeLargeList
//               //   data={[{items: this.tracks}]}
//               //   heightForIndexPath={() => 55}
//               //   renderIndexPath={(item:any) => (
//               //     <ListItem
//               //       type='track'
//               //       index={10}
//               //       length={this.tracks.length}
//               //       onItemPress={this.onItemPress}
//               //       {...item}
//               //     />
//               //   )}
//               // />
//             // }
//             // </ScrollView>
//           }
//         </View>
//       )
//     }
//   }
// )

interface IAlbumPage {
  // albumInfo: IAlbumInfo,
  navigation: NavigationParams,
  putAlbumToPlaylistAction: (index: number) => Action
}
class AlbumPage extends Component<IAlbumPage, any> {
  private creator: any
  private mData: any
  private prevInfo: any
  private emitter: any
  constructor(props: any) {
    super(props)
    this.state = {
      opacity: new Animated.Value(0),
    }
    this.mData = {}
    this.prevInfo = {}
    // 初始化页面时优先加载的数据
    const albumPrevInfo = this.props.navigation.getParam('album')
    this.creator = get(albumPrevInfo, 'creator', false)
    const coverImgUrl = get(albumPrevInfo, 'coverImgUrl', albumPrevInfo.picUrl)
    this.prevInfo = {
      coverImgUrl,
      title: albumPrevInfo.name,
      author: this.creator ? this.creator.nickname : null,
      avatar: this.creator ? this.creator.avatarUrl : null,
      // playCount,
      // subscribedCount
    }
    this.addNativeEventListener()
  }

  // componentWillReceiveProps(nextProps: any) {
  //   const album = nextProps.albumInfo
  //   if (album.tracks.length !== 0) {
  //     const { tracks, commentCount, shareCount } = album
  //     this.mData = {
  //       tracks,
  //       commentCount,
  //       shareCount
  //     }
  //   }
  // }

  // componentWillMount() {
  //   // 初始化页面时优先加载的数据
  //   const albumPrevInfo = this.props.navigation.getParam('album')
  //   this.creator = get(albumPrevInfo, 'creator', false)
  //   const coverImgUrl = get(albumPrevInfo, 'coverImgUrl', albumPrevInfo.picUrl)
  //   this.prevInfo = {
  //     coverImgUrl,
  //     title: albumPrevInfo.name,
  //     author: this.creator ? this.creator.nickname : null,
  //     avatar: this.creator ? this.creator.avatarUrl : null,
  //     // playCount,
  //     // subscribedCount
  //   }

  //   this.addNativeEventListener()
  // }

  addNativeEventListener = () => {
    // 设置原生动作监听
    this.emitter = [
      DeviceEventEmitter.addListener('onItemClick', (e) => this.props.putAlbumToPlaylistAction(parseInt(e.itemIndex))),
      DeviceEventEmitter.addListener('onIconMoreClick', (e) => console.log(parseInt(e.itemIndex)))
    ]
  }

  // componentDidMount() {
  //   const { navigation } = this.props
  //   const album = navigation.getParam('album')
    // const interactionHandler = getInteractionHandler('navigate')
    // InteractionManager.clearInteractionHandle(interactionHandler)
    // setTimeout(() => {
        // this.props.getAlbumInfoAction(album.id)
      // })
    // }, 2000)
  // }

  componentWillUnmount() {
    // 卸载原生动作监听
    for (let i = 0; i < this.emitter.length; i++) {
      DeviceEventEmitter.removeSubscription(this.emitter[i])
    }
  }

  render() {
    console.log('AlbumPage渲染')
    // console.log(this.mData.tracks)
    const props = this.props
    const album = props.navigation.getParam('album')
    const coverImgUrl = get(album, 'coverImgUrl', album.picUrl)
    return (
      <View style={styles.container}>
        <AlbumHeader
          source={coverImgUrl}
          opacity={this.state.opacity.interpolate({
            inputRange: [0, albumInfoHeight - topGap],
            outputRange: [0, 1]
          })}
          interactHeight={albumInfoHeight - topGap}
        />
        {
          // this.mData.tracks === undefined ? null : 
          <RCTRecycleView
            style={{flex: 1}}
            prevInfo={JSON.stringify(this.prevInfo)}
            // data={this.mData == {} ? null : JSON.stringify(this.mData)}
            onScroll={
              Animated.event([{
                nativeEvent: {
                  dy: this.state.opacity
                }
              }])
            }
          />
        }
      </View>
    )
  }
}

const albumInfoHeight = (deviceHeight - 50) * 0.5
const topGap = 50 + statusBarHeight

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
    height: albumInfoHeight + topGap,
  },
  albumCtr: {
    width: deviceWidth,
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
    bottom: 50 - 20,
    width: deviceWidth,
    height: deviceWidth
  },

  infoContent: {
    flex: 1,
    marginTop: topGap,
    paddingLeft: deviceWidth * 0.05,
    paddingRight: deviceWidth * 0.05,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  infoCover: {
    width: deviceWidth * 0.35,
    height: deviceWidth * 0.35,
    marginRight: deviceWidth * 0.04,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cover: {
    width: deviceWidth * 0.35,
    height: deviceWidth * 0.35,
    borderRadius: 2
  },
  infoText: {
    flex: 1,
    height: deviceWidth * 0.38,
    paddingTop: deviceWidth * 0.03,
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
    overflow: 'hidden'
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
    height: 60,
    paddingLeft: 66
  },
  itemTrackHeight: {
    height: 55,
    paddingLeft: 55,
  },
  borderLine: {
    borderBottomWidth: PX_1,
    borderBottomColor: 'rgba(0,0,0,0.1)',
  },
  albumIndex: {
    position: 'absolute',
    left: 0,
    width: 60,
    height: 60,
    marginLeft: 4,
  },
  trackIndex: {
    position: 'absolute',
    left: 0,
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

function mapStateToProps(
  { album: { albumInfo } } : { album: IAlbumState }
) {
  return {
    albumInfo
  }
}

function mapDispatchToProps(dispatch: Dispatch<Action>) {
  return {
    putAlbumToPlaylistAction: (index: number) => dispatch(putAlbumToPlaylistAction(index))
  }
}

export default connect(
  null,
  mapDispatchToProps
)(AlbumPage)