import {
  createStackNavigator,
  createMaterialTopTabNavigator,
  createBottomTabNavigator,
  createTabNavigator,
  createSwitchNavigator,
} from 'react-navigation';
import React from 'react';

import { Dimensions } from 'react-native';

import { Icon } from 'react-native-elements'

import { TermsScreen, CompanyBanner, SignInScreen, SignUpScreen, ForgotPasswordScreen } from '../components/login-ui'
import { HomeScreen, UserProfileScreen, PromotionScreen, SearchScreen } from '../components/home-ui';

const { height } = Dimensions.get('window');
Height = (height / 4);

const SignedIn = createBottomTabNavigator(
  {
    Home: {
      screen: HomeScreen,
      navigationOptions: {
        title: 'Home',
        tabBarIcon: ({ tintColor }) => (
          <Icon
            name='sc-telegram'
            type='evilicon'
            color='#517fa4'
          />
        )
      }
    },
    Search: {
      screen: SearchScreen,
      navigationOptions: {
        title: 'Search',
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
      showIcon: true,
      activeTintColor: "#6200EE",
      inactiveTintColor: "#858585",
      style: {
        height: 60,
        paddingVertical: 5,
        backgroundColor: "#fff"
      },
      labelStyle: {
        fontSize: 12,
        lineHeight: 20,
        fontFamily: "CircularStd-Book"
      }
    },
  }
);

const TabLoginNavigator = createBottomTabNavigator(
  {
    SignIn: SignInScreen,
    SignUp: SignUpScreen
  },
  {
    initialRouteName: 'SignIn',
    tabBarOptions: {
      labelStyle: {
        fontSize: 13,
        color: 'black',
        margin: 0,
        fontWeight: "400"
      },
      style: {
        backgroundColor: '#eaeae1',
        height: 35
      },
      indicatorStyle: {
        backgroundColor: "#ffa31a",
        height: 3
      }
    },

  }
);

const SignOutStack = createStackNavigator(
  {
    LoginScreen: TabLoginNavigator,
    TermStack: TermsScreen,
    ForgotPassStack: ForgotPasswordScreen,
  },
  {
    initialRouteName: 'LoginScreen',
    navigationOptions: {
      headerStyle: { height: Height },
      headerTitle: <CompanyBanner companyBannerHeight={Height} />
    }
  });

const RootNavigator = createSwitchNavigator(
<<<<<<< HEAD
  {
    SignOutStackNavigator: SignOutStack,
    SignedInScreen: SignedIn
  },
  {
    initialRouteName: 'SignedInScreen'
  }
=======
    {
      SignOutStackNavigator:  SignOutStack,
      SignedInScreen : SignedIn
    }, 
    {
      initialRouteName: 'SignOutStackNavigator'
    }
>>>>>>> ec7d5e4e829384327a88b3cccce1b76170d6b2b9
);


export {
  TabLoginNavigator,
  SignOutStack,
  RootNavigator
};
