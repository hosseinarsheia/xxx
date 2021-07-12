import React, { useEffect } from 'react'
import { View, Text, Alert, LogBox } from 'react-native'
import { observable, action, autorun, computed } from 'mobx'
import { inject, observer, useLocalStore } from 'mobx-react'

import BottomSheet from './src/screens/BottomSheet/BoTtomSheet'
import HeadPhoneSliderAnimated from './src/screens/HeadPhoneSlider/HeadPhoneSliderAnimated'
import HeadPhoneSliderRe_Animated from './src/screens/HeadPhoneSlider/HeadPhoneSliderRe_Animated'
import MiniSlider from './src/screens/MiniSlider/MiniSlider'

LogBox.ignoreAllLogs()

const App = props => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      {/* <HeadPhoneSliderAnimated /> */}
      <HeadPhoneSliderRe_Animated />
      {/* <MiniSlider /> */}
    </View>
  )
}

export default observer(App)
