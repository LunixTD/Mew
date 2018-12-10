import React, { Component } from 'react'
import {
  StyleSheet,
  View,
} from 'react-native'
import { StackNavigator } from '../navigator/navigator'

import BottomBox from '../components/bottomBox'

class Window extends Component {
  render() {
    return (
      <View style={styles.container}>
        <StackNavigator />
        <BottomBox />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
})

export default Window