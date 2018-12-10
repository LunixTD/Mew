// Svg Component
import React, { Component, PureComponent } from 'react'
import SvgUri from 'react-native-svg-uri'
import svgs from '../../assets/svg/dist/svgs'

interface SvgProperties {
  icon: string,
  color?: string,
  size: number,
  style?: any
}

export default class Svg extends PureComponent<SvgProperties, {}>{
  render() {
    const {
      icon,
      color,
      size,
      style,
    } = this.props
    let svgXmlData = svgs[icon]

    if (!svgXmlData) {
      let err_msg = `没有"${this.props.icon}"这个icon`
      throw new Error(err_msg)
    }
    return (
      <SvgUri
        width={size}
        height={size}
        svgXmlData={svgXmlData}
        fill={color}
        style={style}
      />
    )
  }
}