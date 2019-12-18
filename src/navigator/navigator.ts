import { 
  createDrawerNavigator,
  createStackNavigator,
} from 'react-navigation'

import ScrollPage from '../contianer/scrollPage'
import Window from '../contianer/window'
import SearchPage from '../contianer/searchPage'
import AlbumPage from '../contianer/albumPage'
import Index from '../contianer/authPage'

import CustomDrawerContentComponent from './customDrawerContentComponent'

import { modalAnime } from './navigatorAnime'
import { deviceWidth, deviceHeight, drawerW } from '../config/styleConfig'

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
  contentComponent: (props: any) => CustomDrawerContentComponent(props)
})

// modal
const ModalNavigator = createStackNavigator({
  Home: {
    screen: DrawerNavigator,
  },
  Index: {
    screen: Index,
  }
}, {
  initialRouteName: 'Home',
  mode: 'modal',
  headerMode: 'none',
  transitionConfig: modalAnime
})



export { DrawerNavigator, StackNavigator, ModalNavigator }
