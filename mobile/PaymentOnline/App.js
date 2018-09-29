import React, { Component } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';


import SignIn from './src/components/login-ui/SignIn';

import SignUp from './src/components/login-ui/SignUp';
export default class App extends Component {
  render() {
    return (
      <View style={styles.container}>
        <ScrollView
          horizontal
          pagingEnabled
          decelerationRate={0.993} >
          <SignUp/>
          <SignIn/>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black'
  }
});