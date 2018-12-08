import React, { Component } from 'react'
import {
  Text
} from 'react-native'
import { 
  DrawerItemsProps,
  SafeAreaView,
  DrawerItems
} from "react-navigation"

export default function (props: DrawerItemsProps) {
  return (
    <SafeAreaView
      style={{ flex: 1, paddingTop: 0 }}
      forceInset={{ top: 'always', horizontal: 'never' }}
    >
      <DrawerItems {...props} />
    </SafeAreaView>
  )
}