import React, { Component } from 'react'
import {
  View,
} from 'react-native'
import { 
  createDrawerNavigator,
  createStackNavigator,
  createMaterialTopTabNavigator
} from 'react-navigation'

import ScrollPage from '../contianer/scrollPage'

import CustomDrawerContentComponent from './customDrawerContentComponent'

import { deviceSize } from '../config/styleConfig'

// drawerView
const drawerW = deviceSize.width * 0.85
const DrawerNavigator = createDrawerNavigator({
  ScrollPage: ScrollPage
}, {
  initialRouteName: 'ScrollPage',
  drawerWidth: drawerW,
  contentComponent: CustomDrawerContentComponent
})

// stackView
const StackNavigator = createStackNavigator({
  Home: {
    screen: DrawerNavigator,
    navigationOptions: {
      header: null
    }
  }
}, {
  initialRouteName: 'Home',
  headerMode: 'screen'
})

export default StackNavigator