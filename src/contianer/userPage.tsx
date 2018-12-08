import React, { Component } from 'react'
import {
  StyleSheet,
  View,
  Text
} from 'react-native'

class UserPage extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>UserPage</Text>
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

export default UserPage