import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Dimensions } from 'react-native';
import {  Button } from 'native-base';
import { SocialIcon } from 'react-native-elements';
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';

import LoginInput from '../custom-ui/login-input/LoginInput';
import PhoneAuthen from '../custom-ui/login-input/PhoneAuthen';

import { connect } from 'react-redux';
import { loginUser }  from '../../redux/actions/login.action';
class SignIn extends Component {

  
    static navigationOptions = {
        title: 'Sign In'
    };

    constructor(props) {
        super(props);
        this.state = { 
          email_valid: true ,
          emailPhone: '',
          password: ''
        };
        this.test = this.test.bind(this);
        // this.changeEmailPhone = this.changeEmailPhone.bind(this);
        // this.changePassword = this.changePassword.bind(this);
    }

    handleLogin(e) {
      const data = {
        emailPhone: this.state.emailPhone,
        password: this.state.password
      };
      console.log(data);
//      this.props.loginUser(data);
    }

    // changeEmailPhone(e) {
    //   console.log(e);
    //   this.setState({
    //     emailPhone : e
    //  })
    // }

    // changePassword(e) {
    //   this.setState({
    //     password : e.target.value
    //  })
    // }

    test(e){
      
    }

    render() {
        const { email_valid } = this.state;
        return (
            <View style = {{ flex: 1, marginHorizontal: 15}} >
                <View style={{ height:20}} />

                {/* Email */}
                <LoginInput onChange = { (text) => this.setState({emailPhone: text })}  label = {'Email / Phone'} errorMessage = { email_valid ? null : "Email in correct" }/>

                {/* Password */}
                <LoginInput onChange = { (text) => this.setState({password: text }) }  label = {'Password'} />
                


                {/* Sign in button */}
                <View style={{ height:height/40}} />
                <Button onPress = { this.handleLogin.bind(this) } block style = {{ backgroundColor: '#ff1a1a' }}>
                    <Text style = {{ color: '#fff',fontSize: 18, textDecorationLine: 'underline' }}>Sign In</Text>
                </Button>
                <View style={{ height:height/32}} />



                {/* Forgot password text */}
                <TouchableOpacity onPress = { () => this.props.navigation.navigate("ForgotPassStack") } style = {{ justifyContent: 'center', alignItems: 'center' }}>
                    <Text style = {{ color: '#4d94ff',fontSize: 16, textDecorationLine: 'underline' }}>Forgot password ?</Text>
                </TouchableOpacity>
                <View style={{ height:height/32 }} />
                


                {/* Sign in with social button */}
                <View style = {{ justifyContent: 'center', alignItems: 'center' }}>
                    <Text style = {{ fontSize: 16}}>Or sign in with</Text>
                </View>
                <View style={{ height:3}} />



                {/* Login by Facebook and Gmail */}
                <View style={{flexDirection: 'row', justifyContent: 'space-evenly' }} >
                    <TouchableOpacity style = {{ width: width / 2.35 }} >
                        <SocialIcon 
                            button
                            type = 'facebook'
                            style = {{ borderRadius: 5, marginHorizontal: 0 }}
                        /> 
                    </TouchableOpacity>
                    <TouchableOpacity onPress = { this.test } style = {{ width: width / 2.35 }}>
                        <SocialIcon 
                            button
                            type = 'google-plus-official'
                            style = {{ borderRadius: 5, marginHorizontal: 0 }}
                        />   
                    </TouchableOpacity>
                </View>                                    
            </View>            
        );
    }
}

const mapStateToProps = state => ({
  errors: state.erorrsLoginReducer
});

export default connect(mapStateToProps, { loginUser })(SignIn);