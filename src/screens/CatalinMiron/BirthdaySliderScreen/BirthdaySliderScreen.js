import React, { useEffect } from 'react'
import { View, Text, Alert } from 'react-native'
import { observable, action, autorun, computed } from 'mobx'
import { inject, observer, useLocalStore } from 'mobx-react'

import R from '../../../res/R'
import fontSizes from '../../../res/fontSizes'

const BirthdaySliderScreen = props => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ fontSize: 30, fontFamily: R.fonts.Avenir_Medium }}>BirthdaySliderScreen</Text>
      <Text style={{ fontSize: 30, fontFamily: R.fonts.Avenir_Bold }}>BirthdaySliderScreen</Text>
      {/* <Text style={{ fontSize: 30, fontFamily: R.fonts.Avenir_Roman }}>BirthdaySliderScreen</Text> */}
    </View>
  )
}

export default observer(BirthdaySliderScreen)
