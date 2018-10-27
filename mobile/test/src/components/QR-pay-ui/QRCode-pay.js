import React, { Component } from 'react';
import { 
  View, 
  Text,
  StyleSheet, 
  Dimensions, 
  TouchableOpacity,
} from 'react-native';

import {RNCamera} from "react-native-camera";

import FontAwesome from "react-native-vector-icons/FontAwesome";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import Camera from "react-native-camera";

const { width, height } = Dimensions.get('window');

export default class QrPay extends Component {
  render() {
    return (
      <View style = {{ flex: 1 }}> 
        {/* <RNCamera
            style = {{height: 200, width: 200}}
            type={RNCamera.Constants.Type.front}
        /> */}
      </View>
    )
  }
}