import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Dimensions, ScrollView } from 'react-native';
import {  Button } from 'native-base';
import { SocialIcon } from 'react-native-elements';
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import LoginInput from '../custom-ui/login-input/LoginInput';
import { loginUser }  from '../../no-redux/login';
import isEmpty from '../../validations/is-empty.validate';
import { GLOBAL } from "../../config/language";
import { querySettingLanguage } from "../../realm/userQueries";
class SignIn extends Component {
  
  static navigationOptions =  ({navigation}) => ({
    title: navigation.getParam('SIGNIN','SIGN IN')
  })

  constructor(props) {
    super(props);
    this.state = { 
      emailOrPhone: '',
      password: '',
      errors: '',
      lang: querySettingLanguage()
    };
    this.handleLogin = this.handleLogin.bind(this);
  }

  componentDidMount() {
    let { lang } = this.state;
    this.props.navigation.setParams({ SIGNIN: GLOBAL[lang].SIGNIN });
  }

  handleLogin (e) {
    const data = {
      emailOrPhone: this.state.emailOrPhone,
      password: this.state.password,
      type: 'nothing'
    };
    loginUser(data).then( api  => {
      if(api.type == false) this.setState({errors: api.errors});
      else 
        this.props.navigation.navigate("SignedInScreen");
    });
  }

  onChangeTextEmailOrPhone(text) {
    if(!isEmpty(this.state.errors.emailOrPhone)) {
      let { errors } = this.state;
      delete errors.emailOrPhone;
      this.setState({ emailOrPhone: text, errors }); 
    } else this.setState({ emailOrPhone: text }); 
  }

  onChangeTextPassword(text) {
    if(!isEmpty(this.state.errors.password)) {
      let { errors } = this.state;
      delete errors.password;
      this.setState({ password: text, errors }); 
    } else this.setState({ password: text }); 
  }

  render() {
    const { errors } = this.state;
    const { lang } = this.state;
    return (
      <ScrollView style = {{ flex: 1, marginHorizontal: 15}} >
        <View style={{ height:20}} />

        <LoginInput 
            onChangeText = { (text) => this.onChangeTextEmailOrPhone(text)}  
            label = {GLOBAL[lang].EmailPhone} 
            errorMessage = { errors.emailOrPhone }
            />

        <LoginInput 
            onChangeText = { (text) => this.onChangeTextPassword(text) } 
            securePassword = {true} 
            label = {GLOBAL[lang].Password} 
            errorMessage = { errors.password } 
            />
        
        {/* Sign in button */}
        <View style={{ height:height/40}} />
        <Button onPress = { this.handleLogin } block style = {{ backgroundColor: '#ff1a1a' }}>
            <Text style = {{ color: '#fff',fontSize: 18, textDecorationLine: 'underline' }}>{GLOBAL[lang].SignIn}</Text>
        </Button>
        <View style={{ height:height/32}} />

        {/* Forgot password text */}
        <TouchableOpacity onPress = { () => this.props.navigation.navigate("ForgotPasswordScreen") } style = {{ justifyContent: 'center', alignItems: 'center' }}>
            <Text style = {{ color: '#4d94ff',fontSize: 16, textDecorationLine: 'underline' }}>{GLOBAL[lang].ForgotPassword}</Text>
        </TouchableOpacity>
        <View style={{ height:height/32 }} />
      </ScrollView>            
    );
  }
}

export default SignIn;