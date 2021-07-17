import React, { useEffect, useRef, useState } from 'react'
import { View, Text, Alert, StyleSheet, Dimensions, Button } from 'react-native'
import { observable, action, autorun, computed } from 'mobx'
import { inject, observer, useLocalStore } from 'mobx-react'
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated'

const { width, height } = Dimensions.get('window')

const Progress = ({ step, steps, height }) => {
  const animatedValue = useRef(useSharedValue(0)).current
  const [newWidth, setNewWidth] = useState(0)

  useEffect(() => {
    changeWidth()
  }, [step, steps])

  const changeWidth = () => {
    'worklet'

    let w = newWidth * (step / steps)

    if (w > newWidth) return
    else animatedValue.value = w
  }

  const style = useAnimatedStyle(() => ({
    width: withTiming(animatedValue.value, { duration: 500 }),
  }))

  return (
    <View onLayout={e => setNewWidth(e.nativeEvent.layout.width)} style={styles.progressContainer}>
      <Animated.View style={[styles.progressStyle, style]}></Animated.View>
    </View>
  )
}

const LinearProgressBar = props => {
  const [step, setStep] = useState(0)

  const changeStep = () => {
    setStep(step + 2)
  }

  return (
    <View style={styles.container}>
      <Progress step={step} steps={10} height={20} />

      <Button title="changeStep" onPress={changeStep} />
    </View>
  )
}

export default observer(LinearProgressBar)

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    // alignItems: 'center',
    // paddingHorizontal: 10,
  },
  progressContainer: {
    backgroundColor: 'red',
    borderRadius: 20,
    height: 20,
    flexDirection: 'row',
    alignItems: 'center',
    width: width * 0.9,
    marginBottom: 20,
    overflow: 'hidden',
  },
  progressStyle: {
    height: 20,
    backgroundColor: 'green',
    borderRadius: 20,
  },
})
