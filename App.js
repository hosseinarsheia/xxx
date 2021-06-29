import React, { useEffect } from 'react'
import { View, Text, Alert } from 'react-native'
import { observable, action, autorun, computed } from 'mobx'
import { inject, observer, useLocalStore } from 'mobx-react'

import BottomSheet from './screens/BoTtomSheet'

const App = props => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <BottomSheet />
    </View>
  )
}

export default observer(App)
