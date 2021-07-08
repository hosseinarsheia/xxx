import React, { useEffect, useState } from 'react'
import { View, Text, Alert, StatusBar, Dimensions, Image, StyleSheet, FlatList, Animated, interpolate } from 'react-native'
import { observable, action, autorun, computed } from 'mobx'
import { inject, observer, useLocalStore } from 'mobx-react'
import R from '../../res/R'
// import Animated, { useSharedValue, interpolateNode, useAnimatedStyle, Extrapolate } from 'react-native-reanimated'

const { width, height } = Dimensions.get('window')
const PRODUCT_LIST = [
  {
    title: 'MDR-XB550AP',
    description:
      'هدفون سیمی MDR-XB550AP محصولی از کمپانی محبوب سونی است و دارای کاپ‌های نرم و سری قابل تنظیم است که می‌توانید ساعت‌های زیادی از آن بدون ایجاد خستگی و یا سنگینی استفاده کنید',
    price: '$20',
    bg: '#9dcdfa',
    id: '1',
    url: require('../../images/Headphones/1.png'),
    brand: 'Sony',
  },
  {
    title: 'WH-CH710N',
    description:
      'این مدل برای شنیدن موسیقی مناسب است و ویژگی‌هایی ارائه می‌دهد که از این بین می‌توان به بهره‌مندی از میکروفون و داشتن دستیار صوتی هوشمند اشاره کرد. همچنین این هدفون می‌تواند جلوی شنیده شدن صداهای محیطی ناخواسته را بگیرد.',
    price: '$20',
    bg: '#db9efa',
    id: '2',
    url: require('../../images/Headphones/2.png'),
    brand: 'Razer',
  },
  {
    title: 'WH-1000XM3',
    description:
      '.این مدل هدفون دارای کنترل هوشمند صدا Adaptive Sound Control میباشد که با توجه به صدای محیط میزان صدای هدفون را تنظیم میکند.گوش دادن هوشمند توسط Adaptive Sound Control همه رفتار شما را شناسایی می کند',
    price: '$20',
    bg: '#999',
    id: '3',
    url: require('../../images/Headphones/3.png'),
    brand: 'Panasonic',
  },
  {
    title: 'WH-XB900N',
    description:
      'این هدفون از درایورهای ۴۰ میلی‌متری داینامیک بهره‌مند است. این درایورها، به‌کمک موارد دیگری نظیر پورت بیس و طراحی حساب‌شده‌ی ایرکاپ‌ها و ایرپدها، بیسی بسیار قدرتمند و کوبنده تولید می‌کنند که بدون شک به مذاق بیس‌دوست‌ها و طرفداران سبک‌هایی چون الکترونیک و هیپ‌هاپ خوش خواهد آمد.',
    price: '$20',
    bg: '#a1e3a1',
    id: '4',
    url: require('../../images/Headphones/4.png'),
    brand: 'Beats',
  },
]

const HEADER_HEIGHT = 30
const INDICATOR_WIDTH = 30

const keyExtractor = item => `${item.id}`

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
    <View style={{ width, height, alignItems: 'center', paddingVertical: 10, marginTop: 50, paddingHorizontal: 10 }}>
      <View style={{ justifyContent: 'center', alignItems: 'center' }}>
        <Animated.Image source={url} style={[styles.imageStyle, { opacity, transform: [{ scale }] }]} />
      </View>
      <Animated.Text
        style={[
          styles.titleStyle,
          { opacity, transform: [{ translateX }], marginTop: 10, fontFamily: R.fonts.SignikaNegative_Regular },
        ]}>
        {title}
      </Animated.Text>
      <Animated.Text style={[styles.descriptionStyle, { opacity, textAlign: 'right', marginTop: 20 }]}>
        {description}
      </Animated.Text>
    </View>
  )
}

/****************************************************************************/
const PaginationIndicator = ({ scrollX }) => {
  return (
    <View style={{ position: 'absolute', bottom: 10, right: 10, flexDirection: 'row' }}>
      {PRODUCT_LIST.map((value, index) => {
        const inputRange = [(index - 1) * width, index * width, (index + 1) * width]

        const translateX = scrollX.interpolate({
          inputRange,
          outputRange: [-INDICATOR_WIDTH, 0, INDICATOR_WIDTH],
        })

        return (
          <View
            key={`${index}`}
            style={{
              width: INDICATOR_WIDTH,
              height: INDICATOR_WIDTH,
              // backgroundColor: index % 2 == 0 ? 'green' : 'red',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <View
              style={{
                borderRadius: 100,
                width: INDICATOR_WIDTH / 2,
                height: INDICATOR_WIDTH / 2,
                backgroundColor: value.bg,
                opacity: 0.7,
              }}
            />
            <Animated.View
              style={{
                position: 'absolute',
                borderRadius: 100,
                borderColor: 'red',
                borderWidth: 1,
                width: INDICATOR_WIDTH,
                height: INDICATOR_WIDTH,
                transform: [{ translateX }],
                // justifyContent: 'center',
                // alignItems: 'center',
              }}></Animated.View>
          </View>
        )
      })}
    </View>
  )
}
/****************************************************************************/
const CircleComponent = ({ scrollX }) => {
  return (
    <View
      style={{
        position: 'absolute',
        borderRadius: 100,
        width: 100,
        height: 100,
        marginTop: 70,
        alignItems: 'center',
        width: '100%',
      }}>
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
            style={{
              position: 'absolute',
              backgroundColor: value.bg,
              borderRadius: 500,
              width: 200,
              aspectRatio: 1,
              opacity,
              transform: [{ scale }],
            }}
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
    <View
      style={{
        position: 'absolute',
        top: 10,
        left: 10,
        height: HEADER_HEIGHT,
        overflow: 'hidden',
      }}>
      {PRODUCT_LIST.map((value, index) => (
        <Animated.View key={value.id} style={{ justifyContent: 'center', alignItems: 'center', transform: [{ translateY }] }}>
          <Text
            style={{
              fontSize: 16,
              height: HEADER_HEIGHT,
              textAlignVertical: 'center',
              fontFamily: R.fonts.SignikaNegative_Regular,
            }}>
            {value.brand}
          </Text>
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

      <CircleComponent scrollX={scrollX} />
      <Animated.FlatList
        pagingEnabled
        horizontal
        showsHorizontalScrollIndicator={false}
        data={PRODUCT_LIST}
        renderItem={({ item, index }) => <RenderItem {...item} index={index} scrollX={scrollX} />}
        keyExtractor={keyExtractor}
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], { useNativeDriver: true })}
        scrollEventThrottle={16}
      />

      <PaginationIndicator scrollX={scrollX} />
    </View>
  )
}

export default observer(HeadPhoneSlider)

export const styles = StyleSheet.create({
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
  },
  descriptionStyle: {
    fontSize: 14,
    fontFamily: R.fonts.IRANSansMobile,
    color: R.colors.textColor,
  },
})
