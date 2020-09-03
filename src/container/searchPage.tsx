import React, { Component } from 'react'
import {
  StyleSheet,
  View,
  Image,
  Dimensions
} from 'react-native'
import Swiper from '../components/swiper'

const { width, height } = Dimensions.get('window')

const banner_list = [
  require('../../assets/banner/1.jpg'),
  require('../../assets/banner/2.jpg'),
  require('../../assets/banner/3.jpg'),
  require('../../assets/banner/4.jpg'),
]

class SearchPage extends Component {
  swiperRenderItem = (item: any, index: number) => {
    return (
      <View style={styles.swiperItem} key={index}>
        <Image source={item} style={styles.swiperItem}/>
      </View>
    )
  }
  
  onIndexChanged = () => {
    
  }

  render() {
    return (
      <View style={styles.container}>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'blue'
  },
  swiperItem: {
    width: width,
    height: 200,
  }
})

export default SearchPage