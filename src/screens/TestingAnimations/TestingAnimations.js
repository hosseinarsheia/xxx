import React from 'react'
import { StyleSheet, Button, View } from 'react-native'
import Animated, { useSharedValue, useAnimatedProps, withTiming } from 'react-native-reanimated'
import Svg, { Path, Circle } from 'react-native-svg'

const AnimatedPath = Animated.createAnimatedComponent(Path)

function App() {
  const radius = useSharedValue(40)

  const animatedProps = useAnimatedProps(() => {
    // draw a circle
    const path = `M${radius.value} ${radius.value} ${radius.value * 1.5} ${radius.value * 1.5}  ${radius.value * 2} ${
      radius.value * 2
    }`

    return {
      d: path,
    }
  })

  // attach animated props to an SVG path using animatedProps
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <View style={{ width: 200, height: 200, backgroundColor: 'green', alignItems: 'center', justifyContent: 'center' }}>
        <Svg
          // style={{ backgroundColor: 'blue' }}
          fill={'blue'}
          xmlns="http://www.w3.org/2000/svg"
          // viewBox="0 0 190 190"
          height="190"
          width="190">
          <Path animatedProps={animatedProps} fill="none" stroke="red" strokeWidth={3} />
        </Svg>
      </View>

      <Button title="press me" onPress={() => (radius.value = withTiming(100, { duration: 2000 }))} />
    </View>
  )
}

export default App
