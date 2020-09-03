import React, { Component } from 'react'
import {
  StyleSheet,
  View,
  Text
} from 'react-native'

import Swiper from 'react-native-swiper'
import refService from '../common/js/refService'

interface ISwiper {
  refName?: string,
  style: object,
  loop: boolean,
  autoplay: boolean,
  autoplayTimeout?: number,
  horizontal: boolean,
  onIndexChanged?: (index: number) => any
}

interface IProps {
  config: ISwiper
}

class Banner extends Component<IProps, any> {
  private config: any
  private _swiper: any

  constructor(props: IProps) {
    super(props)
    this.config = this.props.config || {}
  }

  componentDidMount() {
    refService.setRefBox(this.config.refName, this._swiper)
  }

  componentDidUpdate() {
    // this._swiper.scrollBy(0, false)
  }
  
  renderSwiper() {
    const { style, loop, autoplay, autoplayTimeout, horizontal, onIndexChanged } = this.config
    return (
      <Swiper
        ref={(ref) => this._swiper = ref}
        style={style}
        loop={loop}
        autoplay={autoplay}
        autoplayTimeout={autoplayTimeout}
        horizontal={horizontal}
        onIndexChanged={onIndexChanged}
        showsPagination={false}
        showsButtons={false}
        loadMinimal={true}
      >
        {this.props.children}
      </Swiper>
    )
  }

  render() {
    
    return (
      this.renderSwiper()
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
})

export default Banner