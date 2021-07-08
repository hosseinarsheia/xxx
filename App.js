import React, { useEffect } from 'react'
import { View, Text, Alert, LogBox } from 'react-native'
import { observable, action, autorun, computed } from 'mobx'
import { inject, observer, useLocalStore } from 'mobx-react'

import BottomSheet from './src/screens/BottomSheet/BoTtomSheet'
import HeadPhoneSlider from './src/screens/HeadPhoneSlider'

LogBox.ignoreAllLogs()

const App = props => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <HeadPhoneSlider />
    </View>
  )
}

export default observer(App)
