import React, { useState } from 'react'
import { View, Text, Alert, Dimensions, StyleSheet, FlatList } from 'react-native'

import ListItem from './ListItem'

const { width, height } = Dimensions.get('window')
const taskArr = [
  { title: 'first', id: 1 },
  { title: 'second', id: 2 },
  { title: 'third', id: 3 },
  { title: 'foutrh', id: 4 },
  { title: 'fifth', id: 5 },
  { title: 'sixth', id: 6 },
  { title: 'seventh', id: 7 },
  { title: 'eighth', id: 8 },
]

const SwipeToDelete = props => {
  const [tasks, setTasks] = useState(taskArr)

  const itemDeleteHandler = id => {
    setTasks(() => {
      return tasks.filter(value => value.id !== id)
    })
  }

  const renderItem = ({ item, index }) => (
    <ListItem item={item} index={index} itemDeleteHandler={itemDeleteHandler} />
  )

  return (
    <View style={{ flex: 1, alignItems: 'center' }}>
      <View style={{ flex: 1, width: '100%' }}>
        <FlatList
          data={tasks}
          contentContainerStyle={{ width: '100%', alignItems: 'center' }}
          renderItem={renderItem}
          keyExtractor={item => `${item.id}`}
        />
      </View>
    </View>
  )
}

export default SwipeToDelete
