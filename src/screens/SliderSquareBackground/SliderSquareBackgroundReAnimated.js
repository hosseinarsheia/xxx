import React, { useEffect, useRef, Fragment } from 'react'
import { View, Text, Alert, FlatList, Image, Dimensions, StyleSheet, StatusBar } from 'react-native'
import { observable, action, autorun, computed } from 'mobx'
import { inject, observer, useLocalStore } from 'mobx-react'
import Animated, {
  useSharedValue,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  interpolate,
  interpolateColor,
} from 'react-native-reanimated'

import { PRODUCT_LIST } from '../../res/data'

const { width, height } = Dimensions.get('window')
const AnimatedFlatList = Animated.createAnimatedComponent(FlatList)

const RenderItem = ({ item, index, scrollX }) => {
  const inputRange = PRODUCT_LIST.map((_, index) => index * width)
  const outputRange = PRODUCT_LIST.map(value => value.bg)

  const backgroundColor = useAnimatedStyle(() => {
    return {
      backgroundColor: interpolateColor(scrollX.value, inputRange, outputRange),
    }
  })

  return (
    <Animated.View style={[styles.itemContainer, backgroundColor]}>
      <Image source={item.url} style={styles.imageStyle} />
      <Text>{item.title}</Text>
      <Text>{item.description}</Text>
    </Animated.View>
  )
}

const Indicator = ({ scrollX }) => {
  return (
    <View style={styles.indicatorContainer}>
      {PRODUCT_LIST.map((value, index) => {
        const inputRange = [(index - 1) * width, index * width, (index + 1) * width]

        const reanimatedStyle = useAnimatedStyle(() => {
          return {
            transform: [{ scale: interpolate(scrollX.value, inputRange, [1, 1.7, 1], 'clamp') }],
            opacity: interpolate(scrollX.value, inputRange, [0.5, 1.5, 0.5], 'clamp'),
          }
        })

        return <Animated.View key={value.id} style={[styles.circle, reanimatedStyle]} />
      })}
    </View>
  )
}

const SliderSquareBackgroundReAnimated = props => {
  const scrollX = useRef(useSharedValue(0)).current

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: event => (scrollX.value = event.contentOffset.x),
  })

  return (
    <View style={{ flex: 1, alignItems: 'center', backgroundColor: 'grey' }}>
      <StatusBar hidden />
      <AnimatedFlatList
        decelerationRate="fast"
        // renderScrollComponent={props => <Animated.ScrollView {...props} onScroll={scrollHandler} />}
        onScroll={scrollHandler}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        data={PRODUCT_LIST}
        renderItem={({ item, index }) => <RenderItem item={item} index={index} scrollX={scrollX} />}
        keyExtractor={item => `${item.id}`}
        scrollEventThrottle={16}
      />

      <Indicator scrollX={scrollX} />
    </View>
  )
}

export default observer(SliderSquareBackgroundReAnimated)

export const styles = StyleSheet.create({
  itemContainer: {
    width,
    height,
    paddingVertical: 20,
    alignItems: 'center',
  },
  imageStyle: {
    width: width - 100,
    height: height / 2,
    resizeMode: 'contain',
  },
  indicatorContainer: {
    position: 'absolute',
    bottom: 50,
    width: width / 3,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },

  circle: {
    width: 7,
    height: 7,
    borderRadius: 7,
    backgroundColor: 'white',
  },
})
