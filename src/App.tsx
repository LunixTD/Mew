import React, {Component} from 'react'
import {
  StatusBar
} from 'react-native'
import { Provider } from 'react-redux'
import configureStore from './redux/store/store'
import Index from './contianer/index'

export const store = configureStore()

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <StatusBar
          barStyle='light-content'
          translucent={true}
          backgroundColor='rgba(0,0,0,0)'
        />
        <Index />
      </Provider>
    )
  }
}



