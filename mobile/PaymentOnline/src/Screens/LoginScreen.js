import React, { Component } from 'react';
import { StyleSheet, View} from 'react-native';


import { TabLoginNavigator } from '../navigation-config/HomeStack';


export default class LoginScreen extends Component {
  render() {
    return (
      <View style={{ flex: 1}}>        
        <TabLoginNavigator />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 0,
    backgroundColor: 'white',
  },
  content: {
    // not cool but good enough to make all inputs visible when keyboard is active
    paddingBottom: 300
  }
});