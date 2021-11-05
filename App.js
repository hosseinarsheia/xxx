import React, { useEffect } from 'react'
import { View, Text, Alert, LogBox, Button, Animated } from 'react-native'
import { observable, action, autorun, computed } from 'mobx'
import { inject, observer, useLocalStore } from 'mobx-react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { enableScreens } from 'react-native-screens'
import { createSharedElementStackNavigator } from 'react-navigation-shared-element'
import { Provider } from 'react-redux'
import { store } from './src/ReduXStore/store'

// Reactive Channel Animations
import ImageZoom from './src/screens/Reactive/ImageZoom'
import CircleProgressBar from './src/screens/Reactive/CircleProgressBar'
import SwipeToDelete from './src/screens/Reactive/SwipeToDelete'
import LinearColorPicker from './src/screens/Reactive/LinearColorPicker/index.js'

// Funcsio Channel Animations
import SwipeButton from './src/screens/Funcsio/SwipeButton'

// CatalinMiron Channel Animations
import TextAnimationScreen from './src/screens/CatalinMiron/TextAnimationScreen'
import BirthdaySliderScreen from './src/screens/CatalinMiron/BirthdaySliderScreen'
import AnimatedTab from './src/screens/CatalinMiron/AnimatedTab'
import ReAnimatedTab from './src/screens/CatalinMiron/AnimatedTab/ReAnimatedTab'
import BottomSheet from './src/screens/BottomSheet/BottomSheet'
import HeadPhoneSliderAnimated from './src/screens/CatalinMiron/HeadPhoneSlider/HeadPhoneSliderAnimated'
import HeadPhoneSliderRe_Animated from './src/screens/CatalinMiron/HeadPhoneSlider/HeadPhoneSliderRe_Animated'
import LinearProgressBar from './src/screens/CatalinMiron/LinearProgressBar/LinearProgressBar'
import LinearProgressBarReanimated from './src/screens/CatalinMiron/LinearProgressBar/LinearProgressBarReanimated'
import SliderSquareBackground from './src/screens/CatalinMiron/SliderSquareBackground/SliderSquareBackground'
import SliderSquareBackgroundReAnimated from './src/screens/CatalinMiron/SliderSquareBackground/SliderSquareBackgroundReAnimated'
import Timer from './src/screens/CatalinMiron/Timer/Timer'
import TimerReanimated from './src/screens/CatalinMiron/Timer/TimerReanimated'
import ZaraApp from './src/screens/CatalinMiron/ZaraApp/ZaraApp'
import SharedElement from './src/screens/CatalinMiron/SharedElement'
import SecondScreen from './src/screens/CatalinMiron/SharedElement/SecondScreen'
import StackCoursel from './src/screens/CatalinMiron/StackCoursel'
import SharedElement2 from './src/screens/CatalinMiron/SharedElement2'
import TravlelList from './src/screens/CatalinMiron/SharedElement2/TravlelList'
import SharedElement3 from './src/screens/CatalinMiron/SharedElement3'

import Redux from './src/screens/Redux'
import TestingAnimations from './src/screens/TestingAnimations'

import { ICON_LIST, PRODUCT_LIST } from './src/res/data'

enableScreens()

LogBox.ignoreAllLogs()
const { Navigator, Screen } = createSharedElementStackNavigator()

// const ButtonsComponent = ({ navigation, firstScreen, SecondScreen }) => {
//   return (
//     <View style={{ padding: 10 }}>
//       <View>
//         <Button title={`${firstScreen}`} onPress={() => navigation.navigate(`${firstScreen}`)} />
//         {SecondScreen && (
//           <Button title={SecondScreen} onPress={() => navigation.navigate(SecondScreen)} />
//         )}
//       </View>
//     </View>
//   )
// }

// const MenuScreen = ({ navigation }) => {
//   return (
//     <View style={{ flex: 1, alignItems: 'center' }}>
//       <ButtonsComponent navigation={navigation} firstScreen={SCREENS.BottomSheet} />

//       <ButtonsComponent
//         navigation={navigation}
//         firstScreen={SCREENS.HeadPhoneSliderAnimated}
//         SecondScreen={SCREENS.HeadPhoneSliderRe_Animated}
//       />

//       <ButtonsComponent
//         navigation={navigation}
//         firstScreen={SCREENS.LinearProgressBar}
//         SecondScreen={SCREENS.LinearProgressBarReanimated}
//       />
//       <ButtonsComponent
//         navigation={navigation}
//         firstScreen={SCREENS.SliderSquareBackground}
//         SecondScreen={SCREENS.SliderSquareBackgroundReAnimated}
//       />
//       <ButtonsComponent
//         navigation={navigation}
//         firstScreen={SCREENS.Timer}
//         SecondScreen={SCREENS.TimerReanimated}
//       />
//       <ButtonsComponent navigation={navigation} firstScreen={SCREENS.ZaraApp} />
//     </View>
//   )
// }

// const options = () => ({
//   gestureEnabled: false,
//   transitionSpec: {
//     open: { animation: 'timing', config: { duration: 40 } },
//     close: { animation: 'timing', config: { duration: 40 } },
//   },

//   cardStyleInterpolator: ({ current }) => {
//     return {
//       cardStyle: { opacity: current.progress },
//     }
//   },
// })

const App = props => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Navigator initialRouteName="TextAnimationScreen" headerMode="none">
          {/* /********************************************************************* */}
          <Screen name="TestingAnimations" component={TestingAnimations} />
          <Screen name="TextAnimationScreen" component={TextAnimationScreen} />
        </Navigator>
      </NavigationContainer>
    </Provider>
  )
}

export default observer(App)
