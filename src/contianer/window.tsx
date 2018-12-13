import React, { Component } from 'react'
import {
  StyleSheet,
  View,
} from 'react-native'
import { StackNavigator } from '../navigator/navigator'
import NavigationService from '../common/js/navigationService'

import BottomLinshi from '../components/bottomLinshi'

class Window extends Component {
  render() {
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