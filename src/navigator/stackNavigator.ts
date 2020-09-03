import { 
  createStackNavigator
} from 'react-navigation-stack'
import { createAppContainer } from 'react-navigation'

import SearchPage from '@container/scrollPage'
import AlbumPage from '@container/albumPage'

import DrawerNavigator from './drawerNavigator'
import { StyleSheet, View } from 'react-native'

const StackNavigator = createStackNavigator({
  Home: {
    screen: DrawerNavigator
  },
  SearchPage: {
    screen: SearchPage,
  },
  AlbumPage: {
    screen: AlbumPage,
  }
}, {
  initialRouteName: 'Home',
  headerMode: 'none'
})

export default createAppContainer(StackNavigator)