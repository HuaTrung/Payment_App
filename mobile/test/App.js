import React, { Component } from 'react';
import { StyleSheet, View, YellowBox, StatusBar} from 'react-native';
import { Root } from "native-base";
import {RootNavigator}  from './src/navigation-config/Route';
import Splash from './src/components/splash-ui/Splash';
YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated']);
import { Provider } from  "react-redux";
import store from './src/redux/store';

export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = { splashScreen: true};

    // setTimeout(()=>{
    //   this.setState({ splashScreen:false});
    // },3000);
  }

  

  render() {
  //  const { splashScreen } = this.state;
  //  let mainScreen = splashScreen ? <Splash /> : <RootNavigator />;
    return (
      <Provider store = { store } >
        <Root>  
          <StatusBar backgroundColor = "#1aa3ff" />
          <RootNavigator/>           
        </Root>
      </Provider> 
    );
  }
}

