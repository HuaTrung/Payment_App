import React, { Component } from 'react';
import { View, Dimensions, StyleSheet, Modal , Text, TouchableHighlight} from 'react-native';
import KbButton from "./KeyboardButton";
import KeyBoard from "./KeyBoard";
import PIN from "./PinCode";
const { width, height } = Dimensions.get("window");

class SecurityPass extends Component { 

  constructor(props) {
    super(props);
    this.state = {
      passWord: "sdsd"
    };
  }
  
  render() {
    return(
      <View style = {{ flex:1, alignContent: "center", justifyContent:"center" }}>
        <View style={{ height: 200, flexDirection: "row", alignItems: 'flex-end', justifyContent: 'center' }}>
          <Text style = {{ textAlign: "center", fontSize: 20,fontWeight: '200', lineHeight: 33, color: "#6EC7C9", flexWrap: "wrap" }}>1 - Enter PIN CODE to protect your password</Text>
        </View>
        <PIN />
        <KeyBoard />
      </View>
    );
  }
}

export default SecurityPass;