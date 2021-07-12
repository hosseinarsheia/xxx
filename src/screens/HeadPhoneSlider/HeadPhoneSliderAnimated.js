import React, { useEffect, useState } from 'react'
import { View, Text, Alert, StatusBar, Dimensions, Image, StyleSheet, FlatList, Animated, interpolate } from 'react-native'
import { observer } from 'mobx-react'
import { PRODUCT_LIST } from '../../res/data'

import R from '../../res/R'

const { width, height } = Dimensions.get('window')

const HEADER_HEIGHT = 30
const INDICATOR_WIDTH = 30

const RenderItem = ({ url, title, index, description, scrollX, bg }) => {
  const inputRange = [(index - 1) * width, index * width, (index + 1) * width]
  const delayOpacityRange = [(index - 0.8) * width, index * width, (index + 0.8) * width]

  const opacity = scrollX.interpolate({
    inputRange: delayOpacityRange,
    outputRange: [0, 1, 0],
  })
  const scale = scrollX.interpolate({
    inputRange,
    outputRange: [0, 1, 0],
  })

  const translateX = scrollX.interpolate({
    inputRange,
    outputRange: [width * 0.2, 0, -width * 0.2],
  })

  return (
    <View style={styles.pageCpntainer}>
      <View style={{ justifyContent: 'center', alignItems: 'center' }}>
        <Animated.Image source={url} style={[styles.imageStyle, { opacity, transform: [{ scale }] }]} />
      </View>
      <Animated.Text style={[styles.titleStyle, { opacity, transform: [{ translateX }] }]}>{title}</Animated.Text>
      <Animated.Text style={[styles.descriptionStyle, { opacity }]}>{description}</Animated.Text>
    </View>
  )
}

/****************************************************************************/
const PaginationIndicator = ({ scrollX }) => {
  return (
    <View style={styles.paginationWrapper}>
      {PRODUCT_LIST.map((value, index) => {
        const inputRange = [(index - 1) * width, index * width, (index + 1) * width]

        const translateX = scrollX.interpolate({
          inputRange,
          outputRange: [-INDICATOR_WIDTH, 0, INDICATOR_WIDTH],
        })

        return (
          <View key={`${index}`} style={styles.paginationBoxWrapper}>
            <View style={[styles.dotStyle, { backgroundColor: value.bg }]} />
            <Animated.View style={[styles.paginationCircle, { transform: [{ translateX }] }]} />
          </View>
        )
      })}
    </View>
  )
}
/****************************************************************************/
const BackgroundCircleComponent = ({ scrollX }) => {
  return (
    <View style={styles.circleWrapper}>
      {PRODUCT_LIST.map((value, index) => {
        const inputRange = [(index - 0.55) * width, index * width, (index + 0.55) * width]

        const scale = scrollX.interpolate({
          inputRange,
          outputRange: [0, 1, 0],
          extrapolate: 'clamp',
        })

        const opacity = scrollX.interpolate({
          inputRange,
          outputRange: [0.1, 0.4, 0.1],
        })

        return (
          <Animated.View
            key={`${index}`}
            style={[styles.circle, { backgroundColor: value.bg, opacity, transform: [{ scale }] }]}
          />
        )
      })}
    </View>
  )
}

/****************************************************************************/
const HeaderTextComonent = ({ scrollX }) => {
  const inputRange = [-width, 0, width]

  const translateY = scrollX.interpolate({
    inputRange,
    outputRange: [HEADER_HEIGHT, 0, -HEADER_HEIGHT],
  })

  return (
    <View style={styles.headerTextStyle}>
      {PRODUCT_LIST.map((value, index) => (
        <Animated.View key={value.id} style={[styles.headerText, { transform: [{ translateY }] }]}>
          <Text style={styles.headerStyle}>{value.brand}</Text>
        </Animated.View>
      ))}
    </View>
  )
}

/****************************************************************************/

const HeadPhoneSlider = props => {
  const scrollX = new Animated.Value(0)

  return (
    <View>
      <StatusBar hidden />

      <HeaderTextComonent scrollX={scrollX} />

      <BackgroundCircleComponent scrollX={scrollX} />

      <Animated.FlatList
        pagingEnabled
        horizontal
        showsHorizontalScrollIndicator={false}
        data={PRODUCT_LIST}
        renderItem={({ item, index }) => <RenderItem {...item} index={index} scrollX={scrollX} />}
        keyExtractor={item => `${item.id}`}
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], { useNativeDriver: true })}
        scrollEventThrottle={16}
      />

      <PaginationIndicator scrollX={scrollX} />
    </View>
  )
}

export default observer(HeadPhoneSlider)

export const styles = StyleSheet.create({
  pageCpntainer: {
    width,
    height,
    alignItems: 'center',
    paddingVertical: 10,
    marginTop: 50,
    paddingHorizontal: 10,
  },
  container: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  imageStyle: {
    width: width * 0.75,
    height: width * 0.75,
    resizeMode: 'contain',
  },
  titleStyle: {
    fontSize: 28,
    fontWeight: '900',
    marginTop: 10,
    fontFamily: R.fonts.SignikaNegative_Regular,
  },
  descriptionStyle: {
    fontSize: 14,
    fontFamily: R.fonts.IRANSansMobile,
    color: R.colors.textColor,
    textAlign: 'right',
    marginTop: 20,
  },
  paginationWrapper: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    flexDirection: 'row',
  },
  paginationBoxWrapper: {
    width: INDICATOR_WIDTH,
    height: INDICATOR_WIDTH,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dotStyle: {
    borderRadius: 100,
    width: INDICATOR_WIDTH / 2,
    height: INDICATOR_WIDTH / 2,
    opacity: 0.7,
  },
  paginationCircle: {
    position: 'absolute',
    borderRadius: 100,
    borderColor: 'red',
    borderWidth: 1,
    width: INDICATOR_WIDTH,
    height: INDICATOR_WIDTH,
  },
  circleWrapper: {
    position: 'absolute',
    borderRadius: 100,
    width: 100,
    height: 100,
    marginTop: 70,
    alignItems: 'center',
    width: '100%',
  },
  circle: {
    position: 'absolute',
    borderRadius: 500,
    width: 200,
    aspectRatio: 1,
  },
  headerTextStyle: {
    position: 'absolute',
    top: 10,
    left: 10,
    height: HEADER_HEIGHT,
    overflow: 'hidden',
  },
  headerStyle: {
    fontSize: 16,
    height: HEADER_HEIGHT,
    textAlignVertical: 'center',
    fontFamily: R.fonts.SignikaNegative_Regular,
  },
  headerText: {
    justifyContent: 'center',
    alignItems: 'center',
  },
})
