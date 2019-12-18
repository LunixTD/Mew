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
  'favor': '\ue638',
  'perfect': '\ue60b',
  'title-more': '\ue662',
  // bottomBox
  'list': '\ue640',
  'play': '\ue77e',
  'pause': '\ue79f',
  // header
  'back': '\ue636',
  'share': '\ue63e',
  // userPage
  'localMusic': '\ue623',
  'history': '\ue62e',
  'downloaded': '\ue610',
  'myFavor': '\ue627',
  'album-arrow': '\ue6ac',
  'album-config': '\ue63d',
  // albumPage
  'album-cmt': '\ue600',
  'album-share': '\ue603',
  'album-dld': '\ue601',
  'album-multi': '\ue602',
  'album-more': '\ue604',
  // index
  'mobile': '\ue628',
  'pwd': '\ue62a',
  'userName': '\ue62c',
  'verification': '\ue629',
  'delete': '\ue62d',
  // drawer
  'logout': '\ue846',
  // playlistModal
  'shuffle': '\ue64b',
  'removeAll': '\ue792',
}

 export default createIconSet(glyphMap, 'iconfont')