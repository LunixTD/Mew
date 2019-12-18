import React, { Component } from 'react'
import {
  StyleSheet,
  View,
} from 'react-native'
import { StackNavigator } from '../navigator/navigator'
import NavigationService from '../common/js/navigationService'

import BottomLinshi from './musicPlayer'

class Window extends Component {
  shouldComponentUpdate() {
    return false
  }

  render() {
    console.log('渲染window')
    return (
      <View style={styles.container}>
        <StackNavigator
          ref={(navigatorRef: any)=> {
            NavigationService.setTopLevelNavigator(navigatorRef, 'stack')
          }}
        />
        <BottomLinshi />
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