import React, { useEffect } from 'react'
import { View, Text, Alert, Image, StatusBar, StyleSheet, ScrollView, Animated } from 'react-native'
import { observable, action, autorun, computed } from 'mobx'
import { inject, observer, useLocalStore } from 'mobx-react'

import R from '../../../../../res/R'
import S from '../../S'
import Button from '../../components/Button'

const animationArr = [0, 1, 2]

const Onboarding1 = props => {
  const scrollX = new Animated.Value(0)
  return (
    <View style={{ flex: 1, alignItems: 'center' }}>
      <StatusBar translucent backgroundColor="transparent" />

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToInterval={R.dimensions.window.width}
        decelerationRate="fast"
        bounces={false}
        scrollEventThrottle={16}
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }])}>
        <View style={styles.pageWrapper}>
          <Image source={require('../../images/bg2.png')} style={styles.backgroundImage} />

          <View style={{ paddingHorizontal: S.dimensions.dimensions.h40 }}>
            <Image source={require('../../images/2.png')} style={styles.image} />
          </View>

          <Text style={[S.styles.Avenir_Heavy_20, { marginTop: S.dimensions.dimensions.v70, fontWeight: '900' }]}>
            Quick update
          </Text>
          <Text style={styles.paraghraph}>Stay informed with the fastest and most effective way, wherever you are</Text>
        </View>

        <View style={styles.pageWrapper}>
          <Image
            source={require('../../images/bg3.png')}
            style={[styles.backgroundImage, { height: S.dimensions.verticalScale(365) }]}
          />

          <View style={{ paddingHorizontal: S.dimensions.dimensions.h40 }}>
            <Image
              source={require('../../images/3.png')}
              style={[styles.image, { width: S.dimensions.scale(300), height: S.dimensions.verticalScale(280) }]}
            />
          </View>

          <Text style={[S.styles.Avenir_Heavy_20, { marginTop: S.dimensions.dimensions.v70, fontWeight: '900' }]}>
            Notify quickly
          </Text>
          <Text style={styles.paraghraph}>Receive notices about apartments, quick feedback</Text>
        </View>

        <View style={styles.pageWrapper}>
          <Image
            source={require('../../images/bg4.png')}
            style={[styles.backgroundImage, { height: S.dimensions.verticalScale(440) }]}
          />

          <View style={{ paddingHorizontal: S.dimensions.dimensions.h40 }}>
            <Image
              source={require('../../images/4.png')}
              style={[styles.image, { width: S.dimensions.scale(340), height: S.dimensions.verticalScale(285) }]}
            />
          </View>

          <Text style={[S.styles.Avenir_Heavy_20, { marginTop: S.dimensions.dimensions.v70, fontWeight: '900' }]}>
            Scan the bill
          </Text>
          <Text style={styles.paraghraph}>
            Quickly scan your bill when you receive your purchase invoice, or pay your utility bill
          </Text>
        </View>
      </ScrollView>

      <View style={styles.paginationDot}>
        {animationArr.map((value, index) => {
          const width = R.dimensions.window.width
          const inputRange = [(index - 1) * width, index * width, (index + 1) * width]

          const backgroundColor = scrollX.interpolate({
            inputRange,
            outputRange: [S.colors.darkGrey, S.colors.primary, S.colors.darkGrey],
            extrapolate: 'clamp',
          })

          scale = scrollX.interpolate({
            inputRange,
            outputRange: [0.5, 1, 0.5],
            extrapolate: 'clamp',
          })

          opacity = scrollX.interpolate({
            inputRange,
            outputRange: [0.5, 1, 0.5],
            extrapolate: 'clamp',
          })

          return (
            <Animated.View
              style={{
                width: 10,
                height: 10,
                borderRadius: 10,
                margin: 5,
                marginTop: 10,
                transform: [{ scale }],
                backgroundColor,
                opacity,
              }}
            />
          )
        })}
      </View>

      <Button containerStyle={styles.buttonContainerStyle} title="Get Startd!" />
    </View>
  )
}

export default observer(Onboarding1)

export const styles = StyleSheet.create({
  pageWrapper: {
    width: R.dimensions.window.width,
    height: R.dimensions.window.height,
    alignItems: 'center',
  },
  backgroundImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: S.dimensions.verticalScale(430),
    width: R.dimensions.window.width,
    zIndex: 0,
    resizeMode: 'stretch',
  },
  image: {
    width: S.dimensions.scale(300),
    height: S.dimensions.verticalScale(285),
    resizeMode: 'contain',
    marginTop: S.dimensions.dimensions.v110,
  },
  paraghraph: {
    ...S.styles.Avenir_Black_16,
    marginTop: S.dimensions.dimensions.v20,
    fontWeight: '500',
    color: S.colors.darkGrey,
    textAlign: 'center',
    paddingHorizontal: S.dimensions.dimensions.h35,
    lineHeight: 25,
  },

  buttonContainerStyle: {
    marginHorizontal: S.dimensions.dimensions.h25,
    position: 'absolute',
    bottom: 24,
    paddingHorizontal: S.dimensions.dimensions.h25,
  },
  paginationDot: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 110,
    width: '100%',
  },
})
