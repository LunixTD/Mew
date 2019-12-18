import React, {Component} from 'react'
import {
  StyleSheet,
  Text, 
  View,
  ImageComponent
} from 'react-native'
import { Provider, connect } from 'react-redux'
import configureStore from './redux/store/store'
import NavigationService from './common/js/navigationService'
import { DrawerNavigator } from './navigator/navigator'

import { ICommonState } from './config/interfaces'

export const store = configureStore()


export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <DrawerView />
      </Provider>
    )
  }
}

const DrawerView =  connect(
  ({ common: { drawerLockMode } }: { common: ICommonState }) => ({ drawerLockMode }),
  null
)(class DrawerView extends Component<any> {
  render() {
    return (
      <DrawerNavigator 
        ref={(navigatorRef: any) => {
          NavigationService.setTopLevelNavigator(navigatorRef, 'drawer')
        }}
        screenProps={{ drawerLockMode: this.props.drawerLockMode }}
      />
    )
  }
})



