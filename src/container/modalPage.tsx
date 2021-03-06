import React, {Component} from 'react'
import {
   View, StyleSheet, Animated
} from 'react-native'
import { connect } from 'react-redux'
import { checkLoginStatusAction } from '../redux/actions/user.action'
import StackNavigator from '@navigator/stackNavigator'
import NavigationService from '../common/js/navigationService'
import AuthPage from './authPage'

import { authPageAnime, authPageCtr } from '../config/animeConfig'
import { deviceWidth, deviceHeight } from '../config/styleConfig'
import { ICommonState } from '../config/interfaces'
import Index from 'container'

export default connect(
  ({ common: { drawerLockMode, authStatus, mainViewStatus } }: { common: ICommonState }) => ({ drawerLockMode, authStatus, mainViewStatus }),
  dispatch => ({
    checkLoginStatusAction: () => dispatch(checkLoginStatusAction())
  })
)(
class ModalPage extends Component<any> {
  constructor(props: any) {
    super(props)
    this.props.checkLoginStatusAction()
  }

  render() {
    const { authStatus, mainViewStatus } = this.props
    return (
      <View style={styles.container}>
        { mainViewStatus === 'unMount' || mainViewStatus === 'notAuth' ? null : 
          <Animated.View
            style={[styles.view, styles.container, {
              opacity: authPageAnime.interpolate({
                inputRange: [0, 0.1, 1],
                outputRange: [1, 0.7, 0]
              }),
              transform: [{
                scale: authPageAnime.interpolate({
                  inputRange: [0, 1],
                  outputRange: [1, 1.1]
                })
              }]
            }]}
          >
            <Index />
          </Animated.View> }
        { authStatus === 'pass' || authStatus === 'notAuth' ? null : 
          <Animated.View
            style={[styles.view, styles.container, {
              opacity: authPageAnime.interpolate({
                inputRange: [0, 0.3, 1],
                outputRange: [0, 0.7, 1]
              }),
              transform: [{
                scale: authPageAnime.interpolate({
                  inputRange: [0, 1],
                  outputRange: [1.1, 1]
                })
              }]
            }]}
          >
            <AuthPage />
          </Animated.View> }
      </View>
    )
  }
})

const styles = StyleSheet.create({
  container: {
    width: deviceWidth,
    height: deviceHeight
  },
  view: {
    position: 'absolute',
    left: 0, top: 0,
  }
})