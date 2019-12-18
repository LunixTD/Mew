import React, { Component } from 'react'
import {
  StyleSheet,
  View,
  Text,
  Image,
  SectionList,
} from 'react-native'
import { Action, Dispatch } from 'redux'
import { connect } from 'react-redux'
import { getAlbumInfoAction } from '../redux/actions/album.action'
import Section from '../components/section'
import Banner from '../components/banner'
import { getRecommendPlaylist, getAllToplist } from '../services/api'

import { BACKGROUND_G, BANNER_RADIO, THEME_COLOR, deviceWidth, musicBoxH, PX_1, deviceHeight } from '../config/styleConfig'
import { IAlbum, IRecommendAlbum } from '../config/interfaces'

const banner_list = [
  require('../../assets/banner/1.jpg'),
  require('../../assets/banner/2.jpg'),
  require('../../assets/banner/3.jpg'),
  require('../../assets/banner/4.jpg'),
  require('../../assets/banner/5.jpg')
]

const bannerWidth = deviceWidth * 0.95
const bannerHeight = bannerWidth / BANNER_RADIO
const banner_config = {
  loop: true,
  autoplay: true,
  autoplayTimeout: 4.5,
  horizontal: true,
  style: {
    width: deviceWidth,
    height: bannerHeight
},
  // imgList: banner_list
}

interface IProps {
  getAlbumInfoAction: (album: IRecommendAlbum) => Action
}

class HomePage extends Component<IProps, any> {
  constructor(props: any) {
    super(props)
    this.state = {
      recommendList: [],
      officialTopList: [],
      recommendTopList: [],
      worldTopList: []
    }
  }

  async componentDidMount() {
    const playlist = await getRecommendPlaylist()
    const toplist = await getAllToplist()
    // console.log(toplist)
    let officialTopList: IAlbum[] = []
    let recommendTopList: IAlbum[]= []
    let worldTopList: IAlbum[]= []
    toplist.map((item: IAlbum, index: number) => {
      switch(item.id) {
        // 官方榜单
        case 3779629:
        case 3778678:
        case 19723756:
          officialTopList.push(item)
          break
        // 推荐榜单
        case 991319590:
        case 71384707:
        case 71385702:
        case 10520166:
        case 1978921795:
        case 2250011882:
          recommendTopList.push(item)
          break
        // 全球榜
        case 60198:
        case 180106:
        case 3812895:
        case 60131:
        case 11641012:
        case 27135204:
          worldTopList.push(item)
          break
        default: break
      }
    })
    this.setState({
      recommendList: playlist.slice(0, 6),
      officialTopList: officialTopList,
      recommendTopList: recommendTopList,
      worldTopList: worldTopList
    })
  }

  renderBanner = () => {
    return (
      <View>
        <View style={styles.tabBarDecoration} />
        <Banner config={banner_config}>
        {
          banner_list.map((item, index) => (
            <View key={index} style={styles.swiperItem}>
              <Image style={styles.swiperImg} source={item} resizeMode='cover'/>
            </View>
          ))
        }
        </Banner>
      </View>
      
    )
  }

  onRecommendPress = (album: IRecommendAlbum) => {
    this.props.getAlbumInfoAction(album)
  }

  render() {
    console.log('homePage渲染')
    return (
        <SectionList
          style={styles.container}
          initialNumToRender={1}
          contentContainerStyle={styles.contentContainer}
          sections={[
            {data:[{key: 'a'}], renderItem: () => this.renderBanner()},
            {data:[{key: 'b'}], renderItem: () => this.state.recommendList ? 
            <Section title='每日推荐' icon='recommend' data={this.state.recommendList} itemType='normal' onItemPress={this.onRecommendPress} /> : null },
            {data:[{key: 'c'}], renderItem: () => this.state.officialTopList ? 
            <Section title='云音乐官方榜单' icon='hot' data={this.state.officialTopList} itemType='normal' onItemPress={this.onRecommendPress} /> : null },
            {data:[{key: 'd'}], renderItem: () => this.state.recommendTopList ? 
            <Section title='推荐榜' icon='favor' data={this.state.recommendTopList} itemType='normal' onItemPress={this.onRecommendPress} /> : null },
            {data:[{key: 'e'}], renderItem: () => this.state.worldTopList ? 
            <Section title='全球榜' icon='recommend' data={this.state.worldTopList} itemType='normal' onItemPress={this.onRecommendPress} /> : null }
          ]}
        />
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BACKGROUND_G,
  },
  contentContainer: {
    paddingBottom: musicBoxH + PX_1
  },
  swiperItem: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent'
  },
  swiperImg: {
    width: bannerWidth,
    height: bannerHeight,
    borderRadius: 5
  },
  tabBarDecoration: {
    position: 'absolute',
    top: 0, left: 0, right: 0, bottom: bannerHeight * 0.2,
    backgroundColor: THEME_COLOR
  }
})

function mapDispatchToProps(dispatch: Dispatch<Action>) {
  return {
    getAlbumInfoAction: (album: IRecommendAlbum) => dispatch(getAlbumInfoAction(album))
  }
}

export default connect(
  null, mapDispatchToProps
)(HomePage)