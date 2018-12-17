import React, { Component } from 'react';
import { 
  YellowBox,
  StatusBar,
  NetInfo,
  Alert
} from 'react-native';
import Modal from "react-native-modal";
import { Root } from "native-base";
import {RootNavigator}  from './src/navigation-config/Route';
import Splash from './src/components/splash-ui/Splash';
YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated']);
import { Provider } from  "react-redux";
import store from './src/redux/store';
import { CHANGE_LANGUAGE } from './src/redux/actions/types';
import {isEmptySetting, insertDefaultSetting, querySettingLanguage, isEmptyUserLogin } from "./src/realm/userQueries";

import { onMessageListener, hasPermission, onTokenRefreshListener, _fetchNewNotification } from "./src/no-redux/notification";
import { Toast } from "native-base";
export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = { 
      splashScreen: true,
      preNetInfo:0 // online -> 1: offline
    };
    this.handleFirstConnectivityChange = this.handleFirstConnectivityChange.bind(this);
    setTimeout(()=>{
      this.setState({ splashScreen:false});
    },1000);
  }

  handleFirstConnectivityChange(result){ 
    if(result.type == 'none' && this.state.preNetInfo == 0 ) { // offline
      Toast.show({ text: "You're Offline! Please connect INTERNET", buttonText: 'Okay', type: "danger", position: "bottom",duration:5000 });  
      this.setState({preNetInfo: 1});
    } else if(result.type == 'wifi' && this.state.preNetInfo == 1) { // online
      Toast.show({ text: "Welcome back! INTERNET", buttonText: 'Okay', type: "success", position: "bottom",duration:5000 });  
      this.setState({preNetInfo: 0});
      // fetch new data like notification when user logined
      // if(!isEmptyUserLogin()) _fetchNewNotification();
    }
  }

  componentDidMount() {
    if(isEmptySetting()) insertDefaultSetting();
    // Listen all data
    onMessageListener();
    // NetInfo.addEventListener('connectionChange',this.handleFirstConnectivityChange);
  }

  componentWillUnmount() {   
    onTokenRefreshListener();
    onMessageListener();
    // NetInfo.removeEventListener('connectionChange',handleFirstConnectivityChange);
  }

  render() {
   const { splashScreen } = this.state;
   let mainScreen = splashScreen ? <Splash /> : <RootNavigator />;
    return (
      <Provider store = { store } >
        <Root>  
          <StatusBar backgroundColor = "#1aa3ff" />
          { mainScreen }
        </Root>
      </Provider> 
    );
  }
}

