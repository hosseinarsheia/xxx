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

import TextAnimationScreen from './src/screens/1_TextAnimationScreen'
import BirthdaySliderScreen from './src/screens/2_BirthdaySliderScreen'

import Onboarding1 from './src/screens/UIScreens/Apart/screens/Onboarding1'
import Redux from './src/screens/Redux'

// import BottomSheet from './src/screens/BottomSheet/BottomSheet'
// import HeadPhoneSliderAnimated from './src/screens/HeadPhoneSlider/HeadPhoneSliderAnimated'
// import HeadPhoneSliderRe_Animated from './src/screens/HeadPhoneSlider/HeadPhoneSliderRe_Animated'
// import AnimatedTab from './src/screens/AnimatedTab/AnimatedTab'
// import LinearProgressBar from './src/screens/LinearProgressBar/LinearProgressBar'
// import LinearProgressBarReanimated from './src/screens/LinearProgressBar/LinearProgressBarReanimated'
// import SliderSquareBackground from './src/screens/SliderSquareBackground/SliderSquareBackground'
// import SliderSquareBackgroundReAnimated from './src/screens/SliderSquareBackground/SliderSquareBackgroundReAnimated'
// import Timer from './src/screens/Timer/Timer'
// import TimerReanimated from './src/screens/Timer/TimerReanimated'
// import ZaraApp from './src/screens/ZaraApp/ZaraApp'
// import SharedElement from './src/screens/SharedElement'
// import SecondScreen from './src/screens/SharedElement/SecondScreen'
// import StackCoursel from './src/screens/StackCoursel'
// import SharedElement2 from './src/screens/SharedElement2'
// import TravlelList from './src/screens/SharedElement2/TravlelList'
// import SharedElement3 from './src/screens/SharedElement3'

import { ICON_LIST, PRODUCT_LIST } from './src/res/data'

enableScreens()

LogBox.ignoreAllLogs()
const Stack = createSharedElementStackNavigator()

const SCREENS = {
  BottomSheet: 'BottomSheet',
  HeadPhoneSliderAnimated: 'HeadPhoneSliderAnimated',
  HeadPhoneSliderRe_Animated: 'HeadPhoneSliderRe_Animated',
  LinearProgressBar: 'LinearProgressBar',
  LinearProgressBarReanimated: 'LinearProgressBarReanimated',
  SliderSquareBackground: 'SliderSquareBackground',
  SliderSquareBackgroundReAnimated: 'SliderSquareBackgroundReAnimated',
  Timer: 'Timer',
  TimerReanimated: 'TimerReanimated',
  ZaraApp: 'ZaraApp',
  MenuScreen: 'MenuScreen',
  SharedElement: 'SharedElement',
  SecondScreen: 'SecondScreen',
  StackCoursel: 'StackCoursel',
  SharedElement2: 'SharedElement2',
  TravlelList: 'TravlelList',
  SharedElement3: 'SharedElement3',
}

const ButtonsComponent = ({ navigation, firstScreen, SecondScreen }) => {
  return (
    <View style={{ padding: 10 }}>
      <View>
        <Button title={`${firstScreen}`} onPress={() => navigation.navigate(`${firstScreen}`)} />
        {SecondScreen && <Button title={SecondScreen} onPress={() => navigation.navigate(SecondScreen)} />}
      </View>
    </View>
  )
}

const MenuScreen = ({ navigation }) => {
  return (
    <View style={{ flex: 1, alignItems: 'center' }}>
      <ButtonsComponent navigation={navigation} firstScreen={SCREENS.BottomSheet} />

      <ButtonsComponent
        navigation={navigation}
        firstScreen={SCREENS.HeadPhoneSliderAnimated}
        SecondScreen={SCREENS.HeadPhoneSliderRe_Animated}
      />

      <ButtonsComponent
        navigation={navigation}
        firstScreen={SCREENS.LinearProgressBar}
        SecondScreen={SCREENS.LinearProgressBarReanimated}
      />
      <ButtonsComponent
        navigation={navigation}
        firstScreen={SCREENS.SliderSquareBackground}
        SecondScreen={SCREENS.SliderSquareBackgroundReAnimated}
      />
      <ButtonsComponent navigation={navigation} firstScreen={SCREENS.Timer} SecondScreen={SCREENS.TimerReanimated} />
      <ButtonsComponent navigation={navigation} firstScreen={SCREENS.ZaraApp} />
    </View>
  )
}

const options = () => ({
  gestureEnabled: false,
  transitionSpec: {
    open: { animation: 'timing', config: { duration: 40 } },
    close: { animation: 'timing', config: { duration: 40 } },
  },

  cardStyleInterpolator: ({ current }) => {
    return {
      cardStyle: { opacity: current.progress },
    }
  },
})

const App = props => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Redux" headerMode="none">
          {/* /********************************************************************* */}

          <Stack.Screen name="TextAnimationScreen" component={TextAnimationScreen} />
          <Stack.Screen name="BirthdaySliderScreen" component={BirthdaySliderScreen} />

          <Stack.Screen name="Onboarding1" component={Onboarding1} />

          <Stack.Screen name="Redux" component={Redux} />

          {/*   <Stack.Screen name="SharedElement" component={SharedElement} />
        <Stack.Screen
          name="SecondScreen"
          component={SecondScreen}
          sharedElementsConfig={(route, otherRoute, showing) => ICON_LIST.map(value => value.id)}
          options={options}
        />

    
        <Stack.Screen name={SCREENS.SharedElement2} component={SharedElement2} />
        <Stack.Screen name={SCREENS.TravlelList} component={TravlelList} />

        <Stack.Screen name={SCREENS.SharedElement3} component={SharedElement3} />

        <Stack.Screen name={SCREENS.MenuScreen} component={MenuScreen} />

        <Stack.Screen name={SCREENS.BottomSheet} component={BottomSheet} />

        <Stack.Screen name={SCREENS.TimerReanimated} component={TimerReanimated} />
        <Stack.Screen name={SCREENS.Timer} component={Timer} />

        <Stack.Screen name={SCREENS.ZaraApp} component={ZaraApp} />

        <Stack.Screen name={SCREENS.HeadPhoneSliderAnimated} component={HeadPhoneSliderAnimated} />
        <Stack.Screen name={SCREENS.HeadPhoneSliderRe_Animated} component={HeadPhoneSliderRe_Animated} />

        <Stack.Screen name={SCREENS.LinearProgressBar} component={LinearProgressBar} />
        <Stack.Screen name={SCREENS.LinearProgressBarReanimated} component={LinearProgressBarReanimated} />

        <Stack.Screen name={SCREENS.SliderSquareBackground} component={SliderSquareBackground} />
        <Stack.Screen name={SCREENS.SliderSquareBackgroundReAnimated} component={SliderSquareBackgroundReAnimated} />

        <Stack.Screen name={SCREENS.StackCoursel} component={StackCoursel} /> */}
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  )
}

export default observer(App)
