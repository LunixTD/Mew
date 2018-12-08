import React, { Component } from 'react'
import {
  StyleSheet,
  View,
  Text
} from 'react-native'

class HomePage extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>HomePage</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'red'
  }
})

export default HomePage