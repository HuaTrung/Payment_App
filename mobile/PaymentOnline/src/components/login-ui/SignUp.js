import React, { Component } from 'react'
import {
  Alert,
  LayoutAnimation,
  TouchableOpacity,
  Dimensions,
  Image,
  UIManager,
  KeyboardAvoidingView,
  StyleSheet,
  ScrollView,
  Text,
  View,ImageBackground
} from 'react-native'
//import { Font } from 'expo'
import { Input, Button } from 'react-native-elements'

import Icon from 'react-native-vector-icons/SimpleLineIcons'

// Enable LayoutAnimation on Android
UIManager.setLayoutAnimationEnabledExperimental &&
  UIManager.setLayoutAnimationEnabledExperimental(true)

const USER_COOL = require('../../assets/images/user-cool.png')
const USER_STUDENT = require('../../assets/images/user-student.png')
const USER_HP = require('../../assets/images/user-hp.png')

const SCREEN_WIDTH = Dimensions.get('window').width
const SCREEN_HEIGHT = Dimensions.get('window').height

const BG_IMAGE = require('../../assets/images/bg_screen1.jpg');
export default class SignUp extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isLoading: false,
      selectedType: null,
      fontLoaded: false,
      username: '',
      email: '',
      password: '',
      confirmationPassword: '',
      emailValid: true,
      passwordValid: true,
      usernameValid: true,
      confirmationPasswordValid: true,
    }

    this.setSelectedType = this.setSelectedType.bind(this);
    this.validateEmail = this.validateEmail.bind(this);
    this.validatePassword = this.validatePassword.bind(this);
    this.validateConfirmationPassword = this.validateConfirmationPassword.bind(this);
    this.signup = this.signup.bind(this);
  }

  componentDidMount() {
    // await Font.loadAsync({
    //   light: require('../../../assets/fonts/Ubuntu-Light.ttf'),
    //   bold: require('../../../assets/fonts/Ubuntu-Bold.ttf'),
    //   lightitalic: require('../../../assets/fonts/Ubuntu-Light-Italic.ttf'),
    // })

    this.setState({ fontLoaded: true });
  }

  signup() {
    LayoutAnimation.easeInEaseOut();
    const usernameValid = this.validateUsername();
    const emailValid = this.validateEmail();
    const passwordValid = this.validatePassword();
    const confirmationPasswordValid = this.validateConfirmationPassword();
    if ( emailValid && passwordValid &&  confirmationPasswordValid && usernameValid ) {
      this.setState({ isLoading: true });
      setTimeout(() => {
        LayoutAnimation.easeInEaseOut();
        this.setState({ isLoading: false });
      }, 1500);
    }
  }

  validateUsername() {
    const { username } = this.state;
    const usernameValid = username.length > 0;
    LayoutAnimation.easeInEaseOut();
    this.setState({ usernameValid });
 //   usernameValid || this.usernameInput.shake();
    return usernameValid;
  }

  validateEmail() {
    const { email } = this.state;
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const emailValid = re.test(email);
    LayoutAnimation.easeInEaseOut();
    this.setState({ emailValid });
  //  emailValid || this.emailInput.shake();
    return emailValid;
  }

  validatePassword() {
    const { password } = this.state;
    const passwordValid = password.length >= 8;
    LayoutAnimation.easeInEaseOut();
    this.setState({ passwordValid });
  //  passwordValid || this.passwordInput.shake();
    return passwordValid;
  }

  validateConfirmationPassword() {
    const { password, confirmationPassword } = this.state;
    const confirmationPasswordValid = password === confirmationPassword;
    LayoutAnimation.easeInEaseOut();
    this.setState({ confirmationPasswordValid });
    // confirmationPasswordValid || this.confirmationPasswordInput.shake();
    return confirmationPasswordValid;
  }

  setSelectedType(selectedType) {
    return LayoutAnimation.easeInEaseOut() || this.setState({ selectedType });
  }

  render() {
    const {
      isLoading,
      selectedType,
      fontLoaded,
      confirmationPassword,
      email,
      emailValid,
      password,
      passwordValid,
      confirmationPasswordValid,
      username,
      usernameValid,
    } = this.state;

    return !fontLoaded
      ? <Text> Loading... </Text>
			: <ScrollView
			scrollEnabled={false}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={styles.container}
        >
          {/* <ImageBackground  
              source={BG_IMAGE}
              style={styles.bgImage}
            > */}
            <KeyboardAvoidingView
            behavior="position"
            contentContainerStyle={styles.formContainer}
          >
            <Text style={styles.signUpText}>Sign up</Text>
            <Text style={styles.whoAreYouText}>WHO YOU ARE ?</Text>
            <View style={styles.userTypesContainer}>
              <UserTypeItem
                label="BUSINESS"
                labelColor="#ECC841"
                image={USER_COOL}
                onPress={() => this.setSelectedType('parent')}
                selected={selectedType === 'parent'}
              />
              <UserTypeItem
                label="STUDENT"
                labelColor="#2CA75E"
                image={USER_STUDENT}
                onPress={() => this.setSelectedType('child')}
                selected={selectedType === 'child'}
              />
              <UserTypeItem
                label="OTHER"
                labelColor="#36717F"
                image={USER_HP}
                onPress={() => this.setSelectedType('teacher')}
                selected={selectedType === 'teacher'}
              />
            </View>
             <View style={{width: '80%', alignItems: 'center'}}>
              <FormInput
                refInput={input => (this.usernameInput = input)}
                icon="user"
                value={username}
                onChangeText={username => this.setState({ username })}
                placeholder="Username"
                returnKeyType="next"
                errorMessage={usernameValid ? null : 'Your username can\'t be blank'}
                onSubmitEditing={() => {
                  this.validateUsername()
                  this.emailInput.focus()
                }}
              />
              <FormInput
                refInput={input => (this.emailInput = input)}
                icon="envelope"
                value={email}
                onChangeText={email => this.setState({ email })}
                placeholder="Email"
                keyboardType="email-address"
                returnKeyType="next"
                errorMessage={emailValid ? null : 'Please enter a valid email address'}
                onSubmitEditing={() => {
                  this.validateEmail()
                  this.passwordInput.focus()
                }}
              />
              <FormInput
                refInput={input => (this.passwordInput = input)}
                icon="lock"
                value={password}
                onChangeText={password => this.setState({ password })}
                placeholder="Password"
                secureTextEntry
                returnKeyType="next"
                errorMessage={passwordValid ? null : 'Please enter at least 8 characters'}
                onSubmitEditing={() => {
                  this.validatePassword()
                  this.confirmationPasswordInput.focus()
                }}
              />
              <FormInput
                refInput={input => (this.confirmationPasswordInput = input)}
                icon="lock"
                value={confirmationPassword}
                onChangeText={confirmationPassword =>
                  this.setState({ confirmationPassword })}
                placeholder="Confirm Password"
                secureTextEntry
                errorMessage={confirmationPasswordValid ? null : 'The password fields are not identics'}
                returnKeyType="go"
                onSubmitEditing={() => {
                  this.validateConfirmationPassword()
                  this.signup()
                }}
              />
            </View>
            <Button
              loading={isLoading}
              title="SIGNUP"
              ViewComponent = { require('react-native-linear-gradient').default }
              containerStyle={{ flex: -1 }}
              buttonStyle={styles.signUpButton}
              linearGradientProps={{
                colors: ['#FF9800', '#F44336'],
                start: { x: 1, y: 0 },
                end: { x: 0.2, y: 0 }
              }}
              titleStyle={styles.signUpButtonText}
               onPress={this.signup}
               disabled={isLoading}
            /> 
          </KeyboardAvoidingView>
            <View style={styles.loginHereContainer}>
            <Text style={styles.alreadyAccountText}>
              Already have an account.
            </Text>
            <Button
              title="Login here"
              titleStyle={styles.loginHereText}
              containerStyle={{ flex: -1 }}
              buttonStyle={{ backgroundColor: 'transparent' }}
              underlayColor="transparent"
              onPress={() => Alert.alert('🔥', 'You can login here')}
            />
          </View>
          {/* </ImageBackground> */}
        </ScrollView>
  }
}

export const UserTypeItem = props => {
  const { image, label, labelColor, selected, ...attributes } = props
  return (
    <TouchableOpacity {...attributes}>
      <View
        style={[
          styles.userTypeItemContainer,
          selected && styles.userTypeItemContainerSelected,
        ]}
      >
        <Text style={[styles.userTypeLabel, { color: labelColor }]}>
          {label}
        </Text>
        <Image
          source={image}
          style={[
            styles.userTypeMugshot,
            selected && styles.userTypeMugshotSelected,
          ]}
        />
      </View>
    </TouchableOpacity>
  )
}

export const FormInput = props => {
  const { icon, refInput, ...otherProps } = props
  return (
    <Input
      {...otherProps}
      ref={refInput}
      inputContainerStyle={styles.inputContainer}
      leftIcon={<Icon name={icon} color="#7384B4" size={18} />}
      inputStyle={styles.inputStyle}
      autoFocus={false}
      autoCapitalize="none"
      keyboardAppearance="dark"
      errorStyle={styles.errorInputStyle}
      autoCorrect={false}
      blurOnSubmit={false}
      placeholderTextColor="white"
    />
  )
}

const styles = StyleSheet.create({
  bgImage: {
    flex: 1,
    top: 0,
    left: 0,
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    justifyContent: 'center',
    alignItems: 'center'
  },
  container: {
    flex: 1,
    backgroundColor: '#293046',
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  formContainer: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  signUpText: {
    color: 'white',
    fontSize: 28,
    fontFamily: 'light',
  },
  whoAreYouText: {
    color: '#7384B4',
    fontFamily: 'bold',
    fontSize: 14,
  },
  userTypesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: SCREEN_WIDTH,
    alignItems: 'center',
  },
  userTypeItemContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    opacity: 0.5,
  },
  userTypeItemContainerSelected: {
    opacity: 1,
  },
  userTypeMugshot: {
    margin: 4,
    height: 70,
    width: 70,
  },
  userTypeMugshotSelected: {
    height: 100,
    width: 100,
  },
  userTypeLabel: {
    color: 'yellow',
    fontFamily: 'bold',
    fontSize: 11,
  },
  inputContainer: {
    paddingLeft: 8,
    borderRadius: 40,
    borderWidth: 1,
    borderColor: 'rgba(110, 120, 170, 1)',
    height: 45,
    marginVertical: 10,
  },
  inputStyle: {
    flex: 1,
    marginLeft: 10,
    color: 'white',
    fontFamily: 'light',
    fontSize: 16,
  },
  errorInputStyle: {
    marginTop: 0,
    textAlign: 'center',
    color: '#F44336',
  },
  signUpButtonText: {
    fontFamily: 'bold',
    fontSize: 13,
  },
  signUpButton: {
    width: 250,
    borderRadius: 50,
    height: 45,
  },
  loginHereContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  alreadyAccountText: {
    fontFamily: 'lightitalic',
    fontSize: 12,
    color: 'white',
  },
  loginHereText: {
    color: '#FF9800',
    fontFamily: 'lightitalic',
    fontSize: 12,
  }
})
