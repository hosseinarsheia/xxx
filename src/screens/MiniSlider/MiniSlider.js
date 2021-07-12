import React, { useEffect } from 'react'
import { View, Text, Alert, FlatList, Animated, Image, Dimensions } from 'react-native'
import { observable, action, autorun, computed } from 'mobx'
import { inject, observer, useLocalStore } from 'mobx-react'

import { PRODUCT_LIST } from '../../res/data'

const { width, height } = Dimensions.get('window')
const ITEM_WIDTH = width * 0.72
// const imageWidth = Dimensions.get('window').width
// const imageHeight = Dimensions.get('window').height

const RenderItem = ({ url, index, scrollX }) => {
  const inputRange = [(index - 1) * ITEM_WIDTH, index * ITEM_WIDTH, (index + 1) * ITEM_WIDTH]

  const translateY = scrollX.interpolate({
    inputRange,
    outputRange: [0, -50, 0],
  })
  //   const translateX = scrollX.interpolate({
  //     inputRange,
  //     outputRange: [-width / 2, 0, width / 2],
  //   })
  return (
    <View style={{ width: ITEM_WIDTH, height, alignItems: 'center', justifyContent: 'flex-end', paddingBottom: 100 }}>
      <Animated.Image
        source={url}
        style={{
          width: width * 0.5,
          height: width * 0.5,
          resizeMode: 'contain',
          transform: [
            { translateY },
            //  { translateX }
          ],
        }}
      />
    </View>
  )
}

const MiniSlider = props => {
  const scrollX = new Animated.Value(0)
  return (
    <View style={{ flex: 1 }}>
      <Animated.FlatList
        snapToInterval={ITEM_WIDTH}
        decelerationRate={0}
        // pagingEnabled
        horizontal
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={16}
        data={PRODUCT_LIST}
        renderItem={({ item, index }) => <RenderItem {...item} index={index} scrollX={scrollX} />}
        keyExtractor={item => `${item.id}`}
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], { useNativeDriver: true })}
      />
    </View>
  )
}

export default observer(MiniSlider)
