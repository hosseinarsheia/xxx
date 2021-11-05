import React from 'react'
import { StyleSheet, Image, View, Dimensions } from 'react-native'
import { PinchGestureHandler, PinchGestureHandlerGestureEvent } from 'react-native-gesture-handler'
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'

const AnimatedImage = Animated.createAnimatedComponent(Image)

const IMAGE_SIZE = {
  width: 300,
  height: 300,
}

const { width, height } = Dimensions.get('window')

export default function App() {
  const scale = useSharedValue(1)
  const focalX = useSharedValue(0)
  const focalY = useSharedValue(0)

  const pinchHandler = useAnimatedGestureHandler({
    onActive: (event, ctx) => {
      scale.value = event.scale
      focalX.value = event.focalX
      focalY.value = event.focalY
    },
    onEnd: () => {
      scale.value = withTiming(1)
    },
  })

  const rStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: focalX.value },
        { translateY: focalY.value },
        { translateX: -IMAGE_SIZE.width / 2 },
        { translateY: -IMAGE_SIZE.height / 2 },

        { scale: scale.value },

        { translateX: -focalX.value },
        { translateY: -focalY.value },
        { translateX: IMAGE_SIZE.width / 2 },
        { translateY: IMAGE_SIZE.height / 2 },
      ],
    }
  })

  const focalPointStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: focalX.value }, { translateY: focalY.value }],
    }
  })

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <PinchGestureHandler onGestureEvent={pinchHandler}>
        <Animated.View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Animated.View style={[styles.focalPoint, focalPointStyle]} />
          <Animated.Image
            style={[
              {
                width: IMAGE_SIZE.width,
                height: IMAGE_SIZE.height,
                resizeMode: 'contain',
                backgroundColor: 'tomato',
              },
              rStyle,
            ]}
            source={require('../../../images/Headphones/1.png')}
          />
        </Animated.View>
      </PinchGestureHandler>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  focalPoint: {
    ...StyleSheet.absoluteFillObject,
    width: 20,
    height: 20,
    backgroundColor: 'blue',
    borderRadius: 10,
    zIndex: 20,
    top: 0,
    left: 0,
  },
})
