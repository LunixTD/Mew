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
import Section from '@components/section'
import { getRecommendPlaylist, getAllToplist } from '@services/api'

import { BACKGROUND_G, BANNER_RADIO, THEME_COLOR, deviceWidth, musicBoxH, PX_1, deviceHeight } from '../config/styleConfig'
import { IAlbum, IRecommendAlbum, IrecommendListData, IInitDataState } from '../config/interfaces'
import Swiper from 'components/swiper'
import refService from 'common/js/refService'

const banner_list = [
  require('@assets/banner/1.jpg'),
  require('@assets/banner/2.jpg'),
  require('@assets/banner/3.jpg'),
  require('@assets/banner/4.jpg'),
  require('@assets/banner/5.jpg')
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
  recommendListData: IrecommendListData
  getAlbumInfoAction: (album: IRecommendAlbum) => Action
}

class HomePage extends Component<IProps, any> {
  constructor(props: any) {
    super(props)
  }

  renderBanner = () => {
    const bannerWidth = deviceWidth * 0.95
    const bannerHeight = bannerWidth / BANNER_RADIO
    const banner_config = {
      refName: 'discSwiper',
      loop: true,
      autoplay: false,
      horizontal: true,
      style: {
        width: deviceWidth,
        height: bannerHeight
      },
      onIndexChanged: (index: number) => {
        // this.props.setPlayingIndexAction(index)
      }
    }
    return (
      <Swiper
        ref={(ref: any) => refService.setRefBox('discSwiper', ref)}
        style={banner_config.style}
        initialPage={0}
        data={banner_list}
        renderItem={this.renderSwiperItem}
        onIndexChanged={banner_config.onIndexChanged}
      />
    )
  }

  renderSwiperItem = (item: any, index: number) => {
    return (
      <View key={index} style={styles.swiperItem}>
        <Image style={styles.swiperImg} source={item} resizeMode='cover'/>
      </View>
    )
  }

  // 点击事件
  onRecommendPress = (album: IRecommendAlbum) => {
    this.props.getAlbumInfoAction(album)
  }

  renderSection = ({ section: { title, icon, dataKey } }: any) => {
    let section = null
    const recommendListData = this.props.recommendListData
    if (Object.keys(recommendListData).length !== 0) {
      section = <Section title={title} icon={icon} data={recommendListData[dataKey]} itemType='normal' onItemPress={this.onRecommendPress} />
    }
     return section
  }

  render() {
    console.log('homePage渲染')
    return (
      <SectionList
        style={styles.container}
        initialNumToRender={1}
        contentContainerStyle={styles.contentContainer}
        renderItem={this.renderSection}
        sections={[
          { data: [{key: 'a'}], renderItem: () => this.renderBanner() },
          { data: [{key: 'b'}], title: '每日推荐', icon: 'recommend', dataKey: 'recommendList' },
          { data: [{key: 'c'}], title: '云音乐官方榜单', icon: 'hot', dataKey: 'officialTopList' },
          { data: [{key: 'd'}], title: '推荐榜', icon: 'favor', dataKey: 'recommendTopList' },
          { data: [{key: 'e'}], title: '全球榜', icon: 'recommend', dataKey: 'worldTopList' }
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

function mapStateToProps(
  {
    initData: { recommendListData }
  }: { initData: IInitDataState }
){
  return {
    recommendListData
  }
}

function mapDispatchToProps(dispatch: Dispatch<Action>) {
  return {
    getAlbumInfoAction: (album: IRecommendAlbum) => dispatch(getAlbumInfoAction(album))
  }
}

export default connect(
 mapStateToProps,
 mapDispatchToProps
)(HomePage)