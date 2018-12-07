import React, { Component } from 'react';
import { StyleSheet, View, YellowBox, StatusBar, AppState} from 'react-native';
import { Root } from "native-base";
import {RootNavigator}  from './src/navigation-config/Route';
import Splash from './src/components/splash-ui/Splash';
import BackgroundTimer from "react-native-background-timer";
YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated']);
import { Provider } from  "react-redux";
import store from './src/redux/store';

import firebase from "react-native-firebase";

export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = { splashScreen: true};

    // setTimeout(()=>{
    //   this.setState({ splashScreen:false});
    // },3000);
  }

  _handleBackground = (nextAppState) => {
    console.log("App is running at: " + nextAppState);
    if(nextAppState.match(/background|inactive/)) {
      BackgroundTimer.runBackgroundTimer(() => console.log("background"),2000);
    } else if(nextAppState =="active") BackgroundTimer.stopBackgroundTimer();  
  }

  componentDidMount() {
    AppState.addEventListener("change", this._handleBackground);
    // firebase.database().ref("online").on("child_added", snapshot => {
    //   console.log(JSON.stringify(snapshot));
    // })
  }

  componentWillUnmount() {
    AppState.addEventListener("change", this._handleBackground);
    firebase.database().ref("online").on("value", snapshot => {
      console.log(JSON.stringify(snapshot));
    })
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

