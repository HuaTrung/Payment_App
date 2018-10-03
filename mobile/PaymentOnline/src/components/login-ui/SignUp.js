
import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Dimensions } from 'react-native';
import { Content,Container,Form,Input, Item, Label, Button, Icon, Radio } from 'native-base';
import { SocialIcon } from 'react-native-elements';
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import LoginInput from '../custom-ui/login-input/LoginInput';

class SignUp extends Component {

    static navigationOptions = {
        title: 'Sign Up'
    };


  
    render() {
      return (
        <View style = {{ flex: 1, marginHorizontal: 15}} >
          {/* <View style={{ height:height/100}} /> */}
          <LoginInput label= {"Name"} />
          {/* <View style={{ height:height/100}} />           */}
          <LoginInput label= {"Email"} />
          {/* <View style={{ height:height/100}} /> */}
          <View style = {{  flexDirection: 'row' }}>
                <View style = {{ flex: 1 }}>
                    <LoginInput   label = {'Phone number'} />
                </View>               
                <View style = {{ width:3 }} />
                <TouchableOpacity style = {{ borderRadius:5,top:8,width: 50,height: 35,backgroundColor: "#42A5F5DC", justifyContent: 'center', alignItems: 'center' }}>
                    <Text style = {{fontSize: 16, color: 'white'}}>Send</Text>
                </TouchableOpacity>
            </View>
          {/* <View style={{ height:height/100}} /> */}
          <LoginInput label= {"Verify phone number"} />
          {/* <View style={{ height:height/100}} /> */}
          <LoginInput label= {"Password"} />
          {/* <View style={{ height:height/100}} /> */}
          <LoginInput label= {"Confirm password"} />
          <View style={{ height:height/80}} />
          {/* Sign up button */}
          <Button block style = {{ backgroundColor: '#ff1a1a' }}>
              <Text style = {{  color: 'white', fontSize: 18, textDecorationLine: 'underline' }}>Register</Text>
          </Button>
          <View style={{ height:height/80}} />
          {/* Read license */}
          <View style = {{ justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
              <Text>Registered you have accepted </Text>
              <TouchableOpacity onPress = { () => this.props.navigation.push('TermStack') }>
                  <Text style = {{ color: '#4d94ff',fontSize: 16, textDecorationLine: 'underline' }}>the terms of use</Text>
              </TouchableOpacity>
          </View>
            
                                  
        </View>        
      );
    }
}

export default SignUp;