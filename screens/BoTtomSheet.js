import React, { Fragment } from 'react'
import { View, Button, StyleSheet, useWindowDimensions } from 'react-native'
import { observer } from 'mobx-react'

import Animated, { useSharedValue, useAnimatedStyle, withSpring, useAnimatedGestureHandler } from 'react-native-reanimated'
import { PanGestureHandler } from 'react-native-gesture-handler'

const BootomSheet = () => {
  const windowHeight = useWindowDimensions().height
  const Mytop = useSharedValue(windowHeight)

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

  const openBottomSheet = () => (Mytop.value = windowHeight / 2)

  return (
    <Fragment>
      <Button title="press me" onPress={openBottomSheet} />
      <PanGestureHandler onGestureEvent={eventHandler}>
        <Animated.View style={[styles.bottomSheet, TOP]} />
      </PanGestureHandler>
    </Fragment>
  )
}
export default observer(BootomSheet)

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
    zIndex: 100,
    height: 2000,
  },
})
