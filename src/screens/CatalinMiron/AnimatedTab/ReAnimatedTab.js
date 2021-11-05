import React, {
  useState,
  useEffect,
  useRef,
  forwardRef,
  createRef,
  useLayoutEffect,
  Fragment,
} from 'react'
import { View, Text, Alert, FlatList, Image, Dimensions, StyleSheet, StatusBar } from 'react-native'
import { observable, action, autorun, computed } from 'mobx'
import { inject, observer, useLocalStore } from 'mobx-react'

import Animated, {
  useSharedValue,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useDerivedValue,
  interpolate,
  runOnJS,
} from 'react-native-reanimated'

import { PRODUCT_LIST } from '../../../res/data'
import R from '../../../res/R'
const { width, height } = Dimensions.get('window')

const Slides = () => {
  return PRODUCT_LIST.map((item, index) => (
    <Image
      key={`${index}`}
      source={item.url}
      style={{ width, height, flex: 1, resizeMode: 'contain' }}
    />
  ))
}
const Indicator = () => <View style={styles.indicatorStyle} />

const Tabs = ({ setTabsDistancesArr, data, scrollX, tabsDistancesArr }) => {
  return (
    <View style={styles.tabsContainer}>
      {data.map((item, index) => {
        const lineInitialWith = useDerivedValue(() => {
          if (tabsDistancesArr.length > 0) {
            return tabsDistancesArr[0].width
          } else return 10
        })

        const rStyle = useAnimatedStyle(() => {
          const inputRange = [(index - 1) * width, index * width, (index + 1) * width]
          const outputRange = [
            tabsDistancesArr[index - 1] ? tabsDistancesArr[index - 1].width : 0,
            tabsDistancesArr[index].width,
            tabsDistancesArr[index + 1] ? tabsDistancesArr[index + 1].width : 0,
          ]
          //   console.log('tabsDistancesArr : ', tabsDistancesArr)

          return {
            width: lineInitialWith.value,
            transform: [
              {
                translateX: interpolate(scrollX.value, inputRange, [0, 50, 100, 200, 300, 400]),
              },
            ],
          }
        })

        return (
          <Fragment key={`${Math.random()}`}>
            <View
              onLayout={({ nativeEvent }) =>
                setTabsDistancesArr(prevState => [...prevState, nativeEvent.layout])
              }
              style={{ flexGrow: 1 }}>
              <Text style={{ fontFamily: R.fonts.SignikaNegative_SemiBold, textAlign: 'center' }}>
                {item.brand}
              </Text>
            </View>

            <Animated.View
              style={[
                { height: 3, backgroundColor: 'green', position: 'absolute', left: 0, bottom: 0 },
                rStyle,
              ]}
            />
          </Fragment>
        )
      })}
    </View>
  )
}

const AnimatedTab = props => {
  const scrollX = useSharedValue(0)

  const [tabsDistancesArr, setTabsDistancesArr] = useState([])

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: e => {
      scrollX.value = e.contentOffset.x
    },
  })

  return (
    <View>
      <Animated.ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        bounces={false}
        scrollEventThrottle={16}
        onScroll={scrollHandler}>
        <Slides />
      </Animated.ScrollView>

      <Tabs
        scrollX={scrollX}
        setTabsDistancesArr={setTabsDistancesArr}
        tabsDistancesArr={tabsDistancesArr}
        data={PRODUCT_LIST}
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
    backgroundColor: 'tomato',
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
