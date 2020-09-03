import { createDrawerNavigator } from 'react-navigation-drawer'
import { createAppContainer } from 'react-navigation'

import CustomDrawerContentComponent from './customDrawerContentComponent'
import ScrollPage from '@container/scrollPage'
import { drawerW } from '@config/styleConfig'

const DrawerNavigator = createDrawerNavigator({
  ScrollPage: {
    screen: ScrollPage
  }
}, {
  initialRouteName: 'ScrollPage',
  drawerWidth: drawerW,
  contentComponent: (props: any) => CustomDrawerContentComponent(props)
})

export default DrawerNavigator