import React, { Component } from 'react'
import {
  StyleSheet,
  View,
  Text,
  TouchableWithoutFeedback,
  TouchableOpacity,
  ViewStyle,
  TextStyle,
  RegisteredStyle,
  BackHandler,
  TextInput,
  Keyboard
} from 'react-native'
import { Dispatch, Action } from 'redux'
import { loginStartAction } from '../redux/actions/user.action'
import { NormalHeader } from '../components/header'
import IconFont from '../components/icon'
import { toast } from '../common/js/nativeModules'

import { THEME_COLOR, deviceWidth, deviceHeight, centering, FONT_COLOR_M, THEME_COLOR_DARK } from '../config/styleConfig'
import { connect } from 'react-redux'

interface IAuthProps {
  loginStartAction: (type: string, identity: string, password: string) => Action
}

interface IAuthState {
  pageStatus: 'index' | 'login' | 'register',
  mobile: string,
  password: string,
}

class AuthPage extends Component<IAuthProps, IAuthState> {
  private _inputMobile: any
  private _inputPwd: any
  constructor(props: any) {
    super(props)
    this.state = {
      pageStatus: 'index',
      mobile: '',
      password: ''
    }
  }

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', () => {
      if (this.state.pageStatus === 'index') {
        return true
      } else {
        this.setState({
          pageStatus: 'index'
        })
        return true
      }
    })
  }

  toLoginPage = () => {
    this.setState({
      pageStatus: 'login'
    })
  }

  toRegisterPage = () => {
    this.setState({
      pageStatus: 'register'
    })
  }

  onLeftIconPress = () => {
    this.setState({
      pageStatus: 'index'
    })
  }

  onChangeText = (keyValue: string) => {
    this.setState({
      mobile: keyValue.replace(/[^0-9]/g, '')
    })
  }

  onDeletePress = () => {
    this.setState({
      mobile: ''
    })
  }

  onLoginPress = () => {
    const mobile = this._inputMobile._lastNativeText
    const pwd = this._inputPwd._lastNativeText
    if (mobile.length < 11) {
      toast('请输入11位的手机号', 1000)
      return
    }
    if (!pwd) {
      toast('请输入密码', 1000)
      return
    }
    Keyboard.dismiss()
    this.props.loginStartAction('mobile', mobile, pwd)
  }

  onRegisterPress = () => {
    alert('注册')
  }

  renderIndex = () => {
    return (
      <View style={styles.indexContainer}>
        <IndexBtn
          text='手机号登陆'
          style={styles.indexBtn}
          textStyle={styles.indexBtnText}
          pressedStyle={styles.indexBtnPressed}
          pressedTextStyle={styles.indexBtnTextPressed}
          onPress={this.toLoginPage}
        />
        <IndexBtn
          text='注册'
          style={styles.indexBtn}
          textStyle={styles.indexBtnText}
          pressedStyle={styles.indexBtnPressed}
          pressedTextStyle={styles.indexBtnTextPressed}
          onPress={this.toRegisterPage}
        />
      </View>
    )
  }

  renderLogin = () => {
    return (
      <View style={styles.loginPage}>
        <NormalHeader
          style={styles.header}
          containStatusBar={true}
          title='手机号登陆'
          leftIcon='back'
          onLeftIconPress={this.onLeftIconPress}
        />
        <View style={styles.inputView}>
          <IconFont
            style={styles.icon}
            name='mobile'
            size={20}
            color='#bcbcbc'
          />
          <TextInput
            ref={(ref) => this._inputMobile = ref}
            keyboardType='numeric'
            value={this.state.mobile}
            autoFocus={true}
            maxLength={11}
            style={styles.input}
            placeholder='请输入手机号'
            placeholderTextColor='#cecece'
            selectionColor={THEME_COLOR}
            onChangeText={this.onChangeText}
          />
          {
            this.state.mobile === '' ? null : 
            <TouchableWithoutFeedback
              onPress={this.onDeletePress}
            >
              <IconFont
                style={styles.icon}
                name='delete'
                size={14}
                color='#bcbcbc'
              />
            </TouchableWithoutFeedback>
          }
        </View>
        <View style={styles.inputView}>
          <IconFont
            style={styles.icon}
            name='pwd'
            size={20}
            color='#bcbcbc'
          />
          <TextInput
            ref={(ref) => this._inputPwd = ref}
            secureTextEntry={true}
            style={styles.input}
            placeholder='请输入密码'
            placeholderTextColor='#cecece'
            selectionColor={THEME_COLOR}
          />
          <TouchableOpacity
            style={styles.findPwdBtn}
          >
            <Text style={styles.findPwdText}>忘记密码?</Text>
          </TouchableOpacity>
        </View>
        <IndexBtn
          text='登 陆'
          style={[styles.indexBtn, styles.loginBtn]}
          textStyle={styles.loginBtnText}
          pressedStyle={styles.loginBtnPressed}
          pressedTextStyle={null}
          onPress={this.onLoginPress}
        />
      </View>
    )
  }

  renderRegister = () => {
    return (
      null
    )
  }

  getPage = () => {
    const pageStatus = this.state.pageStatus
    switch(pageStatus) {
      case 'index':
        return this.renderIndex()
      case 'login':
        return this.renderLogin()
      case 'register':
        return this.renderRegister()
    }
  }

  render() {
    return (
      <View style={styles.container}>
        {
          this.getPage()
        }
      </View>
    )
  }
}

interface IBtnProps {
  text: string,
  style: RegisteredStyle<ViewStyle> | RegisteredStyle<ViewStyle>[],
  textStyle: RegisteredStyle<TextStyle>,
  pressedStyle: RegisteredStyle<ViewStyle>,
  pressedTextStyle: RegisteredStyle<TextStyle> | null,
  onPress: () => void
}

class IndexBtn extends Component<IBtnProps, any> {
  constructor(props: IBtnProps) {
    super(props)
    this.state = {
      isPressed: false
    }
  }

  onPress = () => {
    this.props.onPress()
  }

  onBtnPressIn = () => {
    this.setState({
      isPressed: true
    })
  }

  onBtnPressOut = () => {
    this.setState({
      isPressed: false
    })
  }

  render() {
    const props = this.props
    return (
      <TouchableWithoutFeedback
        onPress={this.onPress}
        onPressIn={this.onBtnPressIn}
        onPressOut={this.onBtnPressOut}>
        <View style={[props.style, this.state.isPressed ? props.pressedStyle : null]}>
          <Text style={[props.textStyle, this.state.isPressed ? props.pressedTextStyle : null]}>{this.props.text}</Text>
        </View>
      </TouchableWithoutFeedback>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  indexContainer: {
    flex: 1,
    height: deviceHeight * 0.6,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  indexBtn: {
    flexDirection: 'row',
    ...centering,
    width: deviceWidth * 0.8,
    height: 42,
    borderWidth: 1,
    borderColor: THEME_COLOR,
    borderRadius: 21,
    marginTop: 7,
    marginBottom: 7
  } as ViewStyle,
  indexBtnPressed: {
    backgroundColor: THEME_COLOR
  } as ViewStyle,
  indexBtnText: {
    fontSize: 18,
    color: THEME_COLOR
  } as TextStyle,
  indexBtnTextPressed: {
    color: '#fff'
  } as TextStyle,

  // loginPage
  header: {
    marginBottom: 35,
  },
  loginPage: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  inputView: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-end',
    width: deviceWidth * 0.9,
    height: 40,
    borderBottomWidth: 1,
    borderBottomColor: '#dbdbdb',
    marginBottom: 15
  },
  icon: {
    width: 32,
    height: 32,
    textAlign: 'center',
    textAlignVertical: 'center'
  },
  input: {
    flex: 1,
    height: 30,
    fontSize: 16,
    color: FONT_COLOR_M,
    paddingVertical: 0,
  },
  loginBtn: {
    width: deviceWidth * 0.9,
    borderWidth: 0,
    backgroundColor: THEME_COLOR,
    marginTop: 20
  } as ViewStyle,
  loginBtnPressed: {
    backgroundColor: THEME_COLOR_DARK
  } as ViewStyle,
  loginBtnText: {
    fontSize: 16,
    color: '#fff'
  } as TextStyle,
  findPwdBtn: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
    width: 70,
    height: 30,
  },
  findPwdText: {
    flex: 1,
    lineHeight: 30,
    color: '#68829b',
    fontSize: 14,
  }
})

function mapDispatchToProps(dispatch: Dispatch<Action>) {
  return {
    loginStartAction: (type: string, identity: string, password: string) => dispatch(loginStartAction(type, identity, password))
  }
}

export default connect(
  null, mapDispatchToProps
)(AuthPage)