import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Dimensions } from 'react-native';
import { Content,Container,Form,Input, Item, Label, Button, Icon } from 'native-base';
import { SocialIcon } from 'react-native-elements';
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
class SignIn extends Component {

    static navigationOptions = {
        title: 'Sign In'
    };

    constructor(props) {
        super(props);
     //   alert(height);
        this.state = {  };
    }
    render() {
        return (
            <View style = {{ flex: 1, marginHorizontal: 15}} >
                <View style={{ height:height/160 }} />
                {/* Email */}
                <Item 
                  floatingLabel 
                >
                    <Label>Email / Phone</Label>
                    <Input numberOfLines = {2} />
                </Item>
                <View style={{ height:height/160 }} />
                {/* Password */}
                <Item 
                  floatingLabel
                >
                    <Label>Password</Label>
                    <Input numberOfLines = {2} secureTextEntry />
                </Item>
                <View style={{ height:height/32 }} />
                {/* Sign in button */}
                <Button block style = {{ backgroundColor: '#ff1a1a' }}>
                    <Text style = {{ color: '#fff',fontSize: 18, textDecorationLine: 'underline' }}>Sign In</Text>
                </Button>
                <View style={{ height:20 }} />
                {/* Forgot password text */}
                <TouchableOpacity style = {{ justifyContent: 'center', alignItems: 'center' }}>
                    <Text style = {{ color: '#4d94ff',fontSize: 16, textDecorationLine: 'underline' }}>Forgot password ?</Text>
                </TouchableOpacity>
                <View style={{ height:height/32 }} />
                {/* Sign in with social button */}
                <View style = {{ justifyContent: 'center', alignItems: 'center' }}>
                    <Text style = {{ fontSize: 16}}>Or sign in with</Text>
                </View>
                <View style={{ height:height/128 }} />
                <TouchableOpacity>
                    <SocialIcon 
                        button
                        type = 'facebook'
                        style = {{ borderRadius: 5, marginHorizontal: 0 }}
                    /> 
                </TouchableOpacity>
                <TouchableOpacity>
                    <SocialIcon 
                        button
                        type = 'google-plus-official'
                        style = {{ borderRadius: 5, marginHorizontal: 0 }}
                    />   
                </TouchableOpacity>
                                     
            </View>            
        );
    }
}

export default SignIn;