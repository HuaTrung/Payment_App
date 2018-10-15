import  { 
  createStackNavigator, 
  createMaterialTopTabNavigator, 
  createBottomTabNavigator ,
  createSwitchNavigator,
  } from 'react-navigation';
import React from 'react';

import { Dimensions } from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';

import { TermsScreen, CompanyBanner, SignInScreen, SignUpScreen, ForgotPasswordScreen } from '../components/login-ui'
import { HomeScreen, UserProfileScreen, PromotionScreen, SearchScreen } from '../components/home-ui';

const  {height } = Dimensions.get('window');
Height = (height / 4);

const SignedIn = createBottomTabNavigator (
  {
    Home: {
      screen: HomeScreen,
      navigationOptions: {
        title: 'Home'
      }
    },
    Search: {
      screen: SearchScreen,
      navigationOptions: {
        title: 'Search',
        tabBarIcon : ({tintColor}) => (
          <Icon name="ios-book" height = {40} color="red" />
        )
      }
    },
    Promotion: {
      screen: PromotionScreen,
      navigationOptions: {
        title: 'Promotion'
      }
    },
    UserProfile: {
      screen: UserProfileScreen,
      navigationOptions: {
        title: 'User'
      }
    }
  },
  {
    tabBarOptions: {
      activeTintColor: 'tomato',
      inactiveTintColor: 'gray'
    }
  }
);

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

const SignOutStack = createStackNavigator(
  {
    LoginScreen:TabLoginNavigator,
    TermStack:TermsScreen ,
    ForgotPassStack: ForgotPasswordScreen,
  },
  {    
    initialRouteName:'LoginScreen',
    navigationOptions : {
      headerStyle: { height: Height},
      headerTitle: <CompanyBanner companyBannerHeight = {Height} />
    } 
});

const RootNavigator = createSwitchNavigator(
    {
      SignOutStackNavigator:  SignOutStack,
      SignedInScreen : SignedIn
    }, 
    {
      initialRouteName: 'SignedInScreen'
    }
);


export {
  TabLoginNavigator,
  SignOutStack,
  RootNavigator
};
