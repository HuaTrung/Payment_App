import React, { Component } from 'react';
import { View, Text, Dimensions } from 'react-native';    
import LoginInput from '../custom-ui/login-input/LoginInput';
import {  Button } from 'native-base';
import { getForgotPassword, resetErrorGetPassword }  from '../../redux/actions/login.action';
import {connect} from "react-redux";
import isEmpty from "../../validations/is-empty.validate";
const height = Dimensions.get('window').height;


class ForgotPassword extends Component {

    static navigationOptions = ({ navigation, navigationOptions }) => {
        return{
          headerStyle: {
            backgroundColor:'#42A5F5DC',
            // height: 40
          },
          headerTintColor: 'white',
          headerTitle: 'Forgot password'
        };
    };

    constructor(props) {
      super(props);
      this.state = { 
        emailOrPhone: '',
        errors: '',
      };
    }

    handleForgotPassword(e) {
      this.props.getForgotPassword(this.state.emailOrPhone);
    }

    onChangeTextEmailOrPhone(text) {
      // alert(JSON.stringify(this.props.errors));
      if(!isEmpty(this.props.errors.emailOrPhone)) {
        let errs = this.props.errors;
        delete errs.emailOrPhone;
        this.props.resetErrorGetPassword(errs);
      }
      this.setState({ emailOrPhone: text }); 
    }

    componentWillReceiveProps(nextProps){            
      if(nextProps.isSendForgotPassword) {
        // navigate to another page:
        
      }
      if(!isEmpty(nextProps.errors)) this.setState({ errors: nextProps.errors });      
    }
    
    render() {
      const { errors } = this.state;
      return (
        <View style = {{ flex: 1}}>
          <View style = {{ marginHorizontal: 15  }}>
            <LoginInput 
              label = {'Email / Phone'} 
              onChangeText = { text => this.onChangeTextEmailOrPhone(text) }
              errorMessage = { errors.emailOrPhone }
              />
            <View style={{ height:height/40}} />
            <Button onPress = { this.handleForgotPassword.bind(this) } block style = {{ backgroundColor: '#ff1a1a' }}>
              <Text style = {{ color: '#fff',fontSize: 18, textDecorationLine: 'underline' }}>Get the password</Text>
            </Button>
            <View style={{ height:height/54}} />
          </View>
          <View style = {{ justifyContent: 'center', alignItems: 'center' }}>
            <Text style = {{ fontSize: 15}}>Please provide email address to get the password</Text>
          </View>
        </View>
      );
    }
}

const mapStateToProps = state => ({
  errors: state.forgotPasswordReducer
});

export default connect(mapStateToProps, {
  getForgotPassword,
  resetErrorGetPassword
})(ForgotPassword);