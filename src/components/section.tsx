import React, { Component } from 'react'
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity
} from 'react-native'
import { IRecommendAlbum } from '../config/interfaces'

import TouchItem from './touchableItem'
import Svg from '../components/svg'

import { GAP_SIZE_M, GAP_SIZE_S, COL_NUM, FONT_COLOR_M, GAP_SIZE_1 } from '../config/styleConfig'

interface IProps {
  title?: string,
  icon?: string,
  data: any[],
  itemType: string,
  onItemPress: (album: IRecommendAlbum) => any
}

class Section extends Component<IProps, any> {
  rednerTitle = () => {
    return (
      <TouchableOpacity style={styles.titleContainer}>
        <View style={styles.titleItem}>
          <Svg icon={this.props.icon} size={28} style={{marginRight: 3, marginLeft: 3}} />
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
        { this.props.title && this.props.data.length !== 0 ? this.rednerTitle() : null }
        <View style={styles.content}>
          {
            this.props.data.map((item: IRecommendAlbum, index: number) => (
              <TouchItem
                key={index}
                colNum={COL_NUM}
                data={item}
                type={this.props.itemType}
                onPress={this.props.onItemPress}
              />
            ))
          }
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: GAP_SIZE_M,
  },
  content: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    alignItems: 'flex-start',
    paddingLeft: GAP_SIZE_S / 2,
    paddingRight: GAP_SIZE_S / 2,
  },
  titleContainer: {
    height: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: GAP_SIZE_1,
    marginBottom: 7,
  },
  titleItem: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  titleText: {
    color: FONT_COLOR_M,
    fontWeight: '400',
    fontSize: 16
  }
})

export default Section