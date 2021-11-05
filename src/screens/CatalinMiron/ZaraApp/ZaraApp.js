import React, { useEffect, useRef, useState } from 'react'
import {
  View,
  Text,
  Alert,
  FlatList,
  Animated,
  Dimensions,
  Button,
  StatusBar,
  TouchableNativeFeedback,
  TextInput,
  Easing,
  Image,
} from 'react-native'
import { observable, action, autorun, computed } from 'mobx'
import { inject, observer, useLocalStore } from 'mobx-react'

import { PRODUCT_LIST } from '../../../res/data'
import R from '../../../res/R'

const { width, height } = Dimensions.get('window')
const ITEM_HEIGHT = height * 0.75
const BOTTOM_PADDING = height * 0.23
const INDICATOR_WIDTH = 25
const INDICATOR_MARGIN = 5

const Indicator = ({ scrollY }) => {
  const y = scrollY.interpolate({
    inputRange: [-ITEM_HEIGHT, 0, ITEM_HEIGHT],
    outputRange: [
      -INDICATOR_WIDTH - INDICATOR_MARGIN * 2,
      0,
      INDICATOR_WIDTH + INDICATOR_MARGIN * 2,
    ],
  })

  return (
    <View style={{ position: 'absolute', justifyContent: 'center', alignSelf: 'flex-start' }}>
      {PRODUCT_LIST.map((item, i) => {
        const translateY = scrollY.interpolate({
          inputRange: [(i - 1) * ITEM_HEIGHT, i * ITEM_HEIGHT, (i + 1) * ITEM_HEIGHT],
          outputRange: [-INDICATOR_WIDTH - 10, 0, INDICATOR_WIDTH + 10],
          extrapolate: 'clamp',
        })
        return (
          <View
            key={`${item.id}`}
            style={{
              width: INDICATOR_WIDTH,
              height: INDICATOR_WIDTH,
              margin: INDICATOR_MARGIN,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <View
              style={{
                backgroundColor: item.bg,
                width: INDICATOR_WIDTH - 10,
                height: INDICATOR_WIDTH - 10,
                borderRadius: 100,
                //   margin: INDICATOR_MARGIN,
              }}
            />
          </View>
        )
      })}

      <Animated.View
        style={{
          position: 'absolute',
          width: INDICATOR_WIDTH,
          height: INDICATOR_WIDTH,
          // margin: INDICATOR_MARGIN,
          borderWidth: 2,
          borderRadius: 100,
          borderColor: 'green',
          alignSelf: 'center',
          top: 0,
          margin: INDICATOR_MARGIN,
          transform: [{ translateY: y }],
        }}
      />
    </View>
  )
}

const RenderItem = ({ item, index }) => {
  return (
    <View style={{ width, height: ITEM_HEIGHT }}>
      <Image
        source={item.url}
        style={{ flexGrow: 1, height: null, width: null, resizeMode: 'contain' }}
      />
    </View>
  )
}

const ZaraApp = props => {
  const scrollY = useRef(new Animated.Value(0)).current
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Animated.FlatList
        data={PRODUCT_LIST}
        renderItem={({ item, index }) => <RenderItem item={item} index={index} scrollY={scrollY} />}
        keyExtractor={item => `${item.id}`}
        scrollEventThrottle={16}
        contentContainerStyle={{ paddingBottom: BOTTOM_PADDING }}
        decelerationRate="fast"
        snapToInterval={ITEM_HEIGHT}
        showsVerticalScrollIndicator={false}
        bounces={false}
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], {
          useNativeDriver: true,
        })}
        // horizontal
        // showsHorizontalScrollIndicator={false}
        // pagingEnabled

        getItemLayout={(data, index) => ({
          length: ITEM_HEIGHT,
          offset: ITEM_HEIGHT * index,
          index,
        })}
      />

      <Indicator scrollY={scrollY} />
    </View>
  )
}

export default observer(ZaraApp)
