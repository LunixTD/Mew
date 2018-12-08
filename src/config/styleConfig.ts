import { 
  Dimensions,
  StatusBar,
  StyleSheet,
  FlexStyle
} from 'react-native'

// 获取设备尺寸
export const deviceSize = Dimensions.get('window')

// 状态栏高度
export const statusBarHeight = StatusBar.currentHeight

// flex下居中代码
export const center = { justifyContent: 'center', alignItems: 'center' } as FlexStyle

// Icon尺寸
export const iconSize_M = { width: 36, height: 36 }


// 颜色配置
export const THEME_COLOR = '#d33a32'
