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
import { loginUser, resetErrorLogin }  from '../../redux/actions/login.action';

import isEmpty from '../../validations/is-empty.validate';

class SignIn extends Component {

  
    static navigationOptions = {
        title: 'Sign In'
    };

    constructor(props) {
        super(props);
        this.state = { 
          emailPhone: '0932311434',
          password: '123456789',
					errors: '',
        };
    }

    handleLogin (e) {
			const data = {
				emailPhone: this.state.emailPhone,
				password: this.state.password,
				type: ''
			};
			this.props.loginUser(data);
    }

		onChangeTextEmailPhone(text) {
			// alert(JSON.stringify(this.props.errors));
			if(!isEmpty(this.props.errors.emailPhone)) {
        let errs = this.props.errors;
        delete errs.emailPhone;
				this.props.resetErrorLogin(errs);
			}
			this.setState({ emailPhone: text }); 
		}

		onChangeTextPassword(text) {
			if(!isEmpty(this.props.errors.password)) {
				let errs = this.props.errors;
        delete errs.password;
				this.props.resetErrorLogin(errs);
			}
			this.setState({ password: text }); 
		}

    componentWillReceiveProps(nextProps){

        // Navigate to home page
        if(nextProps.auth.isAuthenticated) {
            alert(JSON.stringify(nextProps.auth.user));
        }
        
        if(!isEmpty(nextProps.errors)) {
            this.setState({ errors: nextProps.errors });
        }
		}
		

    render() {
        const { errors } = this.state;
        
        return (
            <View style = {{ flex: 1, marginHorizontal: 15}} >
                <View style={{ height:20}} />

                {/* Email */}
                <LoginInput 
                    onChangeText = { (text) => this.onChangeTextEmailPhone(text)}  
                    label = {'Email / Phone'} 
                    value = {'0932311434'} // or tienlx97@gmail.com
                    errorMessage = { errors.emailPhone }/>

                {/* Password */}
                <LoginInput 
                    onChangeText = { (text) => this.onChangeTextPassword(text) } 
                    securePassword = {true} 
                    label = {'Password'} 
                    value = {'123456789'}
                    errorMessage = { errors.password } />
                
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
                    <TouchableOpacity style = {{ width: width / 2.35 }}>
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
  errors: state.erorrsLoginReducer,
  auth: state.authLoginReducer
});



export default connect(mapStateToProps, {
	loginUser,
	resetErrorLogin
})(SignIn);