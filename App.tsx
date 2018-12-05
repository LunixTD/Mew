import React, {Component} from 'react'
import {
  Platform, 
  StyleSheet, 
  Text, 
  View
} from 'react-native'
import { createStackNavigator, createNavigationContainer } from 'react-navigation'

class Linshi extends Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: "red" }}>
        <Text>测试测试测试哦</Text>
        <Text>测试测试测试哦</Text>
        <Text>测试测试测试哦</Text>
        <Text>测试测试测试哦</Text>
        <Text>测试测试测试哦</Text>
        <Text>测试测试测试哦</Text>
      </View>
    )
  }
}

const StackView = createStackNavigator({
  Home: {
    screen: Linshi
  }
}, {
  headerMode: 'none'
})

const AppView = createNavigationContainer(StackView)

type Props = {}
export default class App extends Component<Props> {
  render() {
    return (
      <AppView></AppView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
  },
})
