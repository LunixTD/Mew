import { NavigationActions, DrawerActions } from 'react-navigation';

let _navigator: any = {}

type types = 'stack' | 'drawer'
function setTopLevelNavigator(navigatorRef: any, type: types) {
  _navigator[type] = navigatorRef;
}

function stackNavigate(routeName: string, params?: any) {
  _navigator.stack.dispatch(
    NavigationActions.navigate({
      routeName,
      params,
    })
  );
}

type actions = 'open' | 'close' | 'toggle'
function drawerNavigate(actions: actions) {
  switch(actions) {
    case 'open':
      _navigator.drawer.dispatch(DrawerActions.openDrawer())
      break
    case 'close':
      _navigator.drawer.dispatch(DrawerActions.closeDrawer())
      break
    case 'toggle':
      _navigator.drawer.dispatch(DrawerActions.toggleDrawer())
      break
    default:
      console.log('Error drawer actions')
      break
  }
}

export default {
  stackNavigate,
  drawerNavigate,
  setTopLevelNavigator,
}