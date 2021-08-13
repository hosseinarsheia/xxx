import React, { useEffect, useState } from 'react'
import { View, Text, Alert, StatusBar, Dimensions, Image, StyleSheet, FlatList, Animated, interpolate } from 'react-native'
import { observer } from 'mobx-react'
import { ICON_LIST } from '../../res/data'
import { Icon } from 'react-native-elements'

import R from '../../res/R'

const { width, height } = Dimensions.get('window')

const RenderItem = ({ item, index, scrollX }) => {
  return (
    <View style={{ width, height }}>
      <View>
        <Icon name={item.name} type="antdesign" color="#517fa4" />
      </View>
    </View>
  )
}

const StackCoursel = props => {
  const scrollX = new Animated.Value(0)

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
      }}>
      <Animated.FlatList
        // pagingEnabled
        horizontal
        showsHorizontalScrollIndicator={false}
        data={ICON_LIST}
        renderItem={({ item, index }) => <RenderItem item={item} index={index} scrollX={scrollX} />}
        keyExtractor={item => `${item.id}`}
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], { useNativeDriver: true })}
        scrollEventThrottle={16}
      />
    </View>
  )
}

export default observer(StackCoursel)
