import React, { useEffect } from 'react'
import { useCallback } from 'react'
import { Dimensions, TouchableOpacity } from 'react-native'
import { StyleSheet, Text, View } from 'react-native'
import Animated, { useSharedValue, withTiming, useAnimatedProps } from 'react-native-reanimated'
import { useDerivedValue } from 'react-native-reanimated'
// import { ReText } from 'react-native-redash'
import Svg, { Circle, Defs, LinearGradient, Stop, G } from 'react-native-svg'

const BACKGROUND_COLOR = '#444B6F'
const BACKGROUND_STROKE_COLOR = '#303858'
const STROKE_COLOR = '#A6E1FA'

const { width, height } = Dimensions.get('window')
const CIRCLE_LENGTH = 1000 // 2PI*R  اندازه طول خط رایره
const R = CIRCLE_LENGTH / (2 * Math.PI) // شعاع دایره

const AnimatedCircle = Animated.createAnimatedComponent(Circle)

export default function App() {
  const progress = useSharedValue(0)

  const animatedProps = useAnimatedProps(() => ({
    strokeDashoffset: CIRCLE_LENGTH * (1 - progress.value),
  }))

  // const progressText = useDerivedValue(() => {
  //   return `${Math.floor(progress.value * 100)}`
  // })

  const onPress = useCallback(() => {
    progress.value = withTiming(progress.value > 0 ? 0 : 1, { duration: 2000 })
  }, [])

  return (
    <View style={styles.container}>
      {/* <ReText style={styles.progressText} text={progressText} /> */}
      <View
        style={[styles.container, { backgroundColor: 'red', transform: [{ rotate: '270deg' }] }]}>
        <Svg style={{ position: 'absolute' }}>
          <Defs>
            <LinearGradient id="grad" x1="0" y1="0.5" x2="0" y2="0">
              <Stop offset="0" stopColor="tomato" stopOpacity="1" />
              <Stop offset="0.5" stopColor="cyan" stopOpacity="1" />
            </LinearGradient>
          </Defs>

          <Circle
            cx={width / 2}
            cy={height / 2}
            r={R}
            stroke={BACKGROUND_STROKE_COLOR}
            strokeWidth={20}
          />

          <AnimatedCircle
            cx={width / 2}
            cy={height / 2}
            r={R}
            // stroke={STROKE_COLOR}
            stroke={'url(#grad)'}
            strokeWidth={10}
            strokeDasharray={CIRCLE_LENGTH}
            animatedProps={animatedProps}
            strokeLinecap={'butt'}
          />

          {/* used for making circle dashed */}
          <Circle
            cx={width / 2}
            cy={height / 2}
            r={R}
            stroke={BACKGROUND_STROKE_COLOR}
            strokeWidth={10}
            // strokeDasharray={CIRCLE_LENGTH}
            strokeDasharray={5}
            // animatedProps={animatedProps}
            // strokeLinecap={'round'}
          />
        </Svg>
      </View>
      <TouchableOpacity onPress={onPress} style={styles.button}>
        <Text style={styles.buttonText}>Run</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BACKGROUND_COLOR,
    alignItems: 'center',
    justifyContent: 'center',
  },
  progressText: {
    fontSize: 80,
    color: 'rgba(256,256,256,0.7)',
    width: 200,
    textAlign: 'center',
  },
  button: {
    position: 'absolute',
    bottom: 30,
    width: width * 0.7,
    height: 60,
    backgroundColor: BACKGROUND_STROKE_COLOR,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 25,
    color: 'white',
    letterSpacing: 2.0,
  },
})
