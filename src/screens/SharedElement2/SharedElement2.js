import React, { useEffect } from 'react'
import { View, Text, Alert, TouchableOpacity, Image, Dimensions } from 'react-native'
import { observable, action, autorun, computed } from 'mobx'
import { inject, observer, useLocalStore } from 'mobx-react'
import { SharedElement } from 'react-navigation-shared-element'
import { Icon } from 'react-native-elements'

import R from '../../res/R'
import { PRODUCT_LIST } from '../../res/data'

const { width, height } = Dimensions.get('window')

const SharedElement2 = props => {
  return (
    <View style={{ flex: 1, alignItems: 'center' }}>
      <Text style={R.styles.normalFont}>SharedElement2</Text>
    </View>
  )
}

export default observer(SharedElement2)
