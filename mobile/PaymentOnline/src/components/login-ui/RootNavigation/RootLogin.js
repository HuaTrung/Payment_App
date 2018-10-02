import React, { Component } from 'react';
import { createBottomTabNavigator, createMaterialTopTabNavigator, StackNavigator } from 'react-navigation';

import SignInScreen from './SignIn';
import SignUpScreen from './SignUp';


export default createMaterialTopTabNavigator({
        SignIn : SignInScreen,
        SignUp: SignUpScreen
    },
    {
        initialRouteName: 'SignIn', 
        tabBarOptions: {            
            activeTintColor: 'green',
            labelStyle: {
                fontSize:13,
                color: 'black'
            },
            style: {
                backgroundColor: '#eaeae1'
            }
        }
    }
)