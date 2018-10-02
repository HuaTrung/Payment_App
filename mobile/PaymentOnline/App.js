import React, { Component } from 'react';
import { StyleSheet, View, ScrollView, TextInput, Text} from 'react-native';


import RootLogin from './src/components/login-ui/RootNavigation/RootLogin';
import CompanyBanner from './src/components/login-ui/Banner/CompanyBanner';


export default class App extends Component {
  render() {
    return (
      <View style={{ flex: 1 /*, backgroundColor: appMainColor */}}>
        <CompanyBanner />
        <RootLogin />
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
    paddingBottom: 300,
  }
});