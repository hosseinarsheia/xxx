// import React, { useEffect } from 'react'
// import { View, Text, Alert, Button, TouchableOpacity } from 'react-native'
// import { useSelector, useDispatch } from 'react-redux'
// import { decrement, increment, incrementByAmount } from '../../ReduXStore/counterSlice'

// const MyButton = React.memo(({ title }) => {
//   // const age = useSelector(
//   //   state => state.counter.age,
//   //   (prev, next) => prev === next,
//   // )
//   useEffect(() => {
//     console.log('myButton mounted')

//     return () => console.log('myButton UnMounted')
//   })

//   return (
//     <TouchableOpacity style={{ width: 100, backgroundColor: 'tomato', marginVertical: 20, padding: 30 }}>
//       <Text>{title}</Text>
//     </TouchableOpacity>
//   )
// })

// const MyRedux = props => {
//   const num = useSelector(state => state.counter.num)
//   const dispatch = useDispatch()

//   useEffect(() => {
//     console.log('MyRedux mounted')

//     return () => console.log('MyRedux UnMounted')
//   })

//   return (
//     <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
//       <Button title="increment" onPress={() => dispatch(increment())} />

//       <View style={{ marginVertical: 20 }}></View>
//       <Button title="decrement" onPress={() => dispatch(decrement())} />

//       <View style={{ marginVertical: 20 }}></View>
//       <Button title="incrementByAmount" onPress={() => dispatch(incrementByAmount(5))} />

//       <MyButton title="hello" />

//       <Text>{num}</Text>
//     </View>
//   )
// }

// export default MyRedux

import React, { useEffect, useState, useRef } from 'react'
import { View, Text, Alert, StyleSheet, Button, Easing, Animated } from 'react-native'
import { AnimatedCircularProgress } from 'react-native-circular-progress'

const MyRedux = props => {
  // const [progress, setProgress] = useState(0)

  const myRef = useRef()
  useEffect(() => {
    animated(75)
  }, [])

  const animated = toValue => {
    setTimeout(() => {
      myRef.current.animate(toValue, 1000, Easing.in)
    }, 1000)
  }

  const circles = progressValue => (
    <>
      <View style={styles.circlesContainer}>
        <View style={styles.innerCircle} />
        <View style={styles.outerCircle} />
      </View>

      <Text style={styles.text}>{`Your Driving Score \n ${Math.floor(progressValue)} \n out of 100 \n Soaring Up ! `}</Text>
    </>
  )

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <AnimatedCircularProgress
        ref={myRef}
        rotation={0}
        size={220}
        width={10}
        fill={0}
        // duration={1000}
        tintColor="#004952"
        // tintColorSecondary={'#004952'}
        dashedTint={{ width: 2, gap: 4 }}
        children={circles}
      />

      <View style={{ marginTop: 20 }}>
        <Button title="animated progress" onPress={() => animated(75)} />
      </View>
      <View style={{ marginTop: 20 }}>
        <Button title="reset progress" onPress={() => animated(0)} />
      </View>
    </View>
  )
}

export default MyRedux

export const styles = StyleSheet.create({
  circlesContainer: {
    flex: 1,
    width: '100%',
    padding: 10,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },

  innerCircle: {
    height: '80%',
    width: '80%',
    backgroundColor: '#004952',
    position: 'absolute',
    borderRadius: 100,
  },
  outerCircle: {
    height: '100%',
    width: '100%',
    backgroundColor: '#99D8D6',
    borderRadius: 100,
    position: 'absolute',
    zIndex: -1,
  },
  text: {
    position: 'absolute',
    color: 'white',
    zIndex: 10,
    textAlign: 'center',
  },
})
