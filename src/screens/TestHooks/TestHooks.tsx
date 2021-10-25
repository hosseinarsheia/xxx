import React, { useEffect, useRef } from 'react'
import { View, Text, Alert, Button } from 'react-native'
import { observable, action, autorun, computed } from 'mobx'
import { inject, observer, useLocalStore } from 'mobx-react'

import useFetch from '../../Hooks/useFetch'
import Animated, { useSharedValue } from 'react-native-reanimated'

const TestHooks = () => {
  const { res, err, useFetchData, isLoading } = useFetch('/User/Login', { mobile: '09366362218', password: '2218' })
  let animated: Animated.SharedValue<number> = useSharedValue(5)
  const ref = useRef(null)
  useEffect(() => {
    // getDataHandler()
  }, [])

  const getDataHandler = () => {
    useFetchData()
    if (res) alert(`true`)
    else alert(`'false`)
  }

  return (
    <View ref={ref} style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>TestHooks Screen</Text>

      <Text>{res}</Text>
      <Text>{`${isLoading}`}</Text>

      <Button title="press me" onPress={useFetchData} />
    </View>
  )
}

export default TestHooks
