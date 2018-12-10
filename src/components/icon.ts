import { createIconSet }  from 'react-native-vector-icons'

const glyphMap = {
  // tabbar
  'menu': '\ue643',
  'search': '\ue637',
  'tab-msg': '\ue61f',
  'tab-home': '\ue612',
  'tab-user': '\ue615',
  // homePage
  'recommend': '\ue60e',
  'favor': '\ue60d',
  'perfect': '\ue60b',
  'title-more': '\ue662',
  // bottomBox
  'list': '\ue640',
  'play': '\ue77e',
  'pause': '\ue79f',
}

 export default createIconSet(glyphMap, 'iconfont')