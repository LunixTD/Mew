import React, { Component } from 'react'
import {
  StyleSheet,
  View,
  Text
} from 'react-native'

import Swiper from 'react-native-swiper'

interface ISwiper {
  refName?: string,
  style: object,
  loop: boolean,
  autoplay: boolean,
  autoplayTimeout?: number,
  horizontal: boolean,
  onIndexChanged?: () => {}
}

interface IProps {
  config: ISwiper
}

class Banner extends Component<IProps, any> {
  private config: any
  private swiper: any

  constructor(props: IProps) {
    super(props)
    this.config = this.props.config || {}
  }

  render() {
    const { style, loop, autoplay, autoplayTimeout, horizontal, onIndexChanged } = this.config
    return (
      <Swiper
        ref={(ref) => this.swiper = ref}
        style={style}
        loop={loop}
        autoplay={autoplay}
        autoplayTimeout={autoplayTimeout}
        horizontal={horizontal}
        onIndexChanged={onIndexChanged}
        showsPagination={false}
        showsButtons={false}
      >
        {this.props.children}
      </Swiper>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
})

export default Banner