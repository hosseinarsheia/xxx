import React, { useEffect } from 'react'
import { View, Text, Alert, TouchableNativeFeedback, TouchableHighlight, StyleSheet } from 'react-native'
import { observable, action, autorun, computed } from 'mobx'
import { inject, observer, useLocalStore } from 'mobx-react'

import R from '../../../../res/R'
import S from '../S'
import { TouchableOpacity } from 'react-native-gesture-handler'

const Button = ({ title, containerStyle, tochableStyle, textStyle }) => {
  return (
    <View style={[styles.container, containerStyle]}>
      <TouchableHighlight style={[styles.tochable, tochableStyle]}>
        <Text style={[styles.text, textStyle]}>{title}</Text>
      </TouchableHighlight>
    </View>
  )
}

export default observer(Button)

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '100%',
    borderRadius: 100,
  },

  tochable: {
    width: '100%',
    backgroundColor: S.colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
  },
  text: {
    ...S.styles.Avenir_Heavy_16,
    color: 'white',
    fontWeight: '900',
    marginVertical: 10,
  },
})
