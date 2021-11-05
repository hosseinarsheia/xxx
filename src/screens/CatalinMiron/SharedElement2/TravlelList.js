import React, { useEffect, useRef } from 'react'
import { View, Text, Alert, FlatList, StyleSheet, Image, Animated } from 'react-native'
import { observable, action, autorun, computed } from 'mobx'
import { inject, observer, useLocalStore } from 'mobx-react'

import R from '../../../res/R'
import { PRODUCT_LIST } from '../../../res/data'
import { tutorial2Spec } from './theme'

const { ITEM_WIDTH, ITEM_HEIGHT, RADIUS, SPACING, FULL_SIZE } = tutorial2Spec

const RenderItem = ({ item, index, scrollX }) => {
  const inputRange = [(index - 1) * FULL_SIZE, index * FULL_SIZE, (index + 1) * FULL_SIZE]

  const translateX = scrollX.interpolate({
    inputRange,
    outputRange: [ITEM_WIDTH, 0, -ITEM_WIDTH],
  })

  const opacity = scrollX.interpolate({
    inputRange,
    outputRange: [0, 1, 0],
  })

  const scale = scrollX.interpolate({
    inputRange,
    outputRange: [0.8, 1, 0.8],
  })
  return (
    <View style={styles.itemContainer}>
      <View style={[StyleSheet.absoluteFill, { overflow: 'hidden', borderRadius: 10 }]}>
        <Animated.Image
          source={item.url}
          style={[StyleSheet.absoluteFill, { resizeMode: 'contain', transform: [{ scale }] }]}
        />
      </View>

      <Animated.Text
        style={[
          R.styles.normalFont,
          { position: 'absolute', transform: [{ translateX }], opacity },
        ]}>
        {item.title}
      </Animated.Text>

      <View style={{ position: 'absolute', bottom: 0, left: 10 }}>
        <Text style={[R.styles.normalFont, { padding: 10 }]}>{item.price}</Text>
      </View>
    </View>
  )
}

const TravlelList = props => {
  const scrollX = useRef(new Animated.Value(0)).current
  return (
    <View style={{ flex: 1 }}>
      <Animated.FlatList
        data={PRODUCT_LIST}
        renderItem={({ item, index }) => <RenderItem item={item} index={index} scrollX={scrollX} />}
        keyExtractor={item => `${item.id}`}
        scrollEventThrottle={16}
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], {
          useNativeDriver: true,
        })}
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToInterval={FULL_SIZE}
        decelerationRate="fast"
      />
    </View>
  )
}

export default observer(TravlelList)

export const styles = StyleSheet.create({
  itemContainer: {
    width: ITEM_WIDTH,
    height: ITEM_HEIGHT,
    margin: SPACING,
    borderWidth: 1,
  },
})
