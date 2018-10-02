
import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Dimensions } from 'react-native';
import { Content,Container,Form,Input, Item, Label, Button, Icon, Radio } from 'native-base';
import { SocialIcon } from 'react-native-elements';
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import Yugi from '../../custom-ui/Yugi';

class SignUp extends Component {

    static navigationOptions = {
        title: 'Sign Up'
    };

    constructor(props) {
        super(props);
        this.state = {  };
    }
    render() {
      return (
        <View style = {{ flex: 1, marginHorizontal: 15}} >
          <Yugi 
              label = {'Name'}
              iconClass = {FontAwesomeIcon}
              iconName = {'pencil'}
              iconColor = {'#adad85'}       
              height = {40}   
              LABEL_HEIGHT = { 15 }    
              inputStyle = {{ fontSize: 13 }}
              errorMessage={ "Please enter a valid email address"}
          />
          <Yugi 
              label = {'Email'}
              iconClass = {FontAwesomeIcon}
              iconName = {'pencil'}
              iconColor = {'#adad85'}
              height = {40}   
              LABEL_HEIGHT = { 15 }
              inputStyle = {{ fontSize: 13 }}

          />
          <Yugi 
              label = {'Phone'}
              iconClass = {FontAwesomeIcon}
              iconName = {'pencil'}
              iconColor = {'#adad85'}
              height = {40}
              LABEL_HEIGHT = { 15 }
              inputStyle = {{ fontSize: 13 }}

          />
          {/* Password */}
          <Yugi 
              label = {'Password'}
              iconClass = {FontAwesomeIcon}
              iconName = {'pencil'}
              iconColor = {'#adad85'}
              securePassword = {true}
              height = {40}
              LABEL_HEIGHT = { 15 }
              inputStyle = {{ fontSize: 13 }}

          />
          {/* Confirm password */}
          <Yugi 
              label = {'Confirm password'}
              iconClass = {FontAwesomeIcon}
              iconName = {'pencil'}
              iconColor = {'#adad85'}
              securePassword = {true}
              height = {40}
              LABEL_HEIGHT = { 15 }
              inputStyle = {{ fontSize: 13 }}

          />
          {/* Sign up button */}
          <Button block style = {{ backgroundColor: '#ff1a1a' }}>
              <Text style = {{ color: '#fff',fontSize: 18, textDecorationLine: 'underline' }}>Register</Text>
          </Button>
          {/* Read license */}
          <View style = {{ justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
              <Text>Registered you have accepted the </Text>
              <TouchableOpacity>
                  <Text style = {{ color: '#4d94ff',fontSize: 16, textDecorationLine: 'underline' }}>terms of use</Text>
              </TouchableOpacity>
          </View>
            
                                  
        </View>        
      );
    }
}

export default SignUp;