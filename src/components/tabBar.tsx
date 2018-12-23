import React, { Component, ReactInstance, ClassicComponent } from 'react'
import {
  StyleSheet,
  View,
  Text,
  TouchableNativeFeedback,
  Easing
} from 'react-native'
import * as Animatable from 'react-native-animatable'
import NavigationService from '../common/js/navigationService'

import IconFont from './icon'

import { deviceSize, ICON_SIZE_M, centering } from '../config/styleConfig'
import { tabIconAnime } from '../config/animeConfig'

const navItems = [{
    tabName: '我的',
    tabIconName: 'tab-user',
    tabIconColor: '#fff'
  }, {
    tabName: '主页',
    tabIconName: 'tab-home',
    tabIconColor: '#fff'
  }, {
    tabName: '消息',
    tabIconName: 'tab-msg',
    tabIconColor: '#fff'
  }
]

interface IBarProps {
  key?: any,
  tabs?: any,
  activeTab: number,
  goToPage: (i: number) => void
}

class TabBar extends Component<IBarProps, any> {
  constructor(props: IBarProps) {
    super(props)
  }

  handleMenuPress = () => {
    NavigationService.drawerNavigate('open')
  }

  handleSearchPress = () => {
    NavigationService.stackNavigate('SearchPage')
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableNativeFeedback
          background={TouchableNativeFeedback.SelectableBackgroundBorderless()}
          onPress={this.handleMenuPress}
        >
          <View style={[styles.icon, styles.bar_l]}>
            <IconFont name="menu" size={26} color="#fff" />
          </View>
        </TouchableNativeFeedback>
        <View style={styles.bar_center}>
          {
            this.props.tabs.map((tab: string, i: number) =>
              <Tab
                key={i}
                index={i}
                color={navItems[i].tabIconColor}
                tabName={navItems[i].tabName}
                tabIconName={navItems[i].tabIconName}
                activeTab={this.props.activeTab}
                goToPage={this.props.goToPage}
              />
            )
          }
        </View>
        <TouchableNativeFeedback
          background={TouchableNativeFeedback.SelectableBackgroundBorderless()}
          onPress={this.handleSearchPress}
        >
          <View style={[styles.icon, styles.bar_r]}>
            <IconFont name="search" size={26} color="#fff" />
          </View>
        </TouchableNativeFeedback>
      </View>
    )
  }
}

interface ITabProps extends IBarProps {
  index: number,
  color: string,
  tabName: string,
  tabIconName: string,
}

class Tab extends Component<ITabProps, any> {
  private anime: any
  constructor(props: ITabProps) {
    super(props)
  }
  
  handleTabPress = () => {
    this.anime.tabIconIn()
    if (this.props.index !== this.props.activeTab) {
      this.props.goToPage(this.props.index)
    }
  }

  render() {
    const props = this.props
    return (
      <TouchableNativeFeedback
        onPress={this.handleTabPress}
        background={TouchableNativeFeedback.SelectableBackgroundBorderless()}
      >
        <View style={styles.tab}>
          <Animatable.View
            ref={(ref: any) => this.anime = ref}
            animation={tabIconAnime}
            duration={300}
            easing={Easing.bezier(.6,3,1,.83)}
            useNativeDriver={true}
          >
            <IconFont name={props.tabIconName} size={26} color={props.color} />
          </Animatable.View>
        </View>
      </TouchableNativeFeedback>
    )
  }
}

const barWidth = deviceSize.width * 0.6
const styles = StyleSheet.create({
  // tabBar
  container: {
    height: 58,
    flexDirection: 'row',
    // borderTopWidth: PX_1,    //下方tab时隔离用的上边框
    // borderTopColor: '#fff',
    overflow: 'hidden',
    ...centering,
  },
  icon: {
    position: 'absolute',
    flexDirection: 'row',
    ...ICON_SIZE_M,
    ...centering,
  },
  bar_l: {
    left: 10
  },
  bar_r: {
    right: 10
  },
  bar_center: {
    width: barWidth,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  // tab
  tab: {
    ...ICON_SIZE_M,
    ...centering,
  }
})

export default TabBar