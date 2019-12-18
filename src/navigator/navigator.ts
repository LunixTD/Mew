import React, { Component } from 'react'
import {
  View,
} from 'react-native'
import { 
  createDrawerNavigator,
  createStackNavigator,
} from 'react-navigation'

import ScrollPage from '../contianer/scrollPage'
import Window from '../contianer/window'
import SearchPage from '../contianer/searchPage'
import AlbumPage from '../contianer/albumPage'

import CustomDrawerContentComponent from './customDrawerContentComponent'

import { deviceSize } from '../config/styleConfig'

// stackView
const StackNavigator = createStackNavigator({
  ScrollPage: {
    screen: ScrollPage,
    navigationOptions: {
      header: null
    }
  },
  SearchPage: {
    screen: SearchPage,
    navigationOptions: {
      header: null
    }
  },
  AlbumPage: {
    screen: AlbumPage,
    navigationOptions: {
      header: null
    }
  }
}, {
  initialRouteName: 'ScrollPage',
  headerMode: 'screen'
})

// drawerView
const drawerW = deviceSize.width * 0.85
const DrawerNavigator = createDrawerNavigator({
  Home: {
    screen: Window,
    navigationOptions: ({ screenProps }: any) => ({
      drawerLockMode: screenProps ? screenProps.drawerLockMode : 'unlocked'
    })
  }
}, {
  initialRouteName: 'Home',
  drawerWidth: drawerW,
  contentComponent: CustomDrawerContentComponent
})



export { DrawerNavigator, StackNavigator }
