import React, {Component} from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
import {observable, makeObservable, makeAutoObservable} from 'mobx';
import {inject, observer, useLocalObservable} from 'mobx-react';

import {store} from './Store';

const App = () => {
  // callApi = () => {
  //   fetch('https://jsonplaceholder.typicode.com/todos/1')
  //     .then(response => response.json())
  //     .then(json => {
  //       console.log('mine');
  //       console.log(json);
  //       this.setState(prevState => {
  //         return {a: json.id, b: prevState.b + 1};
  //       });
  //     });
  // };

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      {/* <Text>{this.state.a}</Text>
        <Text>{this.state.b}</Text> */}
      <Text>{store.num}</Text>

      <Button title="press me" onPress={store.increase} />
    </View>
  );
};
export default observer(App);
