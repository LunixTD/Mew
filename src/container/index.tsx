import React, { Component } from 'react'
import {
  View,
  StyleSheet,
} from 'react-native'

import StackNavigator from '@navigator/stackNavigator'
import MusicPlayer from './musicPlayer'

class Index extends Component {
  render() {
    return(
      <View style={styles.container}>
        <StackNavigator />
        {/* <MusicPlayer /> */}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
})

export default Index