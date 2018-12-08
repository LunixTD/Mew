import React, { Component } from 'react'
import {
  StyleSheet,
  View,
  StatusBar,
  Text
} from 'react-native'

import ScrollableTabView from 'react-native-scrollable-tab-view'

import HomePage from './homePage'
import MsgPage from './msgPage'
import UserPage from './userPage'
import TabBar from '../components/tabBar'

import { THEME_COLOR, statusBarHeight } from '../config/styleConfig'

class ScrollPage extends Component {
  render() {
    return (
      <View style={styles.container}>
        <StatusBar
          translucent={true}
          backgroundColor='transparent'
          barStyle='light-content'
        />
        <ScrollableTabView
          initialPage={0}
          tabBarPosition='top'
          renderTabBar={(props: any) => (
            <TabBar {...props}/>
          )}
        >
          <HomePage />
          <MsgPage />
          <UserPage />
        </ScrollableTabView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: statusBarHeight,
    backgroundColor: THEME_COLOR,
  }
})

export default ScrollPage