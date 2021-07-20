import React, { useEffect, useRef, Fragment } from 'react'
import { View, Text, Alert, FlatList, Image, Dimensions, Animated, StyleSheet, StatusBar } from 'react-native'
import { observable, action, autorun, computed } from 'mobx'
import { inject, observer, useLocalStore } from 'mobx-react'

import { PRODUCT_LIST } from '../../res/data'

const { width, height } = Dimensions.get('window')

const RenderItem = ({ item, index, scrollX }) => {
  const backgroundColor = scrollX.interpolate({
    inputRange: PRODUCT_LIST.map((value, index) => index * width),
    outputRange: PRODUCT_LIST.map((value, index) => value.bg),
  })

  return (
    <Animated.View style={[styles.itemContainer, { backgroundColor: backgroundColor }]}>
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

        const scale = scrollX.interpolate({
          inputRange,
          outputRange: [1, 1.7, 1],
          extrapolate: 'clamp',
        })

        const opacity = scrollX.interpolate({
          inputRange,
          outputRange: [0.5, 1.5, 0.5],
          extrapolate: 'clamp',
        })

        return <Animated.View key={value.id} style={[styles.circle, { opacity, transform: [{ scale }] }]} />
      })}
    </View>
  )
}

const SliderSquareBackground = props => {
  const scrollX = useRef(new Animated.Value(0)).current

  return (
    <View style={{ flex: 1, alignItems: 'center', backgroundColor: 'grey' }}>
      <StatusBar hidden />
      <Animated.FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        data={PRODUCT_LIST}
        renderItem={({ item, index }) => <RenderItem item={item} index={index} scrollX={scrollX} />}
        keyExtractor={item => `${item.id}`}
        scrollEventThrottle={16}
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], { useNativeDriver: false })}
      />

      <Indicator scrollX={scrollX} />
    </View>
  )
}

export default observer(SliderSquareBackground)

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
