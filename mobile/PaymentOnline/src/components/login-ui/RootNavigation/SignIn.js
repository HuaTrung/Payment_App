import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Dimensions } from 'react-native';
import { Content,Container,Form,Input, Item, Label, Button, Icon } from 'native-base';
import { SocialIcon } from 'react-native-elements';
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

import Yugi from '../../custom-ui/Yugi';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';

class SignIn extends Component {

    test(e) {
        this.setState({
            email_valid: false
        });
    }
    
    static navigationOptions = {
        title: 'Sign In'
    };

    constructor(props) {
        super(props);
     //   alert(height);
         this.test = this.test.bind(this);
        this.state = { email_valid: true };
    }
    render() {
        const { email_valid } = this.state;
        return (
            <View style = {{ flex: 1, marginHorizontal: 15}} >
                <Yugi 
                    label = {'Email / Phone'}
                    iconClass = {FontAwesomeIcon}
                    iconName = {'pencil'}
                    iconColor = {'#adad85'}
                    errorMessage={email_valid ? null : "Please enter a valid email address"}
                />
                <View style={{ height:height/160 }} />
                {/* Password */}
                <Yugi 
                    label = {'Password'}
                    iconClass = {FontAwesomeIcon}
                    iconName = {'pencil'}
                    iconColor = {'#adad85'}   
                    securePassword = { true }     
                />
                <View style={{ height:height/48 }} />
                {/* Sign in button */}
                <Button block style = {{ backgroundColor: '#ff1a1a' }}>
                    <Text style = {{ color: '#fff',fontSize: 18, textDecorationLine: 'underline' }}>Sign In</Text>
                </Button>
                <View style={{ height:height/80}} />
                {/* Forgot password text */}
                <TouchableOpacity style = {{ justifyContent: 'center', alignItems: 'center' }}>
                    <Text style = {{ color: '#4d94ff',fontSize: 16, textDecorationLine: 'underline' }}>Forgot password ?</Text>
                </TouchableOpacity>
                <View style={{ height:height/80 }} />
                {/* Sign in with social button */}
                <View style = {{ justifyContent: 'center', alignItems: 'center' }}>
                    <Text style = {{ fontSize: 16}}>Or sign in with</Text>
                </View>
                <View style={{ height:3}} />
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

export default SignIn;