import { View, Text, Image,StyleSheet } from 'react-native';
import React, { Component } from 'react';

const _splash = require("../../assets/splash.png");

class Splash extends Component {



  render() {
    return (
      <View style = {{ flex:1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#4d94ff' }}>
        <Image source={_splash} resizeMode="stretch" style={{width: "100%", height: "100%"  }} />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  icon: {
    
  },
});
export default Splash;