import React, { useCallback, useEffect, useRef, useState } from 'react'
import { View, Text, Alert, Button, StyleSheet, Dimensions } from 'react-native'

import Animated, { useSharedValue, useAnimatedStyle, useAnimatedScrollHandler, interpolate } from 'react-native-reanimated'

const screenArr = [
  { bg: 'tomato', title: 'first' },
  { bg: 'green', title: 'second' },
  { bg: 'cyan', title: 'third' },
]
const { width, height } = Dimensions.get('window')

function App() {
  const x = useSharedValue(0)

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event, ctx) => {
      x.value = event.contentOffset.x
    },
  })

  generateInputRange = index => {
    'worklet'
    return [(index - 1) * width, index * width, (index + 1) * width]
  }
  return (
    <Animated.ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      scrollEventThrottle={16}
      onScroll={scrollHandler}
      pagingEnabled>
      {screenArr.map((data, index) => {
        const rStyle = useAnimatedStyle(() => {
          // const inputRange = [(index - 1) * width, index * width, (index + 1) * width]
          const outputRange = [-2, 1, -2]

          return {
            opacity: interpolate(x.value, generateInputRange(index), outputRange),
            transform: [{ translateY: interpolate(x.value, generateInputRange(index), [-100, 0, -100]) }],
          }
        })

        const scale = useAnimatedStyle(() => ({
          transform: [{ scale: interpolate(x.value, generateInputRange(index), [0.5, 2, 0.5]) }],
        }))

        return (
          <View
            key={`${index}`}
            style={{ width: width, height: height, backgroundColor: data.bg, justifyContent: 'center', alignItems: 'center' }}>
            <Animated.Text style={[rStyle, { position: 'absolute' }]}>{data.title}</Animated.Text>
            <Animated.View style={[{ backgroundColor: 'blue', width: 50, height: 50, marginTop: 150 }, scale]} />
          </View>
        )
      })}
    </Animated.ScrollView>
  )
}

export default App

export const styles = StyleSheet.create({
  box: {
    width: 100,
    height: 100,
    backgroundColor: 'tomato',
  },
})
