import React, { Component } from 'react';
import { StyleSheet, View, YellowBox, StatusBar, AppState} from 'react-native';
import { Root } from "native-base";
import {RootNavigator}  from './src/navigation-config/Route';
import Splash from './src/components/splash-ui/Splash';
import BackgroundTimer from "react-native-background-timer";
YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated']);
import { Provider } from  "react-redux";
import store from './src/redux/store';
import {offline,online} from "./src/no-redux/logout";
import firebase from "react-native-firebase";
import { queryUserId } from "./src/realm/userQueries";
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
      offline();
      BackgroundTimer.runBackgroundTimer(() => {   
        firebase.database().ref("transaction").on("child_changed", snapshot => {
          console.log(JSON.stringify("lang nghe nekkkkk"));
        })     
        console.log("background")},2000);
    } else if(nextAppState =="active") {      
      online();
      BackgroundTimer.stopBackgroundTimer();  
    }
  }

  componentDidMount() {
    AppState.addEventListener("change", this._handleBackground);
  }

  componentWillUnmount() {
    AppState.addEventListener("change", this._handleBackground);

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

