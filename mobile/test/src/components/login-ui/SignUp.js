
import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Dimensions,ScrollView } from 'react-native';
import { Content,Container,Form,Input, Item, Label, Button, Icon, Radio, Toast } from 'native-base';
import { SocialIcon } from 'react-native-elements';

import LoginInput from '../custom-ui/login-input/LoginInput';

import { registerUser, resetErrorRegister, checkPhoneError }  from '../../no-redux/register';

import isEmpty from '../../validations/is-empty.validate';

import axios from 'axios';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
import { GLOBAL } from "../../config/language";
import { querySettingLanguage } from "../../realm/userQueries";
class SignUp extends Component {

  static navigationOptions =  ({navigation}) => ({
    title: navigation.getParam('SIGNUP','SIGN UP')
  })


  constructor(props) {
    super(props);
    this.state = { 
      name: '',
      phone: '',
      verifyCode: '',
      password: '',
      confirmPassword: '',
      errors: '',
      lang: querySettingLanguage()
    };
    this.handleSendOtp = this.handleSendOtp.bind(this);
    this.handleRegisterUser = this.handleRegisterUser.bind(this);
  } 

  componentDidMount() {
    let { lang } = this.state;
    this.props.navigation.setParams({ SIGNUP: GLOBAL[lang].SIGNUP });
  }

  handleRegisterUser(e) {
    let { name, phone, verifyCode, password, confirmPassword } = this.state;
    let data = { name, phone, verifyCode, password, confirmPassword };
    registerUser(data).then ( api => {
      if(api.type == false) this.setState({errors: api.errors});
      else {
        Toast.show({ text: 'Register success', buttonText: 'Okay', type: "success" });
        // clear data and navigate login later
      }
    })
  }

  handleSendOtp(e) {
    checkPhoneError(this.state.phone).then( api => {
    //  alert(JSON.stringify(api));
      if(api.type == false) this.setState({errors: api.errors});
    });
  }

  onChangeTextName(text) {
    if(!isEmpty(this.state.errors.name)) {
      let {errors} = this.state;
      delete errors.name;
      this.setState({ name: text, errors }); 
    } else this.setState({ name: text }); 
  }

  onChangeTextPhone(text) {
    if(!isEmpty(this.state.errors.phone)) {
      let {errors} = this.state;
      delete errors.phone;
      this.setState({ phone: text, errors }); 
    } else this.setState({ phone: text }); 
  }

  onChangeTextVerifyCode(text) {
    if(!isEmpty(this.state.errors.verifyCode)) {
      let {errors} = this.state;
      delete errors.verifyCode;
      this.setState({ verifyCode: text, errors }); 
    } else this.setState({ verifyCode: text }); 
  }

  onChangeTextPassword(text) {
    if(!isEmpty(this.state.errors.password)) {
      let {errors} = this.state;
      delete errors.password;
      this.setState({ password: text, errors }); 
    } else this.setState({ password: text }); 
  }

  onChangeTextConfirmPassword(text) {
    if(!isEmpty(this.state.errors.confirmPassword)) {
      let {errors} = this.state;
      delete errors.confirmPassword;
      this.setState({ confirmPassword: text, errors }); 
    } else this.setState({ confirmPassword: text }); 
  }

  render() {
    const {errors,lang} = this.state;
    return (
      <ScrollView>
          <View style = {{ flex: 1, marginHorizontal: 15}} >
              <LoginInput 
                label= {GLOBAL[lang].Name} 
                onChangeText = { (text) => this.onChangeTextName(text) } 
                errorMessage = { errors.name }
                />
              <View style = {{  flexDirection: 'row' }}>
                <View style = {{ flex: 1 }}>
                    <LoginInput   
                      label = {GLOBAL[lang].PhoneNumber} 
                      onChangeText = { (text) => this.onChangeTextPhone(text) } 
                      errorMessage = { errors.phone }
                    />
                </View>               
                <View style = {{ width:3 }} />
                <TouchableOpacity onPress = { this.handleSendOtp } style = {{ borderRadius:5,top:8,width: 50,height: 35,backgroundColor: "#42A5F5DC", justifyContent: 'center', alignItems: 'center' }}>
                  <Text style = {{fontSize: 16, color: 'white'}}>{GLOBAL[lang].Send}</Text>
                </TouchableOpacity>
              </View>
              <LoginInput 
                label= {GLOBAL[lang].VerifyCode}           
                onChangeText = { (text) => this.onChangeTextVerifyCode(text) } 
                errorMessage = { errors.verifyCode }
              />
              <LoginInput 
                label= {GLOBAL[lang].Password} 
                securePassword = {true}           
                onChangeText = { (text) => this.onChangeTextPassword(text) } 
                errorMessage = { errors.password }
                />
              <LoginInput 
                label= {GLOBAL[lang].ConfirmPassword} 
                securePassword = {true}           
                onChangeText = { (text) => this.onChangeTextConfirmPassword(text) } 
                errorMessage = { errors.confirmPassword }
              />
              <View style={{ height:height/80}} />
              {/* Sign up button */}
              <Button onPress = { this.handleRegisterUser } block style = {{ backgroundColor: '#ff1a1a' }}>
                  <Text style = {{  color: 'white', fontSize: 18, textDecorationLine: 'underline' }}>{GLOBAL[lang].Register}</Text>
              </Button>
              <View style={{ height:height/80}} />
              {/* Read license */}
              <View style = {{ justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
                  <Text>{GLOBAL[lang].RegisterEccept}</Text>
                  <TouchableOpacity onPress = { () => this.props.navigation.push('TermsScreen') }>
                      <Text style = {{ color: '#4d94ff',fontSize: 16, textDecorationLine: 'underline' }}>{GLOBAL[lang].TermOfUse}</Text>
                  </TouchableOpacity>
              </View>  
          </View>        
      </ScrollView>
    );
  }
}

export default SignUp;