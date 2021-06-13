import React from 'react';
import { Button, Text, View } from 'react-native';
import { observer } from 'mobx-react';
// import { useAnimatedStyle } from 'react-native-reanimated';

// import { store } from './Store'

// class App extends React.Component {
//   increase = () => {}

//   render() {
//     return (
//       <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//         <Button title="press me" onPress={this.increase} />
//       </View>
//     )
//   }
// }

import Animated, {
  useSharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';

function App() {
  const offset = useSharedValue(0);

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: offset.value * 255 }],
    };
  });

  return (
    <View>
      <Animated.View
        style={[
          { width: 100, height: 100, backgroundColor: 'tomato' },
          animatedStyles,
        ]}
      />
      <Button onPress={() => (offset.value = Math.random())} title="Move" />
    </View>
  );
}
export default observer(App);
