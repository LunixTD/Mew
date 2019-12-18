import { NetInfo } from 'react-native'

NetInfo.isConnected.fetch().then((isConnected: boolean) => {
    console.log(isConnected)
})