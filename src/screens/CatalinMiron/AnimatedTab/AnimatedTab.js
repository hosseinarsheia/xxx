import React, { useState, useEffect, useRef, forwardRef, createRef, useLayoutEffect } from 'react'
import {
  View,
  Text,
  Alert,
  FlatList,
  Animated,
  Image,
  Dimensions,
  StyleSheet,
  StatusBar,
} from 'react-native'
import { observable, action, autorun, computed } from 'mobx'
import { inject, observer, useLocalStore } from 'mobx-react'

import { PRODUCT_LIST } from '../../../res/data'
import R from '../../../res/R'
const { width, height } = Dimensions.get('window')

const Slides = ({ item, index }) => (
  <Image source={item.url} style={{ width, height, flex: 1, resizeMode: 'contain' }} />
)
const Indicator = () => <View style={styles.indicatorStyle} />

const Tab = forwardRef(({ item }, ref) => (
  <View ref={ref}>
    <Text style={{ fontFamily: R.fonts.SignikaNegative_SemiBold }}>{item.brand}</Text>
  </View>
))

const Tabs = ({ scrollX, data }) => {
  const containerRef = useRef()
  const [measures, setMeasure] = useState([])

  useEffect(() => {
    const m = []

    for (let mine of data) {
      mine.ref.current.measureLayout(containerRef.current, (x, y, width, height) =>
        m.push({ x, y, width, height }),
      )

      if (m.length == mine.length) setMeasure(m)
      console.log(measures)
    }
  }, [])

  return (
    <View ref={containerRef} style={styles.tabsContainer}>
      {data.map((item, index) => (
        <Tab key={item.title} item={item} index={index} ref={item.ref} />
      ))}

      {measures.length > 0 && <Indicator measures={measures} scrollX={scrollX} />}
    </View>
  )
}

const AnimatedTab = props => {
  const scrollX = useRef(new Animated.Value(0)).current
  // const tabRef = createRef()

  return (
    <View>
      <StatusBar hidden />
      <Animated.FlatList
        pagingEnabled
        horizontal
        showsHorizontalScrollIndicator={false}
        data={PRODUCT_LIST}
        renderItem={Slides}
        keyExtractor={item => `${item.id}`}
        scrollEventThrottle={16}
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], {
          useNativeDriver: false,
        })}
      />

      <Tabs
        scrollX={scrollX}
        data={PRODUCT_LIST}
        // ref={tabRef}
      />
    </View>
  )
}

export default observer(AnimatedTab)

export const styles = StyleSheet.create({
  tabsContainer: {
    position: 'absolute',
    top: 20,
    width: '100%',
    flexDirection: 'row',
    backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    paddingVertical: 5,
  },
  indicatorStyle: {
    width: 50,
    height: 3,
    backgroundColor: 'blue',
    position: 'absolute',
    left: 0,
    bottom: 0,
  },
})
