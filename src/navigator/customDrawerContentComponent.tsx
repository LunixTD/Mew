import React, { Component } from 'react'
import {
  Text,
  StyleSheet,
  View,
  TouchableNativeFeedback
} from 'react-native'
import { SafeAreaView } from "react-navigation"
import {
  DrawerItems,
  DrawerContentComponentProps
} from 'react-navigation-drawer'
import { Action } from 'redux'
import { connect } from 'react-redux'
import { logoutStartAction } from '../redux/actions/user.action'
import { deviceWidth, FONT_SIZE_EL, FONT_COLOR_M, PX_1, GAP_COLOR_M, drawerW } from '../config/styleConfig'
import IconFont from '../components/icon'

interface IDrawerItemsProps extends DrawerContentComponentProps {
  logoutStartAction: () => Action
}
export default function (props: IDrawerItemsProps) {
  return (
    <CustomDrawerContentComponent {...props} />
  )
}

const CustomDrawerContentComponent = connect(
  null,
  dispatch => ({
    logoutStartAction: () => dispatch(logoutStartAction())
  })
)(
  class CustomDrawerContentComponent extends Component<IDrawerItemsProps, any> {
    logOut = () => {
      this.props.logoutStartAction()
    }
  
    renderBottomFixed = () => {
      return (
        <View style={styles.bottomFixed}>
          <TabItem icon='logout' text='登出' onPress={this.logOut}/>
        </View>
      )
    }
  
    render() {
      return (
        <SafeAreaView
          style={{ flex: 1, paddingTop: 0 }}
          forceInset={{ top: 'always', horizontal: 'never' }}
        >
          <DrawerItems {...this.props} />
          <Text>sdfsddf</Text>
          { this.renderBottomFixed() }
        </SafeAreaView>
      )
    }
  }
)



interface IItemProps {
  icon: string,
  text: string,
  onPress: () => any
}
class TabItem extends Component<IItemProps> {
  render() {
    const props = this.props
    return (
      <TouchableNativeFeedback
        onPress={() => this.props.onPress()}
      >
        <View style={styles.tabItem}>
          <IconFont
            style={styles.icon}
            name={props.icon}
            size={28}
            color='#333'
          />
          <Text style={styles.gap}>{props.text}</Text>
        </View>
      </TouchableNativeFeedback>
    )
  }
}

const styles = StyleSheet.create({
  bottomFixed: {
    position: 'absolute',
    left: 0, bottom: 0,
    width: drawerW,
    height: 48,
    borderTopWidth: PX_1,
    borderTopColor: GAP_COLOR_M,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  tabItem: {
    flex: 1,
    height: 48,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  gap: {
    fontSize: FONT_SIZE_EL,
    color: FONT_COLOR_M
  },
  icon: {
    marginLeft: 10,
    marginRight: 10
  }
})