import {
  createStackNavigator,
  createMaterialTopTabNavigator,
  createBottomTabNavigator,
  createSwitchNavigator,
} from 'react-navigation';
import React from 'react';

import { Dimensions } from 'react-native';

import { Icon } from 'react-native-elements'

import { TermsScreen, CompanyBanner, SignInScreen, SignUpScreen, ForgotPasswordScreen } from '../components/login-ui'
import { HomeScreen, UserProfileScreen, TransactionScreen, SearchScreen,RechargeScreen } from '../components/home-ui';
import ProfileChangeScreen from "../components/home-ui/user/ProfileChange";
import HomeSearchBar from "../components/home-ui/home/HomeSearchBar";

import PayScan from "../components/QR-pay-ui/PayScan";
import BarCodeScreen from "../components/QR-pay-ui/BarCode-pay";
import QRCodeScreen from "../components/QR-pay-ui/QRCode-pay";

import MCIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
const { height } = Dimensions.get('window');
Height = (height / 4);

const SignedInTabNavigator = createBottomTabNavigator(
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
    Transaction: {
      screen: TransactionScreen,
      navigationOptions: {
        title: 'Transaction'
      }
    },
    UserProfile: {
      screen: UserProfileScreen,
      navigationOptions: {
        title: 'User',
        tabBarIcon: ({ tintColor }) => (
          <FontAwesome5
            name='user-shield'
            color='#517fa4'
            size= {24}
          />
        )
      }
    }
  },
  {
    initialRouteName: "Home",
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

const PayScanStack = createBottomTabNavigator (
{ 
  QRCodeScreen : {
    screen: QRCodeScreen,
    navigationOptions: {
      title: 'QR Scan',
      tabBarIcon: ({ tintColor }) => (
        <MCIcons 
          name = "qrcode-scan"      
          size={20}      
          color = "#517fa4"
        />
      )
    }
  },
  BarCodeScreen : {
    screen: BarCodeScreen,
    navigationOptions: {
      title: 'Bar Scan',
      tabBarIcon: ({ tintColor }) => (
        <Ionicons
          name="md-barcode"
          color='#517fa4'
          size={20}
        />
      )
    }
  }
}

);

const SignInStack = createStackNavigator(
  {
    SignedInScreen: SignedInTabNavigator,
    PayScanScreen:PayScan,
    SearchScreen,
    ProfileChangeScreen,
    RechargeScreen
  },
  {
    initialRouteName: "SignedInScreen",
    navigationOptions: {
      header: null
    }
  }
);

 /**
   * @param SignInScreen : user start login
   * @param SignUpScreen : user start register
   */
const LoginTabNavigator = createMaterialTopTabNavigator(
  {
    SignInScreen,
    SignUpScreen
  },
  {
    initialRouteName: 'SignInScreen',
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

 /**
   * @param LoginScreen : user start login/register
   * @param TermStack : user read license
   * @param ForgotPassStack : user get new password
   */
const SignOutStack = createStackNavigator(
  {
    LoginScreen: LoginTabNavigator,
    TermsScreen,
    ForgotPasswordScreen
  },
  {
    initialRouteName: 'LoginScreen',
    navigationOptions: {
      headerStyle: { height: Height },
      headerTitle: <CompanyBanner companyBannerHeight={Height} />
    }
  });

  import Realm,{ checkUserExist } from "../realm/schema";
  /**
   * @param SignOutScreen : Sign out to login/ register
   * @param SignedInScreen : user signed in 
   * using switch navigator because we just only ever show one screen at a time
   *  it does not handle back actions and it resets routes to their default state when you switch away
   */
const RootNavigator = createSwitchNavigator(
  {
    SignOutScreen: SignOutStack,
    SignedInScreen: SignInStack
  },
  { 
    initialRouteName: JSON.stringify(Realm.objects("user")) ? 'SignedInScreen' : 'SignOutScreen'
  }
);





export {
  LoginTabNavigator,
  SignOutStack,
  RootNavigator,
  PayScanStack
};

