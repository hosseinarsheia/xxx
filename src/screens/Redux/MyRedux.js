import React, { useEffect, useState } from 'react'
import { View, Text, Alert, StyleSheet, Button } from 'react-native'
import AnimatedCircularProgress from './AnimatedCircularProgress'

const MyRedux = props => {
  const [progress, setProgress] = useState(100)

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
        rotation={0}
        size={220}
        width={10}
        fill={progress}
        firstColor="green"
        secondColor="tomato"
        // tintColor="blue"
        // tintColorSecondary={'red'}
        dashedTint={{ width: 2, gap: 4 }}
        children={circles}
        duration={1000}
      />

      <View style={{ marginTop: 20 }}>
        <Button title="animated progress" onPress={() => setProgress(75)} />
      </View>
      <View style={{ marginTop: 20 }}>
        <Button title="reset progress" onPress={() => setProgress(0)} />
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
