import React, { useEffect } from 'react'
import { View, Text, Alert, TouchableOpacity, Image, Dimensions } from 'react-native'
import { observable, action, autorun, computed } from 'mobx'
import { inject, observer, useLocalStore } from 'mobx-react'
import { SharedElement } from 'react-navigation-shared-element'
import { Icon } from 'react-native-elements'

import R from '../../../res/R'
import { ICON_LIST } from '../../../res/data'

const { width, height } = Dimensions.get('window')

const ICON_SIZE = 70
const SPACING = 10

const SharedElementComponent = ({ navigation }) => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <View style={{ width, flexWrap: 'wrap', flexDirection: 'row' }}>
        {ICON_LIST.map(item => (
          <View
            style={{
              width: ICON_SIZE,
              margin: SPACING,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <SharedElement key={item.id} id={item.id}>
              <Icon
                onPress={() => navigation.navigate('SecondScreen', { item })}
                containerStyle={{ alignItems: 'center', justifyContent: 'center' }}
                name={item.name}
                type="antdesign"
                color="#517fa4"
              />
            </SharedElement>
          </View>
        ))}
      </View>
    </View>
  )
}

export default observer(SharedElementComponent)
