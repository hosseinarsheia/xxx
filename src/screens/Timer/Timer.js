import React, { useEffect, useRef } from 'react'
import { View, Text, Alert, FlatList, Animated, Dimensions } from 'react-native'
import { observable, action, autorun, computed } from 'mobx'
import { inject, observer, useLocalStore } from 'mobx-react'

import { PRODUCT_LIST } from '../../res/data'
import R from '../../res/R'

const { width, height } = Dimensions.get('window')
const ITEM_WIDTH = width / 2
const SECONDS = [
  { value: 0, id: '0' },
  { value: 10, id: '1' },
  { value: 20, id: '2' },
  { value: 30, id: '3' },
  { value: 40, id: '4' },
  { value: 50, id: '5' },
  { value: 60, id: '6' },
  { value: 70, id: '7' },
]

const RenderItem = ({ item, index }) => {
  return (
    <>
      <View style={{ width: ITEM_WIDTH / 4 }} />
      <View
        style={{
          flexDirection: 'row',
          width: ITEM_WIDTH,
          backgroundColor: index % 2 == 0 ? 'red' : 'blue',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text style={{ color: 'white', fontSize: 36, fontWeight: 'bold', fontFamily: R.fonts.SignikaNegative_SemiBold }}>
          {item.value}
        </Text>
      </View>
    </>
  )
}

const Timer = props => {
  const scrollX = useRef(new Animated.Value(0)).current
  return (
    <View style={{ flex: 1, alignItems: 'center', backgroundColor: 'tomato', justifyContent: 'center' }}>
      {console.log(ITEM_WIDTH)}
      <FlatList
        data={SECONDS}
        renderItem={({ item, index }) => <RenderItem item={item} index={index} scrollX={scrollX} />}
        keyExtractor={item => `${item.id}`}
        scrollEventThrottle={16}
        // onScroll={scrollHandler}
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToInterval={ITEM_WIDTH}
        // pagingEnabled
      />
    </View>
  )
}

export default observer(Timer)
