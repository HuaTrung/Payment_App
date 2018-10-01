
import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Dimensions } from 'react-native';
import { Content,Container,Form,Input, Item, Label, Button, Icon, Radio } from 'native-base';
import { SocialIcon } from 'react-native-elements';
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

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
                <View style={{ height:height/180 }} />
                {/* Name */}
                <Item floatingLabel>
                    <Label>Email / Phone</Label>
                    <Input numberOfLines = {2} />
                </Item>
                <View style={{ height:height/180 }} />                
                {/* Email */}
                <Item floatingLabel >
                    <Label>Email</Label>
                    <Input numberOfLines = {2} />
                </Item>
                <View style={{ height:height/180 }} />
                {/* Phone number */}
                <Item floatingLabel>
                    <Label>Phone</Label>
                    <Input numberOfLines = {2}/>
                </Item>
                <View style={{ height:height/180 }} />
                {/* Password */}
                <Item floatingLabel>
                    <Label>Password</Label>
                    <Input numberOfLines = {2} secureTextEntry />
                </Item>
                <View style={{ height:height/180 }} />
                {/* Confirm password */}
                <Item floatingLabel >
                    <Label>Confirm password</Label>
                    <Input numberOfLines = {2} secureTextEntry />
                </Item>
                <View style={{ height:height/50 }} />
                {/* Sign up button */}
                <Button block style = {{ backgroundColor: '#ff1a1a' }}>
                    <Text style = {{ color: '#fff',fontSize: 18, textDecorationLine: 'underline' }}>Register</Text>
                </Button>
                <View style={{ height:10 }} />
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