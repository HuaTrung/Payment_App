import React, { Component } from 'react';
import { StyleSheet, View, YellowBox, TouchableOpacity, Text} from 'react-native';
import { Root } from "native-base";
import {RootNavigator, SignOutStack}  from './src/navigation-config/HomeStack';
import Splash from './src/components/splash-ui/Splash';

YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated']);

import { Provider } from  "react-redux";
import store from './src/redux/store';

import QR from "./src/components/custom-ui/qr-ui/QR";

export default class App extends Component {


  constructor(props) {
    super(props);
    this.state = { splashScreen: true};

    setTimeout(()=>{
      this.setState({ splashScreen:false});
    },3000);
  }

  takePicture = async function() {
    if (this.camera) {
      const options = { quality: 0.5, base64: true };
      const data = await this.camera.takePictureAsync(options)
      console.log(data.uri);
    }
  };

  render() {
    const { splashScreen } = this.state;
    let mainScreen = splashScreen ? <Splash /> : <RootNavigator />;

    return (
      <Provider store = { store } >
        <Root>  
          <RootNavigator/>          
          {/* <View style={styles.container}>
            <QR text="Welcome to React Native!"
              format="QR_CODE"
              style={styles.barcode} />
          </View> */}
        </Root>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  barcode: {
    height: 300,
    width: 300,
    alignSelf: 'center' 
  }
});