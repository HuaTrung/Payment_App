import  { createStackNavigator, createMaterialTopTabNavigator } from 'react-navigation';
import React from 'react';
import { Dimensions } from 'react-native';

import TermsScreen from '../components/login-ui/TermsOfUse';
import CompanyBanner from '../components/login-ui/CompanyBanner';
import SignInScreen from '../components/login-ui/SignIn';
import SignUpScreen from '../components/login-ui/SignUp';
import ForgotPasswordScreen from '../components/login-ui/ForgotPassword';

const  {height } = Dimensions.get('window');
Height = (height / 4);


const TabLoginNavigator = createMaterialTopTabNavigator(
  {
    SignIn : SignInScreen,
    SignUp: SignUpScreen
  },
  {
    initialRouteName: 'SignIn', 
    tabBarOptions: {          
      labelStyle: {
        fontSize:13,
        color: 'black',
        margin: 0,
        fontWeight:  "400"
      },
      style: {
        backgroundColor: '#eaeae1',
        height: 35
      },
      indicatorStyle:{
        backgroundColor: "#ffa31a",
        height: 3
      }
    },     
    
  }
);

const HomeStackNavigator = createStackNavigator(
  {
    LoginScreen:TabLoginNavigator,
    TermStack:TermsScreen ,
    ForgotPassStack: ForgotPasswordScreen
  },
  {    
    initialRouteName:'LoginScreen',
    navigationOptions : {
      headerStyle: { height: Height},
      headerTitle: <CompanyBanner companyBannerHeight = {Height} />
    } 
});

export {
  TabLoginNavigator,
  HomeStackNavigator
};
