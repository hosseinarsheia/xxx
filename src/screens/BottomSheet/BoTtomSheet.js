import React, { Fragment, useRef } from 'react'
import { View, Button, StyleSheet, useWindowDimensions } from 'react-native'
import { observer } from 'mobx-react'

import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  useAnimatedGestureHandler,
  withTiming,
} from 'react-native-reanimated'
import { PanGestureHandler } from 'react-native-gesture-handler'

const BottomSheet = () => {
  const windowHeight = useWindowDimensions().height
  const windowWidth = useWindowDimensions().width
  const Mytop = useRef(useSharedValue(windowHeight)).current

  const eventHandler = useAnimatedGestureHandler({
    onStart: (event, ctx) => (ctx.initialHeight = Mytop.value),
    onActive: (event, ctx) => (Mytop.value = ctx.initialHeight + event.translationY),
    onEnd: (event, ctx) => {
      if (Mytop.value > windowHeight / 2 - 50) Mytop.value = windowHeight
      else Mytop.value = 0
    },
  })

  const TOP = useAnimatedStyle(() => {
    return { top: withSpring(Mytop.value) }
  })

  const openBottomSheet = () => {
    'worklet'
    Mytop.value = windowHeight / 2
  }

  return (
    <View style={{ flex: 1 }}>
      <PanGestureHandler onGestureEvent={eventHandler}>
        <Animated.View style={[styles.bottomSheet, TOP]} />
      </PanGestureHandler>
      <View
        style={{
          flex: 1,
          width: windowWidth,
          height: windowHeight,
          position: 'absolute',
          zIndex: 2,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Button title="Activate BottomSheet" onPress={openBottomSheet} />
      </View>
    </View>
  )
}
export default observer(BottomSheet)

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomSheet: {
    backgroundColor: 'tomato',
    position: 'absolute',
    right: 0,
    left: 0,
    bottom: 0,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    zIndex: 1,
    height: 2000,
  },
})
