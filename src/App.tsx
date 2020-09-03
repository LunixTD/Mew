import React, { Component } from 'react'
import { StatusBar } from 'react-native'
import 'react-native-gesture-handler'
import { Provider } from 'react-redux'
import store from '@redux/store/store'

import ModalPage from '@container/modalPage'

export default class App extends Component {
  render() {
    return (
        <Provider store={store}>
          <StatusBar
            barStyle='light-content'
            translucent={true}
            backgroundColor='rgba(0,0,0,0)'
          />
          <ModalPage />
        </Provider>
    )
  }
}