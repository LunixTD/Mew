import React, { Component } from 'react'
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableHighlight,
  TouchableWithoutFeedback
} from 'react-native'

import { GAP_SIZE_S, COL_NUM, deviceSize, FONT_COLOR_M, FONT_SIZE_M } from '../config/styleConfig'

interface IProps {
  colNum: number,
  type?: 'recommend' | undefined,
  desc?: string
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
    return (
      <Text style={styles.imageDesc}>{ this.props.desc }流行歌曲集录</Text>
    )
  }

  render() {
    return (
      <TouchableWithoutFeedback>
        <View style={styles.itemContainer}>
          <TouchableHighlight
            underlayColor='rgba(0,0,0,0.6)'
            style={this.imageStyle}
            onPress={() => {}}
          >
            <View style={styles.imageContainer}>
              <Image
                style={styles.image}
                source={require('../../assets/imgs/2.jpg')}
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

const { width } = deviceSize
const touchItemSize = (width - GAP_SIZE_S * (COL_NUM + 1)) / COL_NUM
const styles = StyleSheet.create({
  itemContainer: {
    width: touchItemSize,
    // height: touchItemSize,
    borderRadius: 2,
    // backgroundColor: '#fff',
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
    color: FONT_COLOR_M,
    fontSize: FONT_SIZE_M,
    paddingTop: 4,
    paddingBottom: 4,
    paddingLeft: 6,
    paddingRight: 2
  }
})

export default TouchItem