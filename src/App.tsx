import React, {Component} from 'react'
import {
  StyleSheet,
  Text, 
  View
} from 'react-native'
import { Provider } from 'react-redux'
import configureStore from './redux/store/store'
import NavigationService from './common/js/navigationService'
import { DrawerNavigator } from './navigator/navigator'

import MusicPlayer from './contianer/musicPlayer'

const store = configureStore()

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <DrawerNavigator 
          ref={(navigatorRef: any) => {
            NavigationService.setTopLevelNavigator(navigatorRef, 'drawer')
          }}
        />
        {/* <MusicPlayer /> */}
      </Provider>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
})