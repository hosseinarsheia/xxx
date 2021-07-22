import React, { useEffect } from 'react'
import { View, Text, Alert, LogBox } from 'react-native'
import { observable, action, autorun, computed } from 'mobx'
import { inject, observer, useLocalStore } from 'mobx-react'

import BottomSheet from './src/screens/BottomSheet/BottomSheet'
import HeadPhoneSliderAnimated from './src/screens/HeadPhoneSlider/HeadPhoneSliderAnimated'
import HeadPhoneSliderRe_Animated from './src/screens/HeadPhoneSlider/HeadPhoneSliderRe_Animated'
import AnimatedTab from './src/screens/AnimatedTab/AnimatedTab'
import LinearProgressBar from './src/screens/LinearProgressBar/LinearProgressBar'
import LinearProgressBarReanimated from './src/screens/LinearProgressBar/LinearProgressBarReanimated'
import SliderSquareBackground from './src/screens/SliderSquareBackground/SliderSquareBackground'
import SliderSquareBackgroundReAnimated from './src/screens/SliderSquareBackground/SliderSquareBackgroundReAnimated'
import Timer from './src/screens/Timer/Timer'
import TimerReanimated from './src/screens/Timer/TimerReanimated'
import ZaraApp from './src/screens/ZaraApp/ZaraApp'

LogBox.ignoreAllLogs()

const App = props => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      {/* <BottomSheet /> */}

      {/* <HeadPhoneSliderAnimated /> */}
      {/* <HeadPhoneSliderRe_Animated /> */}

      {/* <LinearProgressBar /> */}
      {/* <LinearProgressBarReanimated /> */}

      {/* <SliderSquareBackground /> */}
      {/* <SliderSquareBackgroundReAnimated /> */}

      <Timer />
      {/* <TimerReanimated /> */}

      {/* <ZaraApp /> */}
    </View>
  )
}

export default observer(App)
