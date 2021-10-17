import React, { useEffect } from 'react'
import { View, Text, Alert, Button, TouchableOpacity } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { decrement, increment, incrementByAmount } from '../../ReduXStore/counterSlice'

const MyButton = React.memo(({ title }) => {
  // const age = useSelector(
  //   state => state.counter.age,
  //   (prev, next) => prev === next,
  // )
  useEffect(() => {
    console.log('myButton mounted')

    return () => console.log('myButton UnMounted')
  })

  return (
    <TouchableOpacity style={{ width: 100, backgroundColor: 'tomato', marginVertical: 20, padding: 30 }}>
      <Text>{title}</Text>
    </TouchableOpacity>
  )
})

const MyRedux = props => {
  const num = useSelector(state => state.counter.num)
  const dispatch = useDispatch()

  useEffect(() => {
    console.log('MyRedux mounted')

    return () => console.log('MyRedux UnMounted')
  })

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button title="increment" onPress={() => dispatch(increment())} />

      <View style={{ marginVertical: 20 }}></View>
      <Button title="decrement" onPress={() => dispatch(decrement())} />

      <View style={{ marginVertical: 20 }}></View>
      <Button title="incrementByAmount" onPress={() => dispatch(incrementByAmount(5))} />

      <MyButton title="hello" />

      <Text>{num}</Text>
    </View>
  )
}

export default MyRedux
