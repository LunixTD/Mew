import { 
  Dimensions,
  StatusBar,
  StyleSheet,
  FlexStyle
} from 'react-native'

// 获取设备尺寸
const deviceSize = Dimensions.get('window')
export const deviceWidth = deviceSize.width
export const deviceHeight = deviceSize.height

const NUM = deviceWidth / 100

// 1px
export const PX_1 = 1 / deviceSize.scale

// 状态栏高度
export const statusBarHeight: any = StatusBar.currentHeight

// drawer宽度
export const drawerW = deviceWidth * 0.85

// flex下居中代码
export const centering = { justifyContent: 'center', alignItems: 'center' } as FlexStyle
export const filling = { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 } as FlexStyle

// 定义主界面每行容纳的touchItem元素个数
export const COL_NUM = 3

// banner长宽比
export const BANNER_RADIO =  1.74

// 底部musicbox高度
export const musicBoxH = 50

// Icon尺寸
export const ICON_SIZE_M = { width: 36, height: 36 }

// 间隙大小
export const GAP_SIZE_M = 12
export const GAP_SIZE_S = 6
export const GAP_SIZE_1 = NUM * 0.75
export const GAP_SIZE_2 = NUM * 1.5

// 间隙颜色
export const GAP_COLOR_M = '#e5e5e5'

// 颜色配置
export const THEME_COLOR = '#d33a32'
export const THEME_COLOR_DARK = '#b7302c'

// 背景配色 { M: main, W: worm, G: grey, D: dark, H: header }
export const BACKGROUND_M = '#fefefe'
export const BACKGROUND_W = '#f3f3f3'
export const BACKGROUND_G = '#f5f6f8'
export const BACKGROUND_D = '#24292e'
export const BACKGROUND_H_D = '#343642'

// 文字配色 { M: main, S: shallow, W: white, G: grey }
export const FONT_COLOR_M = '#333'
export const FONT_COLOR_S = '#4c4c4c'
export const FONT_COLOR_SS = '#7A7A7A'
export const FONT_COLOR_G = '#737373'
export const FONT_COLOR_W = '#EFF3F8'

// 字体尺寸
export const FONT_SIZE_M = 12
export const FONT_SIZE_L = 14
export const FONT_SIZE_EL = 16
export const FONT_SIZE_ML = 18
export const FONT_SIZE_TITLE4 = 26

// 边框色
export const BORDER_COLOR_M = 'rgba(0,0,0,0.05)'
