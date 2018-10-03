import React, { Component } from 'react';
import { View,Button } from 'react-native';
import LoginInput from './LoginInput';

export default class PhoneAuthen extends Component {

    render() {
      return (
        <View style = {{flexDirection: 'column', flex: 1  }}>
          <LoginInput label = {"Phone number"} />
          <Button title="ssdsf" ></Button>
        </View>
      );
    }
}