import React, { Component } from 'react'
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  FlatList,
  Dimensions,
  TouchableNativeFeedback,
  TouchableWithoutFeedback,
  BackHandler,
  Animated,
  Easing,
  InteractionManager
} from 'react-native'
import { connect } from 'react-redux'
import Interactable from 'react-native-interactable'
import { watchPlaylistModalAction, closePlaylistModalAction, openPlaylistModalAction } from '../redux/actions/playlist.action'
import { removeTrackAction } from '../redux/actions/playlist.action'

import refService from '../common/js/refService'

import IconFont from '../components/icon'

import { PX_1, BACKGROUND_W, BORDER_COLOR_M, FONT_COLOR_M, FONT_COLOR_S, deviceWidth, FONT_COLOR_SS, FONT_COLOR_G } from '../config/styleConfig'
import { listModalAnime } from '../config/animeConfig'
import { ICommonState, IPlaylistState, PlaylistModalStatus, ITrack } from '../config/interfaces';
import { Dispatch, Action } from 'redux'
import { get } from 'lodash';

const { width, height } = Dimensions.get('window')
const listBoxHeight = height * 0.6

interface IProps {
  playlistModalStatus: PlaylistModalStatus,
  modalPlaylist: ITrack[],
  watchPlaylistModalAction: () => Action,
  openPlaylistModalAction: () => Action,
  closePlaylistModalAction: () => Action,
  removeTrackAction: (id: number | undefined, index: number) => Action
}

class PlayListModal extends Component<IProps> {
  private playList: any
  private maskAnime: any
  constructor(props: IProps) {
    super(props)
  }

  shouldComponentUpdate(nextProps: IProps) {
    // console.log(nextProps)
    if (nextProps.modalPlaylist === this.props.modalPlaylist) {
      return false
    } else {
      return true
    }
  }

  componentDidMount() {
    refService.setRefBox('playList', this.playList)
    this.props.watchPlaylistModalAction()
    BackHandler.addEventListener('hardwareBackPress', () => {
      if (this.props.playlistModalStatus === 'open') {
        this.props.closePlaylistModalAction()
        return true
      }
    })
  }

  renderListItem = (data: { item: ITrack, index: number }) => {
    // console.log(item)
    const { index, item } = data
    const id = get(item, 'id', undefined)
    return (
      <ListItem
        index={index}
        item={item}
        onRmBtnPress={() => this.props.removeTrackAction(id, index)}
      />
    )
  }

  onDelAllPress = () => {
    console.log('清空歌单')
  }

  render() {
    console.log('playList渲染')
    const playlist = this.props.modalPlaylist
    // console.log(this.props.playlist)
    return (
      <View style={styles.container}>
        <ModalMask />
        <Animated.View
          ref={(ref: any) => this.playList = ref}
          style={[styles.playList, {
            transform: [{
              translateY: listModalAnime.interpolate({
                inputRange: [0, 1],
                outputRange: [0, -listBoxHeight]
              })
            }]
          }]}
        >
          <View style={styles.content}>
            <View style={styles.listHeader}>
              <TouchableNativeFeedback>
                <View style={[styles.flexRow, styles.headerLeft]}>
                  <View style={[styles.iconBox, { width: 30 }]}>
                    <IconFont
                      name='shuffle'
                      size={24}
                      color={FONT_COLOR_M}
                    />
                  </View>
                  <Text>列表循环</Text>
                  <Text>{` (${playlist.length})`}</Text>
                </View>
              </TouchableNativeFeedback>
              
              <View style={styles.flexRow}>
                <TouchableNativeFeedback>
                  <View style={[styles.flexRow, styles.headerRight]}>
                    <IconFont
                      name='favor'
                      size={22}
                      color={FONT_COLOR_M}
                    />
                    <Text style={{ marginLeft: 3 }}>收藏全部</Text>
                  </View>
                </TouchableNativeFeedback>
                <View style={styles.divider} />
                <TouchableNativeFeedback
                  onPress={this.onDelAllPress}
                  style={[styles.delAll, styles.flexRow]}
                >
                  <View style={styles.iconBox}>
                    <IconFont
                      name='removeAll'
                      size={22}
                      color={FONT_COLOR_M}
                    />
                  </View>
                </TouchableNativeFeedback>
              </View>
            </View>
            {
              playlist.length <= 0 ? null : 
              <FlatList
                data={playlist}
                renderItem={this.renderListItem}
                initialNumToRender={15}
                keyExtractor={(item, index) => index.toString()}
                getItemLayout={(data, index) => ({ length: ITEM_HEIGHT, offset: ITEM_HEIGHT * index, index })}
              />
            }
          </View>
        </Animated.View>
      </View>
    )
  }
}

const ModalMask = connect(
  ({ playlist: { playlistModalStatus } }: { playlist: IPlaylistState }) => ({ playlistModalStatus }),
  (dispatch) => ({
    closePlaylistModalAction: () => dispatch(closePlaylistModalAction())
  })
)(
  class ModalMask extends Component<any, any> {
    constructor(props: any) {
      super(props)
      this.state = {
        maskStatus: 'close'
      }
    }
  
    componentDidMount() {
      listModalAnime.addListener(({ value }) => {
        if (value < 0.03 && this.props.playlistModalStatus === 'close') {
          this.setState({
            maskStatus: 'close'
          })
        }
      })
    }

    componentWillUnmount() {
      listModalAnime.removeAllListeners()
    }

    shouldComponentUpdate(nextProps: any) {
      const playlistModalStatus = nextProps.playlistModalStatus
      if (this.state.maskStatus !== playlistModalStatus) {
        // 如果是关闭操作，则延时执行，防止遮罩在动画执行结束前消失
        if (playlistModalStatus === 'close') {
          return true
        }
        // 开启操作不延时
        this.setState({
          maskStatus: 'open'
        })
        return true
      } else {
        return false
      }
    }

    touchMask = () => {
      this.props.closePlaylistModalAction()
    }

    render() {
      return (
        this.state.maskStatus === 'close' ? null :
        <TouchableWithoutFeedback
          onPress={this.touchMask}
        >
          <Animated.View
            style={[styles.mask, {
              opacity: listModalAnime.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 1]
              })
            }]}
          />
        </TouchableWithoutFeedback>
      )
    }
  }
)

interface IItemProps {
  index: number,
  item: ITrack,
  onRmBtnPress: () => any
}

interface IItemState {
  showStatus: boolean
}

class ListItem extends Component<IItemProps, IItemState> {
  private showStatus: boolean
  constructor(props: IItemProps) {
    super(props)
    this.showStatus = true
  }

  componentWillReceiveProps() {
    this.showStatus = true
  }

  onDelItrack = () => {
    this.props.onRmBtnPress()
    this.showStatus = false
    this.forceUpdate()
  }

  render() {
    const index = this.props.index
    const item = this.props.item
    return (
      !this.showStatus ? null : 
      <TouchableNativeFeedback>
        <View style={[styles.listItem, styles.ItemPaddingLeft]}>
          <View style={[styles.listItem, styles.borderLine]}>
            <View style={styles.itemInfo}>
              <Text 
                numberOfLines={1}
                ellipsizeMode='tail'
                style={[styles.sheetText, styles.infoTitle]}>{item.name}</Text>
              <Text style={styles.gap}>-</Text>
              <Text style={styles.infoAuthor}>
              {
                item.ar.map((arItem: any, index: number) => {
                  if (index !== 0) {
                    return '/' + arItem.name
                  } else {
                    return arItem.name
                  }
                })
              }
              </Text>
            </View>
            <TouchableNativeFeedback
              onPress={() => this.onDelItrack()}
            >
              <View style={[styles.iconClose, styles.flexCenter]}>
                <IconFont
                  name="delete"
                  size={14}
                  color={FONT_COLOR_S}
                />
              </View>
            </TouchableNativeFeedback>
          </View>
        </View>
      </TouchableNativeFeedback>
    )
  }
}

const ITEM_HEIGHT = 50
const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0
  },
  mask: {
    position: 'absolute',
    bottom: 0,
    width: width,
    height: height,
    backgroundColor: 'rgba(0,0,0,0.5)'
  },
  playList: {
    position: 'absolute',
    bottom: -listBoxHeight,
    width: width,
    height: listBoxHeight,
    overflow: 'hidden'
  },
  content: {
    width: width,
    height: listBoxHeight,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    backgroundColor: BACKGROUND_W,
    overflow: 'hidden'
  },
  listHeader: {
    width: width,
    height: 50,
    borderBottomWidth: PX_1,
    borderBottomColor: BORDER_COLOR_M,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  flexRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerLeft: {
    width: width * 0.4,
    height: 50,
    paddingRight: 10,
  },
  headerRight: {
    width: width * 0.3,
    height: 50,
  },
  divider: {
    height: 36,
    width: PX_1,
    backgroundColor: BORDER_COLOR_M,
  },
  iconBox: {
    width: 50,
    height: 50,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  // 列表
  flexCenter: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  sheetText: {
    fontSize: 16,
    color: FONT_COLOR_S
  },
  listItem: {
    flex: 1,
    height: ITEM_HEIGHT,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  ItemPaddingLeft: {
    paddingLeft: 10,
  },
  borderLine: {
    borderBottomWidth: PX_1,
    borderBottomColor: 'rgba(0,0,0,0.1)',
  },
  itemIndex: {
    width: 50,
    height: 50,
  },
  itemInfo: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    overflow: 'hidden'
  },
  infoTitle: {
    marginBottom: 1,
  },
  gap: {
    marginLeft: 4,
    marginRight: 4
  },
  infoAuthor: {
    fontSize: 11,
    color: FONT_COLOR_G,
    marginTop: 1,
  },
  iconClose: {
    width: 50,
    height: 50
  },
  moreIcon: {
    width: 16,
    height: 16
  },
})

function mapStateToProps(
  {
    playlist: {
      modalPlaylist,
      playlistModalStatus
    }
  }: { playlist: IPlaylistState }
) {
  return {
    playlistModalStatus,
    modalPlaylist
  }
}

function mapDispatchToProps(dispatch: Dispatch<Action>) {
  return {
    watchPlaylistModalAction: () => dispatch(watchPlaylistModalAction()),
    openPlaylistModalAction: () => dispatch(openPlaylistModalAction()),
    closePlaylistModalAction: () => dispatch(closePlaylistModalAction()),
    removeTrackAction: (id: number | undefined, index: number) => dispatch(removeTrackAction(id, index))
    // setPlayingIndexAction: (index: number) => dispatch(setPlayingIndexAction(index))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PlayListModal)