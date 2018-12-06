import {
  View
} from 'react-native'
import { 
  createDrawerNavigator,
  createStackNavigator,
  createNavigationContainer
} from 'react-navigation'

import ScrollPage from '../components/scrollPage'

const DrawerNavigator = createDrawerNavigator({
  ScrollPage: {
    screen: ScrollPage
  }
})
const DrawerNavigatorView = createNavigationContainer(DrawerNavigator)