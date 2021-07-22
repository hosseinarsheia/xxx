import React, { useEffect, useRef, useState } from 'react'
import {
  View,
  Text,
  Alert,
  FlatList,
  //   Animated,
  Dimensions,
  Button,
  StatusBar,
  TouchableNativeFeedback,
  TextInput,
  //   Easing,
} from 'react-native'
import { observer } from 'mobx-react'
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSequence,
  useAnimatedRef,
  useAnimatedScrollHandler,
  interpolate,
  withTiming,
  Easing,
} from 'react-native-reanimated'

import R from '../../res/R'

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList)
const { width, height } = Dimensions.get('window')
const ITEM_WIDTH = width * 0.38
const ITEM_SPACING = (width - ITEM_WIDTH) / 2
const VIEW_HEIGHT = 50

const SECONDS = [
  // { value: 0, id: '0' },
  { value: 5, id: '1' },
  { value: 10, id: '2' },
  { value: 15, id: '3' },
  { value: 20, id: '4' },
  { value: 25, id: '5' },
  { value: 30, id: '6' },
  { value: 35, id: '7' },
]

const RenderItem = ({ item, index, scrollX, duration, flatTextListOpacity, flatCountDownOpacity }) => {
  const inputRange = [(index - 1) * ITEM_WIDTH, index * ITEM_WIDTH, (index + 1) * ITEM_WIDTH]

  const WrapperStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(scrollX.value, inputRange, [0.4, 1, 0.4]),
      transform: [{ scale: interpolate(scrollX.value, inputRange, [0.5, 1, 0.5]) }],
    }
  })

  return (
    <>
      <Animated.View
        style={[
          {
            flexDirection: 'row',
            width: ITEM_WIDTH,
            justifyContent: 'center',
            alignItems: 'center',
            flex: 1,
          },
          WrapperStyle,
        ]}>
        <Animated.Text
          style={{
            // opacity: flatTextListOpacity,
            color: 'white',
            fontSize: 50,
            fontWeight: 'bold',
            fontFamily: R.fonts.SignikaNegative_SemiBold,
          }}>
          {item.value}
        </Animated.Text>
      </Animated.View>
    </>
  )
}

const Timer = props => {
  const scrollX = useRef(useSharedValue(0)).current
  const translateY = useRef(useSharedValue(height)).current
  const buttonTranslateY = useRef(useSharedValue(height / 2 - 80)).current
  //   const translateY = useRef(new Animated.Value(height)).current
  //   const buttonTranslateY = useRef(new Animated.Value(height / 2 - 80)).current

  const inputRef = useRef()
  const inputAnimationValue = useRef(new Animated.Value(SECONDS[0].value)).current
  const opacity = useRef(new Animated.Value(1)).current

  const [duration, setDuration] = useState(SECONDS[0].value)

  //   const startAnimation = () => {
  //     inputAnimationValue.setValue(duration)
  //     opacity.setValue(0)

  //     Animated.sequence([
  //       Animated.parallel([
  //         Animated.timing(buttonTranslateY, {
  //           toValue: height,
  //           duration: 300,
  //           useNativeDriver: 'true',
  //           easing: Easing.linear,
  //         }),
  //         Animated.timing(translateY, {
  //           toValue: 0,
  //           duration: 300,
  //           useNativeDriver: 'true',
  //           easing: Easing.linear,
  //         }),
  //       ]),
  //       Animated.parallel([
  //         Animated.timing(translateY, {
  //           toValue: height,
  //           duration: duration * 1000 - 600,
  //           useNativeDriver: 'true',
  //           easing: Easing.linear,
  //         }),

  //         Animated.timing(inputAnimationValue, {
  //           toValue: 0,
  //           duration: duration * 1000 - 600,
  //           useNativeDriver: 'true',
  //           easing: Easing.linear,
  //         }),
  //       ]),

  //       Animated.timing(buttonTranslateY, {
  //         toValue: height / 2 - 80,
  //         duration: 300,
  //         useNativeDriver: 'true',
  //         easing: Easing.linear,
  //       }),
  //     ]).start(() => opacity.setValue(1))
  //   }

  const flatTextListOpacity = opacity.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  })

  const flatCountDownOpacity = opacity.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0],
  })

  //   useEffect(() => {
  //     let Listener = inputAnimationValue.addListener(({ value }) => {
  //       inputRef?.current?.setNativeProps({ text: Math.ceil(value).toString() })
  //     })

  //     return () => {
  //       inputAnimationValue.removeListener(Listener)
  //       inputAnimationValue.removeListener()
  //     }
  //   }, [])

  const startAnimation = () => {
    'worklet'

    buttonTranslateY.value = withTiming(height, {
      duration: 300,
      easing: Easing.linear,
    })

    translateY.value = withTiming(0, { duration: 300, easing: Easing.linear }, isFinished => {
      if (isFinished) {
        translateY.value = withTiming(height, {
          duration: duration * 1000 - 600,
          easing: Easing.linear,
        })
      }
    })
  }

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: e => (scrollX.value = e.contentOffset.x),
  })

  const backScreenStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: translateY.value }],
    }
  })

  const buttonStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: buttonTranslateY.value }],
    }
  })

  return (
    <View style={{ flex: 1, alignItems: 'center', backgroundColor: '#2D3747', justifyContent: 'center' }}>
      <Animated.View
        style={[{ position: 'absolute', height, width: '100%', zIndex: -1, backgroundColor: 'tomato' }, backScreenStyle]}
      />
      <StatusBar hidden />

      {/* <Animated.View
        style={{
          opacity: flatCountDownOpacity,
          position: 'absolute',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <TextInput
          ref={inputRef}
          {...props} // Inherit any props passed to it; e.g., multiline, numberOfLines below
          editable
          maxLength={40}
          defaultValue={duration.toString()}
          style={{ color: 'white', fontSize: 50, fontWeight: 'bold', fontFamily: R.fonts.SignikaNegative_SemiBold }}
        />
      </Animated.View> */}

      <FlatList
        data={SECONDS}
        renderItem={({ item, index }) => (
          <RenderItem
            duration={duration}
            flatCountDownOpacity={flatCountDownOpacity}
            flatTextListOpacity={flatTextListOpacity}
            item={item}
            index={index}
            scrollX={scrollX}
          />
        )}
        keyExtractor={item => `${item.id}`}
        scrollEventThrottle={16}
        // onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], { useNativeDriver: true })}
        // onScroll={scrollHandler}
        contentContainerStyle={{ padding: ITEM_SPACING }}
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToInterval={ITEM_WIDTH}
        decelerationRate="fast"
        onMomentumScrollEnd={ev => {
          const index = Math.round(ev.nativeEvent.contentOffset.x / ITEM_WIDTH)
          setDuration(SECONDS[index].value)
        }}
        renderScrollComponent={props => <Animated.ScrollView {...props} onScroll={scrollHandler} />}
        getItemLayout={(data, index) => ({
          length: ITEM_WIDTH,
          offset: ITEM_WIDTH * index,
          index,
        })}
      />

      <TouchableNativeFeedback onPress={startAnimation}>
        <Animated.View
          style={[
            {
              backgroundColor: 'tomato',
              width: 75,
              height: 75,
              borderRadius: 500,
              position: 'absolute',
              justifyContent: 'center',
              alignItems: 'center',
            },
            buttonStyle,
          ]}>
          <Text style={{ color: 'white' }}>START</Text>
        </Animated.View>
      </TouchableNativeFeedback>
    </View>
  )
}

export default observer(Timer)
