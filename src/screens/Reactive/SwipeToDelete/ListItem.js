import React, { useState } from 'react'
import { View, Text, Alert, Dimensions, StyleSheet } from 'react-native'
import { PanGestureHandler } from 'react-native-gesture-handler'
import { Icon } from 'react-native-elements'
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  runOnJS,
  interpolate,
  withSpring,
  Extrapolate,
} from 'react-native-reanimated'

const { width, height } = Dimensions.get('window')
const SHOW_DELETE_ICON_THRESHOLD = width * 0.3

const ListItem = ({ item, index, itemDeleteHandler }) => {
  const myTranslateX = useSharedValue(0)

  const onGestureEvent = useAnimatedGestureHandler({
    onStart: (event, ctx) => {
      ctx.startX = myTranslateX.value
    },

    onActive: (event, ctx) => {
      myTranslateX.value = ctx.startX + event.translationX
    },
    onEnd: (event, ctx) => {
      if (event.translationX > 0) myTranslateX.value = withSpring(0)

      if (event.translationX < 0 && event.translationX > -SHOW_DELETE_ICON_THRESHOLD) {
        myTranslateX.value = withSpring(0)
      } else if (myTranslateX.value <= -SHOW_DELETE_ICON_THRESHOLD) {
        myTranslateX.value = withSpring(-SHOW_DELETE_ICON_THRESHOLD)
      }
    },
  })

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: myTranslateX.value }],
  }))

  const IconStyle = useAnimatedStyle(() => ({
    opacity: interpolate(
      myTranslateX.value,
      [-SHOW_DELETE_ICON_THRESHOLD, -SHOW_DELETE_ICON_THRESHOLD / 3],
      [1, 0],
      Extrapolate.CLAMP,
    ),
  }))

  return (
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <PanGestureHandler activeOffsetX={[-10, 10]} onGestureEvent={onGestureEvent}>
        <Animated.View style={[styles.rowWrapper, animatedStyle]}>
          <Text>{item.title}</Text>
        </Animated.View>
      </PanGestureHandler>

      <Animated.View style={[{ position: 'absolute', right: 0 }, IconStyle]}>
        <Icon
          onPress={() => itemDeleteHandler(item.id)}
          name="delete"
          type="material"
          color="#f50"
        />
      </Animated.View>
    </View>
  )
}

export default ListItem

export const styles = StyleSheet.create({
  rowWrapper: {
    width: width * 0.9,
    backgroundColor: 'tomato',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    marginVertical: 20,
    paddingHorizontal: 50,
    borderRadius: 10,
  },
})
