import React, { Component } from 'react'
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableHighlight,
  TouchableWithoutFeedback
} from 'react-native'
import { IRecommendAlbum, IAlbum } from '../config/interfaces'
import { GAP_SIZE_S, COL_NUM, FONT_COLOR_M, FONT_SIZE_M, deviceWidth } from '../config/styleConfig'
import { get } from 'lodash'

interface IProps {
  colNum: number,
  type?: 'recommend' | string
  data: IRecommendAlbum,
  onPress: (album: IRecommendAlbum) => any
}

class TouchItem extends Component<IProps, any> {
  private imageStyle: any

  constructor(props: IProps) {
    super(props)
    switch(this.props.type) {
      case 'recommend':
        this.imageStyle = styles.recommendImage
        break
      default:
        this.imageStyle = styles.normalImage
        break
    }
  }
  
  renderDesc = () => {
    const desc = this.props.data.name
    return (
      <Text 
        style={styles.imageDesc}
        numberOfLines={2}
        ellipsizeMode='tail'
      >{ desc ? desc : '' }</Text>
    )
  }

  onItemPress = () => {
    this.props.onPress(this.props.data)
  }

  render() {
    const data = this.props.data
    const coverImgUrl = get(data, 'coverImgUrl', data.picUrl) + '?param=300y300'
    return (
      <TouchableWithoutFeedback
        onPress={this.onItemPress}
      >
        <View style={styles.itemContainer}>
          <TouchableHighlight
            underlayColor='rgba(0,0,0,0.6)'
            style={this.imageStyle}
            onPress={this.onItemPress}
          >
            <View style={styles.imageContainer}>
              <Image
                style={styles.image}
                source={{ uri: coverImgUrl }}
                resizeMode="cover"
              />
            </View>
          </TouchableHighlight>
          { this.renderDesc() }
        </View>
      </TouchableWithoutFeedback>
    )
  }
}

const touchItemSize = (deviceWidth - GAP_SIZE_S * (COL_NUM + 1)) / COL_NUM
const textHeight = 40
const styles = StyleSheet.create({
  itemContainer: {
    width: touchItemSize,
    height: touchItemSize + textHeight,
    marginBottom: 20,
    borderRadius: 2,
    overflow: 'hidden'
  },
  normalImage: {
    borderRadius: 2,
    overflow: 'hidden'
  },
  recommendImage: {
    borderTopLeftRadius: 2,
    borderTopRightRadius: 2,
    overflow: 'hidden'
  },
  imageContainer: {
    width: touchItemSize,
    height: touchItemSize
  },
  image: {
    width: touchItemSize,
    height: touchItemSize
  },
  imageDesc: {
    height: textHeight,
    color: FONT_COLOR_M,
    fontSize: FONT_SIZE_M,
    paddingTop: 4,
    paddingBottom: 4,
    paddingLeft: 6,
    paddingRight: 2
  }
})

export default TouchItem