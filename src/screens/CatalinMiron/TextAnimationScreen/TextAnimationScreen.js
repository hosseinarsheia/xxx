import React, { useCallback, useEffect, useLayoutEffect, useState } from 'react'
import { View, Text, Alert, StyleSheet, Button } from 'react-native'
import { observer } from 'mobx-react'

import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useDerivedValue,
  withTiming,
  withDelay,
} from 'react-native-reanimated'

import R from '../../../res/R'

const text =
  'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Amet id voluptate dolorum debitis ab impedit debitis  '
const textArr = text.split(' ')

const TextAnimationScreen = () => {
  const [animationArray, setAnimationArray] = useState([])
  const animateValue = useSharedValue(0)

  const addArrHandler = () => {
    for (data of textArr) {
      setAnimationArray(prevValue => [...prevValue, animateValue])
    }
  }

  return (
    <View style={styles.container}>
      {textArr.map((text, index) => {
        const animatedStyle = useAnimatedStyle(() => {
          return {
            opacity: animationArray.length > 0 ? withDelay(350 * index, withTiming(1)) : 0,
          }
        })

        return (
          <Animated.Text key={index} style={[styles.textStyle, animatedStyle]}>
            {` ${text}`}
          </Animated.Text>
        )
      })}

      <View style={{ marginTop: 20 }}>
        <Button title="press me" onPress={addArrHandler} />
      </View>
    </View>
  )
}

export default observer(TextAnimationScreen)

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    // justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
  },
  textStyle: {
    ...R.styles.normalFont,
    fontSize: R.fontSizes.xxxBig,
    fontFamily: R.fonts.SignikaNegative_Regular,
  },
})
