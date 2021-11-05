import React, { useEffect, useRef, useState } from 'react'
import { View, Text, Alert, StyleSheet, Dimensions, Animated, Button } from 'react-native'
import { observable, action, autorun, computed } from 'mobx'
import { inject, observer, useLocalStore } from 'mobx-react'

const { width, height } = Dimensions.get('window')

const Progress = ({ step, steps, height }) => {
  const animatedValue = useRef(new Animated.Value(-1000)).current
  const reactive = useRef(new Animated.Value(-1000)).current
  const [newWidth, setNewWidth] = useState(0)

  useEffect(() => {
    animated()
  }, [step, newWidth])

  const animated = () => {
    let w = newWidth * (step / steps)

    if (w > newWidth) return
    else {
      Animated.timing(animatedValue, {
        toValue: -newWidth + w,
        duration: 300,
        useNativeDriver: 'true',
      }).start()
    }
  }

  return (
    <View>
      <View onLayout={e => setNewWidth(e.nativeEvent.layout.width)} style={styles.progreesContainer}>
        <Animated.View style={[styles.progressStyle, { transform: [{ translateX: animatedValue }] }]} />
      </View>
    </View>
  )
}

const LinearProgressBar = props => {
  const [step, SetStep] = useState(0)
  const steps = 100

  changeStep = () => {
    if (step >= steps) return
    SetStep(step + 1)
  }

  return (
    <View style={styles.container}>
      <Text>{`${step} / ${steps}`}</Text>

      <Progress step={step} steps={steps} height={20} />
      <Button title="press me" onPress={changeStep} />
    </View>
  )
}

export default observer(LinearProgressBar)

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  progreesContainer: {
    backgroundColor: 'red',
    borderRadius: 20,
    height: 20,
    flexDirection: 'row',
    width: width * 0.9,
    margin: 20,
    // flex: 1,
    overflow: 'hidden',
  },
  progressStyle: {
    height: 20,
    width: '100%',
    backgroundColor: 'green',
    borderRadius: 20,
  },
})
