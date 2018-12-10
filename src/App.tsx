import React, {Component} from 'react'
import {
  StyleSheet,
  Text, 
  View
} from 'react-native'
import { Provider } from 'react-redux'
import configureStore from './redux/store/store'

import { DrawerNavigator } from './navigator/navigator'

const store = configureStore()

type Props = {}
export default class App extends Component<Props> {
  render() {
    return (
      <Provider store={store}>
        <DrawerNavigator />
      </Provider>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
})