import React, { Component } from 'react'
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity
} from 'react-native'

import TouchItem from './touchItem'
import Svg from '../components/svg'

import { GAP_SIZE_M, GAP_SIZE_S, GAP_SIZE_2, COL_NUM, FONT_COLOR_M } from '../config/styleConfig'

interface IProps {
  title?: string,
  icon?: any
}

class Section extends Component<IProps, any> {
  rednerTitle = () => {
    return (
      <TouchableOpacity style={styles.titleContainer}>
        <View style={styles.titleItem}>
          <Svg icon={this.props.icon} size={26} style={{marginRight: 5}} />
          <Text style={styles.titleText}>{this.props.title}</Text>
        </View>
          <View style={styles.titleItem}>
            <Text style={styles.titleText}>更多</Text>
            <Svg icon='more' size={15} color={FONT_COLOR_M} />
          </View>
      </TouchableOpacity>
    )
  }

  render() {
    return (
      <View style={styles.container}>
        { this.rednerTitle() }
        <View style={styles.content}>
          <TouchItem colNum={COL_NUM} />
          <TouchItem colNum={COL_NUM} />
          <TouchItem colNum={COL_NUM} />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: GAP_SIZE_M
  },
  content: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingLeft: GAP_SIZE_S / 2,
    paddingRight: GAP_SIZE_S / 2,
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: GAP_SIZE_2,
  },
  titleItem: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  titleText: {
    color: FONT_COLOR_M
  }
})

export default Section