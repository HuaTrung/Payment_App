import React, { Component } from 'react';
import { View, Text, Dimensions } from 'react-native';    
import LoginInput from '../../custom-ui/login-input/LoginInput';
import {  Button } from 'native-base';
const height = Dimensions.get('window').height;
class ForgotPassword extends Component {

    static navigationOptions = ({ navigation, navigationOptions }) => {
        return{
            headerStyle: {},
            headerTitle: 'Forgot password'
        };
    };

    
    render() {
      return (
        <View style = {{ flex: 1}}>
          <View style = {{ marginHorizontal: 15  }}>
            <LoginInput label = {'Email'} />
            <View style={{ height:height/40}} />
            <Button block style = {{ backgroundColor: '#ff1a1a' }}>
              <Text style = {{ color: '#fff',fontSize: 18, textDecorationLine: 'underline' }}>Get the password</Text>
            </Button>
            <View style={{ height:height/54}} />
          </View>
          <View style = {{ justifyContent: 'center', alignItems: 'center' }}>
            <Text style = {{ fontSize: 15}}>Please provide email address to get the password</Text>
          </View>
        </View>
      );
    }
}

export default ForgotPassword;