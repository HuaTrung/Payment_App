import React, { Component } from 'react';
import { 
  View, 
  Text,
  StyleSheet, 
  Dimensions, 
  TouchableOpacity,
} from 'react-native';

import { PayScanStack } from "../../navigation-config/HomeStack";

import Ionicons from "react-native-vector-icons/Ionicons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";


import {RNCamera} from "react-native-camera";
import QRS from "../custom-ui/qr-ui/QRS";
const { width, height } = Dimensions.get('window');


class PayScan extends Component {
  constructor(props) {
    super(props);
    this.state = {  };
  }
  render() {
    return (
      <View style = {{ flex:1}}>
        {/* Top bar */}
        <View style = {{ 
          height:50, 
          backgroundColor: "#1aa3ff", 
          justifyContent: "center", 
          alignItems: "center" ,
          flexDirection: "row" 
        }}>
          <TouchableOpacity style = {{ marginLeft: 7 }} onPress = { ()=> this.props.navigation.goBack() } >
            <Ionicons              
              name = "ios-arrow-back" 
              size = {35}
              color = "white"
            />
          </TouchableOpacity>          
          <View style = {{ flex: 1 }}>
            <Text style = {{ textAlign : "center", color: "white", fontWeight:"500", fontSize: 18}} >Pay Scan</Text>
          </View>
        </View>
        {/* Tab bar */}
        <View style = {{flex: 1}}>
          <PayScanStack />
        </View>
        {/* <RNCamera
            style = {{height: 200, width: 200}}
            type={RNCamera.Constants.Type.front}
        /> */}
        {/* <QRS /> */}
      </View>
    );
  }
}

export default PayScan;
