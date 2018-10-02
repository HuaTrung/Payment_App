import React, { Component } from 'react';
import { StyleSheet, View, YellowBox} from 'react-native';

import {HomeStackNavigator}  from './src/navigation-config/HomeStack';


YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated']);
export default class App extends Component {


  render() {
    return (
      <View style={{ flex: 1 }}>
        <HomeStackNavigator/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 0,
    backgroundColor: 'white',
  }
});