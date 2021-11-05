import React, { useEffect, useRef } from 'react'
import {
  View,
  Text,
  Alert,
  TouchableOpacity,
  Image,
  FlatList,
  Dimensions,
  Animated,
} from 'react-native'
import { observable, action, autorun, computed } from 'mobx'
import { inject, observer, useLocalStore } from 'mobx-react'
import { SharedElement } from 'react-navigation-shared-element'
import { Icon } from 'react-native-elements'

import R from '../../../res/R'
import { ICON_LIST } from '../../../res/data'
const { width, height } = Dimensions.get('window')

const ICON_SIZE = 70
const SPACING = 10
const SIZE = ICON_SIZE + SPACING * 2

const RenderItem = ({ item, index }) => {
  return (
    <View style={{ width, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={R.styles.normalFont}>{item.name}</Text>
    </View>
  )
}

const SecondScreen = ({ navigation, route }) => {
  const { item } = route.params
  const selectedItemIndex = ICON_LIST.findIndex(value => value.id === item.id)
  const faltRef = useRef(null)

  const mountedAnimated = useRef(new Animated.Value(0)).current
  const activeIndex = useRef(new Animated.Value(selectedItemIndex)).current
  const activeIndexAnimation = useRef(new Animated.Value(selectedItemIndex)).current

  const animation = (toValue, delay) =>
    Animated.timing(mountedAnimated, {
      toValue,
      duration: 300,
      delay,
      useNativeDriver: true,
    })

  useEffect(() => {
    Animated.parallel([
      Animated.timing(activeIndexAnimation, {
        toValue: activeIndex,
        duration: 300,
        useNativeDriver: true,
      }),
      animation(1, 500),
    ]).start()
    // faltRef?.current?.snapToOffsets(width * 0.33 * selectedItemIndex)
  })

  const translateY = mountedAnimated.interpolate({ inputRange: [0, 1], outputRange: [50, 0] })
  const translateX = activeIndexAnimation.interpolate({
    inputRange: [-1, 0, 1],
    outputRange: [SIZE, 0, -SIZE],
  })

  return (
    <View style={{ flex: 1 }}>
      <Animated.View
        style={{
          flexDirection: 'row',
          marginVertical: 20,
          flexWrap: 'nowrap',
          transform: [{ translateX }],
          marginLeft: width / 2 - ICON_SIZE / 2 - SPACING,
        }}>
        {ICON_LIST.map((item, index) => {
          return (
            <View
              style={{
                width: ICON_SIZE,
                margin: SPACING,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <SharedElement key={item.id} id={item.id}>
                <Icon
                  containerStyle={{ alignItems: 'center', justifyContent: 'center' }}
                  name={item.name}
                  type="antdesign"
                  color="#517fa4"
                  // size={30}
                />
              </SharedElement>
              <Text style={R.styles.normalFont}>{item.name}</Text>
            </View>
          )
        })}
      </Animated.View>
      <Animated.FlatList
        style={{ opacity: mountedAnimated, transform: [{ translateY }] }}
        ref={faltRef}
        data={ICON_LIST}
        renderItem={({ item, index }) => <RenderItem item={item} index={index} />}
        keyExtractor={item => `${item.id}`}
        scrollEventThrottle={16}
        // onScroll={scrollHandler}
        initialScrollIndex={selectedItemIndex}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        onMomentumScrollEnd={e => {
          const index = Math.floor(e.nativeEvent.contentOffset.x / width)
          activeIndex.setValue(index)
        }}
      />
    </View>
  )
}

// SecondScreen.SharedElements = (route, otherRoute, showing) => {
//   const { item } = route.params
//   return PRODUCT_LIST.map(value => value.id)
// }

export default SecondScreen
