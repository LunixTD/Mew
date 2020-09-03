import React, { Component, ReactInstance } from 'react'
import {
  StyleSheet,
  View,
  Animated,
  Dimensions,
  PanResponder,
  PanResponderInstance,
  PanResponderGestureState,
  ViewStyle,
  InteractionManager
} from 'react-native'
import { get } from 'lodash';

const { width, height } = Dimensions.get('window')

interface ISwiper {
  style: ViewStyle,
  initialPage: number,
  data: any[],
  renderItem: (item: any, index: number) => JSX.Element,
  onIndexChanged: (index: number) => void
}

type JumpParam = 'jumpPrev' | 'jumpNext'
class Swiper extends Component<ISwiper, any> {
  private data: any
  private currentIndex: number
  private maskStatus: boolean
  private canTouch: boolean
  private _panResponder: PanResponderInstance
  constructor(props: ISwiper) {
    super(props)
    this.data = this.props.data
    this.currentIndex = this.props.initialPage
    this.maskStatus = false
    this.canTouch = true
    this.state = {
      renderList: this.getRenderAry(this.currentIndex),
      translateX: new Animated.Value(0)
    }
    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState: PanResponderGestureState) => this.canTouch,
      onMoveShouldSetPanResponder: (evt, gestureState: PanResponderGestureState) => this.canTouch,
      onPanResponderGrant: this._handlePanResponderGrant,
      onPanResponderMove: this._handlePanResponderMove,
      onPanResponderRelease: this._handlePanResponderEnd,
      onPanResponderTerminate: this._handlePanResponderEnd,
    })
  }

  shouldComponentUpdate(nextProps: any, nextState: any) {
    // console.log(this.props.data)
    // console.log(nextProps.data)
    if (this.props.data !== nextProps.data) {
      // const track = this.data[this.currentIndex]
      // const id = get(track, 'id', undefined)
      this.data = nextProps.data
      // if (this.currentIndex > this.data.length - 1) {
      //   this.currentIndex = this.data.length
      // } else {
      //   this.data.map((item, index) => {
          
      //   })
      // }
      this.state.renderList = this.getRenderAry(this.currentIndex)
      // console.log("歌单已经变化")
      // this.jumpTo(nextProps.initialPage)
      return true
    }
    if (this.state.renderList !== nextState.renderList) {
      return true
    } else {
      return false
    }
  }

  _handlePanResponderGrant = (event: Object, gestureState: PanResponderGestureState) => {
    // console.log(1)
  }

  handleTouchInMove = false

  _handlePanResponderMove = (event: Object, gestureState: PanResponderGestureState) => {
    // if (this.handleTouchInMove) {
    //   return
    // }
    const { dx, vx } = gestureState
    return Animated.event([null, {
      dx: this.state.translateX
    }])(event, { dx })
  }

  jupmVal = 0
  _handlePanResponderEnd = (event: Object, gestureState: PanResponderGestureState) => {
    
    // const translateX = this._translateX + dx
    // console.log(gestureState.vx, dx)
    // if (this.handleTouchInMove) {
    //   return
    // }
    const { dx, vx } = gestureState

    if (Math.abs(vx) > 0.2 && dx > 0) {
      // 跳至上一张
      // this.handleTouchInMove = true
      this.jumpPrev()
      return
    } else if (Math.abs(vx) > 0.2 && dx < 0) {
      // 跳至下一张
      // this.handleTouchInMove = true
      this.jumpNext()
      return
    }

    if (Math.abs(dx) <= width * 0.45 && dx > 0) {
      this.jupmVal = 0
      this.canTouch = false
      this.getSwiperAnime(this.jupmVal).start()
      setTimeout(() => {
        this.canTouch = true
      }, 400)
    } else if (Math.abs(dx) <= width * 0.45 && dx < 0) {
      this.jupmVal = 0
      this.canTouch = false
      this.getSwiperAnime(this.jupmVal).start()
      setTimeout(() => {
        this.canTouch = true
      }, 400)
    } else if (Math.abs(dx) > width * 0.45 && dx > 0) {
      // 跳至上一张
      this.jumpPrev()
    } else if (Math.abs(dx) > width * 0.45 && dx < 0) {
      // 跳至下一张
      this.jumpNext()
    }
  }

  jumpPrev = () => {
    if (!this.canTouch) return
    this.canTouch = false
    this.jupmVal = width
    this.getSwiperAnime(this.jupmVal).start()

    setTimeout(() => {
      this.state.translateX.setValue(0)
      this.currentIndex = this.getUsableIndex(this.currentIndex - 1)
      this.setState({
        renderList: this.getRenderAry(this.currentIndex)
      })
    }, 600)
  }

  jumpNext = () => {
    if (!this.canTouch) return
    this.canTouch = false
    this.jupmVal = -width
    this.getSwiperAnime(this.jupmVal).start()

    setTimeout(() => {
      this.state.translateX.setValue(0)
      this.currentIndex = this.getUsableIndex(this.currentIndex + 1)
      this.setState({
        renderList: this.getRenderAry(this.currentIndex)
      })
    }, 600)
  }

  jumpTo = (index: number) => {
    this.currentIndex = index
    this.setState({
      renderList: this.getRenderAry(index)
    })
  }

  getSwiperAnime = (value: any) => {
    return Animated.spring(this.state.translateX, {
      toValue: value,
      stiffness: 100,
      damping: 50,
      mass: 0.5,
      useNativeDriver: true
    })
  }

  swiperAnime = null
  _translateX = 0
  _swiperStyle = {style: {}}
  _swiper = null

  componentDidUpdate() {
    // this.handleTouchInMove = false
    this.canTouch = true
    this.props.onIndexChanged(this.currentIndex)
  }

  // _updateNativeStyles() {
  //   this._swiper && this._swiper.setNativeProps(this._swiperStyle)
  // }

  getRenderAry = (currentIndex: number) => {
    // console.log(currentIndex)
    const index = Number(currentIndex)
    const prevIndex = this.getUsableIndex(index - 1)
    const nextIndex = this.getUsableIndex(index + 1)
    return [prevIndex, index, nextIndex]
  }

  getUsableIndex = (index: number) => {
    const length = this.data.length
    
    if (index < 0) {
      return length - 1
    } else if (index > length - 1) {
      return 0
    } else {
      return index
    }
  }

  renderList = () => {
    const contentW = this.props.style ? this.props.style.width * 3 : null
    const contentH = this.props.style ? this.props.style.height : null
    return (
      <Animated.View
        style={[styles.swiperContentContainer, { width: contentW, height: contentH }, {
          transform: [{
            translateX: this.state.translateX.interpolate({
              inputRange: [-width / 2, width / 2],
              outputRange: [-width / 2, width / 2]
            })
          }]

        }]}
        {...this._panResponder.panHandlers}>
      {
        this.state.renderList.map((item: number, index: number) => {
          // console.log(this.state.renderList)
          return this.props.renderItem(this.data[item], index)
      })
      }
      </Animated.View>
    )
  }

  render() {
    return (
      <View
        style={[styles.container, this.props.style ? this.props.style : null]}>
        {/* {this.renderMask()} */}
        {this.renderList()}
      </View>
    )
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  swiperContentContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    left: -width,
    top: 0,
    zIndex: 10
  }
})

export default Swiper