import React, { useRef } from 'react'
import { View, Text, StatusBar, Dimensions, StyleSheet, FlatList } from 'react-native'
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useAnimatedScrollHandler,
  interpolate,
} from 'react-native-reanimated'

import R from '../../../res/R'
import { PRODUCT_LIST } from '../../../res/data'

const { width, height } = Dimensions.get('window')

const HEADER_HEIGHT = 30
const INDICATOR_WIDTH = 30

const RenderItem = ({ url, title, index, scrollX, description, bg }) => {
  const inputRange = [(index - 1) * width, index * width, (index + 1) * width]
  const delayOpacityRange = [(index - 0.8) * width, index * width, (index + 0.8) * width]

  const imageStyles = useAnimatedStyle(() => ({
    opacity: interpolate(scrollX.value, delayOpacityRange, [0, 1, 0]),
    transform: [{ scale: interpolate(scrollX.value, inputRange, [0, 1, 0]) }],
  }))

  const opacityStyle = useAnimatedStyle(() => ({
    opacity: interpolate(scrollX.value, delayOpacityRange, [0, 1, 0]),
  }))

  return (
    <View style={styles.pageCpntainer}>
      <View style={{ justifyContent: 'center', alignItems: 'center' }}>
        <Animated.Image source={url} style={[styles.imageStyle, imageStyles]} />
      </View>
      <Animated.Text style={[styles.titleStyle]}>{title}</Animated.Text>
      <Animated.Text style={[styles.descriptionStyle, opacityStyle]}>{description}</Animated.Text>
    </View>
  )
}

/****************************************************************************/
const PaginationIndicator = ({ scrollX }) => {
  return (
    <View style={styles.paginationWrapper}>
      {PRODUCT_LIST.map((value, index) => {
        const inputRange = [(index - 1) * width, index * width, (index + 1) * width]

        const animatedStyle = useAnimatedStyle(() => ({
          transform: [
            {
              translateX: interpolate(scrollX.value, inputRange, [
                -INDICATOR_WIDTH,
                0,
                INDICATOR_WIDTH,
              ]),
            },
          ],
        }))

        return (
          <View key={`${index}`} style={styles.paginationBoxWrapper}>
            <View style={[styles.dotStyle, { backgroundColor: value.bg }]} />
            <Animated.View style={[styles.paginationCircle, animatedStyle]} />
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

        const animatedStyle = useAnimatedStyle(() => ({
          opacity: interpolate(scrollX.value, inputRange, [0.1, 0.4, 0.1]),
          transform: [{ scale: interpolate(scrollX.value, inputRange, [0, 1, 0], 'clamp') }],
        }))

        return (
          <Animated.View
            key={`${index}`}
            style={[styles.circle, { backgroundColor: value.bg }, animatedStyle]}
          />
        )
      })}
    </View>
  )
}

/****************************************************************************/
const HeaderTextComonent = ({ scrollX }) => {
  const inputRange = [-width, 0, width]

  // const translateY = interpolate(scrollX.value, inputRange, [HEADER_HEIGHT, 0, -HEADER_HEIGHT])

  return (
    <View style={styles.headerTextStyle}>
      {PRODUCT_LIST.map((value, index) => {
        const animatedStyle = useAnimatedStyle(() => ({
          transform: [
            {
              translateY: interpolate(scrollX.value, inputRange, [
                HEADER_HEIGHT,
                0,
                -HEADER_HEIGHT,
              ]),
            },
          ],
        }))
        return (
          <Animated.View key={value.id} style={[styles.headerText, animatedStyle]}>
            <Text style={styles.headerStyle}>{value.brand}</Text>
          </Animated.View>
        )
      })}
    </View>
  )
}

/****************************************************************************/

const HeadPhoneSliderRe_Animated = props => {
  const scrollX = useRef(useSharedValue(0)).current

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: event => (scrollX.value = event.contentOffset.x),
  })

  return (
    <View>
      <StatusBar hidden />

      <HeaderTextComonent scrollX={scrollX} />

      {/*   <BackgroundCircleComponent scrollX={scrollX} /> */}

      <FlatList
        renderScrollComponent={props => <Animated.ScrollView {...props} onScroll={scrollHandler} />}
        pagingEnabled
        horizontal
        showsHorizontalScrollIndicator={false}
        data={PRODUCT_LIST}
        renderItem={({ item, index }) => <RenderItem {...item} index={index} scrollX={scrollX} />}
        keyExtractor={item => `${item.id}`}
        scrollEventThrottle={16}
      />

      <PaginationIndicator scrollX={scrollX} />
    </View>
  )
}

export default HeadPhoneSliderRe_Animated

export const styles = StyleSheet.create({
  box: {
    width: 50,
    height: 50,
    backgroundColor: 'tomato',
  },
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
