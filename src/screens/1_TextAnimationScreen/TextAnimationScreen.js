import React, { useCallback, useEffect } from 'react'
import { View, Text, Alert, Animated, StyleSheet } from 'react-native'
import { observer } from 'mobx-react'

import R from '../../res/R'

const text = 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Amet id voluptate dolorum debitis ab impedit debitis  '
const textArr = text.split(' ')
let animationArray = []

for (data of textArr) {
  animationArray.push(new Animated.Value(0))
}

const TextAnimationScreen = props => {
  const startAnimation = useCallback(() => {
    const animations = textArr.map((_, index) => {
      return Animated.timing(animationArray[index], {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      })
    })

    Animated.stagger(400, animations).start()
  })

  useEffect(() => startAnimation(), [])

  return (
    <View style={styles.container}>
      {textArr.map((text, index) => (
        <Animated.Text key={index} style={[styles.textStyle, { opacity: animationArray[index] }]}>
          {` ${text}`}
        </Animated.Text>
      ))}
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
