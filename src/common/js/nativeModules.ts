import { NativeModules } from 'react-native'

export function toast(text: string, duration: number) {
  const nativeModules = NativeModules.OpenNativeModule
  nativeModules.toast(text, duration)
}