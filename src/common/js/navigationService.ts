import { NavigationActions, DrawerActions, StackActions } from 'react-navigation';

let _navigator: any = {}

type types = 'stack' | 'main'
function setTopLevelNavigator(navigatorRef: any, type: types) {
  _navigator[type] = navigatorRef;
}

function stackNavigate(routeName: string, params?: any) {
  if (routeName === 'back') {
    _navigator.stack.dispatch(
      NavigationActions.back()
    )
  } else {
    _navigator.stack.dispatch(
      NavigationActions.navigate({
        routeName,
        params,
      })
    )
  }
}

type actions = 'open' | 'close' | 'toggle'
function drawerNavigate(actions: actions) {
  switch(actions) {
    case 'open':
      _navigator.main.dispatch(DrawerActions.openDrawer())
      break
    case 'close':
      _navigator.main.dispatch(DrawerActions.closeDrawer())
      break
    case 'toggle':
      _navigator.main.dispatch(DrawerActions.toggleDrawer())
      break
    default:
      console.log('Error drawer actions')
      break
  }
}

function modalNavigate(routeName: string, params?: any) {
  _navigator.main.dispatch(
    NavigationActions.navigate({
      routeName,
      params,
    })
  )
}

function resetStackNavigation(routeName: string) {
  const resetAction = StackActions.reset({
    index: 0,
    actions: [NavigationActions.navigate({ routeName })]
  })
  _navigator.main.dispatch(resetAction)
}

export default {
  stackNavigate,
  drawerNavigate,
  modalNavigate,
  resetStackNavigation,
  setTopLevelNavigator,
}