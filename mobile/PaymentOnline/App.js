import React, { Component } from 'react';
import { StyleSheet, View, YellowBox} from 'react-native';

import {HomeStackNavigator}  from './src/navigation-config/HomeStack';
import Splash from './src/components/splash-ui/Splash';

YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated']);
export default class App extends Component {


  constructor(props) {
    super(props);
    this.state = { splashScreen: true};

    setTimeout(()=>{
      this.setState({ splashScreen:false});
    },3000);
  }

  render() {
    const { splashScreen } = this.state;
    let mainScreen = splashScreen ? <Splash /> : <HomeStackNavigator />;
    return mainScreen;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 0,
    backgroundColor: 'white',
  }
});