
import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Dimensions } from 'react-native';
import { Content,Container,Form,Input, Item, Label, Button, Icon, Radio } from 'native-base';
import { SocialIcon } from 'react-native-elements';

import LoginInput from '../custom-ui/login-input/LoginInput';

import { connect } from 'react-redux';
import { registerUser, resetErrorRegister }  from '../../redux/actions/register.action';

import isEmpty from '../../validations/is-empty.validate';

import axios from 'axios';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

class SignUp extends Component {

  static navigationOptions = {
      title: 'Sign Up'
  };

  constructor(props) {
    super(props);
    this.state = { 
      name: '',
      username: '',
      phone: '',
      verifyCode: '',
      password: '',
      confirmPassword: '',
      errors: ''
    };
  } 

  componentWillReceiveProps(nextProps){

    if(!isEmpty(nextProps.errors)) {
      this.setState({ errors: nextProps.errors });
    }
  }

  handleRegisterUser(e) {
    let { name, username, phone, verifyCode, password, confirmPassword } = this.state;
    let data = { name, username, phone, verifyCode, password, confirmPassword };
    this.props.registerUser(data);
  }

  handleSendOtp(e) {
    axios.post('http://192.168.1.108:5000/app/user/send-verify', {phone :this.state.phone})
      .then( response => { 
       
      });
  }

  onChangeTextName(text) {
    if(!isEmpty(this.props.errors.name)) {
      let errs = this.props.errors;
      delete errs.name;
      this.props.resetErrorRegister(errs);
    }
    this.setState({ name: text }); 
  }


  onChangeTextUsername(text) {
    if(!isEmpty(this.props.errors.username)) {
      let errs = this.props.errors;
      delete errs.username;
      this.props.resetErrorRegister(errs);
    }
    this.setState({ username: text }); 
  }

  onChangeTextPhone(text) {
    // alert(JSON.stringify(this.props.errors));
    if(!isEmpty(this.props.errors.phone)) {
      let errs = this.props.errors;
      delete errs.phone;
      this.props.resetErrorRegister(errs);
    }
    this.setState({ phone: text }); 
  }

  onChangeTextVerifyCode(text) {
    if(!isEmpty(this.props.errors.verifyCode)) {
      let errs = this.props.errors;
      delete errs.verifyCode;
      this.props.resetErrorRegister(errs);
    }
    this.setState({ verifyCode: text }); 
  }

  onChangeTextPassword(text) {
    if(!isEmpty(this.props.errors.password)) {
      let errs = this.props.errors;
      delete errs.password;
      this.props.resetErrorRegister(errs);
    }
    this.setState({ password: text }); 
  }

  onChangeTextConfirmPassword(text) {
    if(!isEmpty(this.props.errors.confirmPassword)) {
      let errs = this.props.errors;
      delete errs.confirmPassword;
      this.props.resetErrorRegister(errs);
    }
    this.setState({ confirmPassword: text }); 
  }

  render() {
    const {errors} = this.state;
    return (
      <View style = {{ flex: 1, marginHorizontal: 15}} >
        <LoginInput 
          label= {"Name"} 
          onChangeText = { (text) => this.onChangeTextName(text) } 
          errorMessage = { errors.name }
          />
        <LoginInput 
          label= {"Username"} 
          onChangeText = { (text) => this.onChangeTextUsername(text) } 
          errorMessage = { errors.username }
        />
        <View style = {{  flexDirection: 'row' }}>
          <View style = {{ flex: 1 }}>
              <LoginInput   
                label = {'Phone number'} 
                onChangeText = { (text) => this.onChangeTextPhone(text) } 
                errorMessage = { errors.phone }
              />
          </View>               
          <View style = {{ width:3 }} />
          <TouchableOpacity onPress = { this.handleSendOtp.bind(this) } style = {{ borderRadius:5,top:8,width: 50,height: 35,backgroundColor: "#42A5F5DC", justifyContent: 'center', alignItems: 'center' }}>
            <Text style = {{fontSize: 16, color: 'white'}}>Send</Text>
          </TouchableOpacity>
        </View>
        <LoginInput 
          label= {"Verify code"}           
          onChangeText = { (text) => this.onChangeTextVerifyCode(text) } 
          errorMessage = { errors.verifyCode }
        />
        <LoginInput 
          label= {"Password"} 
          securePassword = {true}           
          onChangeText = { (text) => this.onChangeTextPassword(text) } 
          errorMessage = { errors.password }
          />
        <LoginInput 
          label= {"Confirm password"} 
          securePassword = {true}           
          onChangeText = { (text) => this.onChangeTextConfirmPassword(text) } 
          errorMessage = { errors.confirmPassword }
        />
        <View style={{ height:height/80}} />
        {/* Sign up button */}
        <Button onPress = { this.handleRegisterUser.bind(this) } block style = {{ backgroundColor: '#ff1a1a' }}>
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

const mapStateToProps = state => ({
  errors: state.erorrsRegisterReducer,
});
  
export default connect(mapStateToProps, {
  registerUser,
  resetErrorRegister
})(SignUp);