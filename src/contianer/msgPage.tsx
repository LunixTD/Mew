import React, { Component } from 'react'
import {
  StyleSheet,
  View,
  Text
} from 'react-native'

class MsgPage extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>MsgPage</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'blue'
  }
})

export default MsgPage