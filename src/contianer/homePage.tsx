import React, { Component } from 'react'
import {
  StyleSheet,
  View,
  Text,
  Image,
  SectionList,
  LayoutAnimation,
  UIManager
} from 'react-native'
UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true)
import Section from '../components/section'
import Banner from '../components/banner'

import { BACKGROUND_G, deviceSize, BANNER_RADIO, THEME_COLOR } from '../config/styleConfig'

const banner_list = [
  require('../../assets/banner/1.jpg'),
  require('../../assets/banner/2.jpg'),
  require('../../assets/banner/3.jpg'),
  require('../../assets/banner/4.jpg'),
  require('../../assets/banner/5.jpg')
]

const { width } = deviceSize
const bannerWidth = width * 0.95
const bannerHeight = bannerWidth / BANNER_RADIO
const banner_config = {
  loop: true,
  autoplay: true,
  autoplayTimeout: 4.5,
  horizontal: true,
  style: {
    width: width,
    height: bannerHeight
  },
  // imgList: banner_list
}

class HomePage extends Component<any, any> {
  constructor(props: any) {
    super(props)
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
  render() {
    console.log('homePage渲染')
    return (
      <View style={styles.container}>
        <SectionList
          initialNumToRender={1}
          sections={[
            {data:[{key: 'a'}], renderItem: () => this.renderBanner()},
            {data:[{key: 'b'}], renderItem: () => <Section title='每日推荐' icon='recommend' />}
          ]}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BACKGROUND_G
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

export default HomePage