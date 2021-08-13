import React, { useCallback, useEffect, useRef, useState } from 'react'
import { View, Text, Alert, Animated, FlatList, Image } from 'react-native'
import { observable, action, autorun, computed, onReactionError } from 'mobx'
import { inject, observer, useLocalStore } from 'mobx-react'
import { FlingGestureHandler, Directions, State } from 'react-native-gesture-handler'

import R from '../../res/R'
import { PRODUCT_LIST } from '../../res/data'

const IMAGE_WIDTH = R.dimensions.window.width * 0.86
const IMAGE_HEIGHT = IMAGE_WIDTH * 1.5
const VISIBLE_ITEMS = 4

const RenderItem = ({ item, index, animatedValue }) => {
  const inputRange = [index - 1, index, index + 1]

  const translateY = animatedValue.interpolate({
    inputRange,
    outputRange: [-30, 0, 30],
  })

  const opacity = animatedValue.interpolate({
    inputRange,
    outputRange: [1 - 1 / VISIBLE_ITEMS, 1, 0],
  })

  return (
    <Animated.View
      style={{
        position: 'absolute',
        borderRadius: 16,
        backgroundColor: 'white',
        borderColor: R.colors.borderColor,
        borderWidth: 1,
        // transform: [{ translateY }],
        // opacity,
      }}>
      <View>
        <Image
          source={item.url}
          style={{ width: IMAGE_WIDTH, height: IMAGE_HEIGHT, borderRadius: 16, borderColor: 'black' }}
          resizeMode="contain"
        />
        <Text style={[R.styles.normalFont, { left: 10, top: 10, position: 'absolute' }]}>{item.title}</Text>
      </View>
    </Animated.View>
  )
}

const SharedElement3 = props => {
  const [activeIndex, setActiveIndex] = useState(0)
  const animatedValue = useRef(new Animated.Value(0)).current
  const reactiveAnimated = useRef(new Animated.Value(0)).current

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: reactiveAnimated,
      duration: 3000,
      useNativeDriver: true,
    }).start()
  }, [])

  const setActiveSlide = useCallback(newIndex => {
    setActiveIndex(newIndex)
    reactiveAnimated.setValue(newIndex)
  })

  return (
    <FlingGestureHandler
      key="UP"
      direction={Directions.UP}
      onHandlerStateChange={e => {
        if (e.nativeEvent.state === State.END) {
          if (activeIndex === PRODUCT_LIST.length - 1) return
          else setActiveSlide(activeIndex + 1)
        }
      }}>
      <FlingGestureHandler key="DOWN" direction={Directions.DOWN}>
        <View style={{ flex: 1 }}>
          <FlatList
            scrollEnabled={false}
            data={PRODUCT_LIST}
            renderItem={({ item, index }) => <RenderItem item={item} index={index} animatedValue={animatedValue} />}
            keyExtractor={item => `${item.id}`}
            scrollEventThrottle={16}
            showsVerticalScrollIndicator={false}
            // horizontal
            // showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
            CellRendererComponent={({ item, index, children, style, ...props }) => {
              const newStyle = [
                style,
                {
                  zIndex: PRODUCT_LIST.length - index,
                  left: -IMAGE_WIDTH / 2,
                  top: -IMAGE_HEIGHT / 2,
                },
              ]
              return (
                <View index={index} style={newStyle} {...props}>
                  {children}
                </View>
              )
            }}
            // pagingEnabled
            // onScroll={scrollHandler}
          />
        </View>
      </FlingGestureHandler>
    </FlingGestureHandler>
  )
}

export default observer(SharedElement3)
