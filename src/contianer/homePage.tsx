import React, { Component } from 'react'
import {
  StyleSheet,
  View,
  Text,
  SectionList
} from 'react-native'

import Section from '../components/section'

import { BACKGROUND_G } from '../config/styleConfig'

class HomePage extends Component {
  render() {
    return (
      <View style={styles.container}>
        <SectionList
          initialNumToRender={1}
          sections={[
            {data:[{key: 'a'}], renderItem: () => <Section title='每日推荐' icon='recommend' />}
          ]}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BACKGROUND_G
  }
})

export default HomePage