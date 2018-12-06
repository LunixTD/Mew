import React, {Component} from 'react'
import {
  Text, 
  View
} from 'react-native'
import { Provider } from 'react-redux'
import configureStore from './redux/store/store'

const store = configureStore()

type Props = {}
export default class App extends Component<Props> {
  render() {
    return (
      <Provider store={store}>
        <View>
          <Text>内容</Text>
        </View>
      </Provider>
    )
  }
}