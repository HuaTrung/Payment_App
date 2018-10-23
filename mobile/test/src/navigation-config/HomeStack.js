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
import { HomeScreen, UserProfileScreen, TransactionScreen, SearchScreen } from '../components/home-ui';

const { height } = Dimensions.get('window');
Height = (height / 4);


const HomeSearch = createStackNavigator(
  {
    Home: {
      screen: HomeScreen
    },
    Search: SearchScreen
  },
  {
    initialRouteName: "Home",
    navigationOptions: {
      header: null
    }
  }
);

const SignedIn = createBottomTabNavigator(
  {
    Home: {
      screen: HomeSearch,
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
    Transaction: {
      screen: TransactionScreen,
      navigationOptions: {
        title: 'Transaction'
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

const TabLoginNavigator = createMaterialTopTabNavigator(
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
  {
    SignOutScreen: SignOutStack,
    SignedInScreen: SignedIn
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
