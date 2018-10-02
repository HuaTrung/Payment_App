import  { createStackNavigator, createMaterialTopTabNavigator } from 'react-navigation';
import React from 'react';
import TermsScreen from '../components/login-ui/TermsOfUse/Terms';
import { Dimensions } from 'react-native';
import CompanyBanner from '../components/login-ui/Banner/CompanyBanner';
import SignInScreen from '../components/login-ui/RootNavigation/SignIn';
import SignUpScreen from '../components/login-ui/RootNavigation/SignUp';

const  {height } = Dimensions.get('window');
Height = (height / 5);


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
      },
      style: {
        backgroundColor: '#eaeae1'
      }
    },     
    
  }
);

const HomeStackNavigator = createStackNavigator(
  {
    LoginScreen:TabLoginNavigator,
    TermStack:TermsScreen 
  },
  {    
    initialRouteName:'LoginScreen',
    navigationOptions : {
      headerStyle: { height: Height },
      headerTitle: <CompanyBanner companyBannerHeight = {Height} /> 
    } 
});

export {
  TabLoginNavigator,
  HomeStackNavigator
};
