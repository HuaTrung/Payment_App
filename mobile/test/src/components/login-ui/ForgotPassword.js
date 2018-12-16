import React, { Component } from 'react';
import { View, Text, Dimensions } from 'react-native';    
import LoginInput from '../custom-ui/login-input/LoginInput';
import {  Button, Toast } from 'native-base';
import { getForgotPassword }  from '../../no-redux/login';
import isEmpty from "../../validations/is-empty.validate";
const height = Dimensions.get('window').height;
import { GLOBAL } from "../../config/language";
import { connect } from "react-redux";

class ForgotPassword extends Component {

  static navigationOptions = ({ navigation, navigationOptions }) => {
    return{
      headerStyle: {
        backgroundColor:'#42A5F5DC',
        // height: 40
      },
      headerTintColor: 'white',
      headerTitle: navigation.getParam('FORGOTPASS','Forgot password')
    };
  };

  constructor(props) {
    super(props);
    this.state = { 
      emailOrPhone: '',
      errors: '',
    };
    this.handleForgotPassword = this.handleForgotPassword.bind(this);
  }

  
  componentDidMount() {
    let { lang } = this.props.lang;
    this.props.navigation.setParams({ FORGOTPASS: GLOBAL[lang].FORGOTPASS });
  }

  handleForgotPassword(e) {
    let { lang } = this.props.lang;
    getForgotPassword(this.state.emailOrPhone).then ( api => {
      if(api.type == false) this.setState({ errors: api.errors });
      else Toast.show({ text: GLOBAL[lang].SendPassSuccess, buttonText: 'Okay', type: "success" });
    });
  }

  onChangeTextEmailOrPhone(text) {
    // alert(JSON.stringify(this.props.errors));
    if(!isEmpty(this.state.errors.emailOrPhone)) {
      let { errors } = this.state;
      delete errors.emailOrPhone;
      this.setState({ emailOrPhone: text, errors});
    } else  this.setState({ emailOrPhone: text }); 
  }

  render() {
    const { errors } = this.state;
    const { lang } = this.props.lang;
    return (
      <View style = {{ flex: 1}}>
        <View style = {{ marginHorizontal: 15  }}>
          <LoginInput 
            label = {GLOBAL[lang].EmailPhone} 
            onChangeText = { text => this.onChangeTextEmailOrPhone(text) }
            errorMessage = { errors.emailOrPhone }
            />
          <View style={{ height:height/40}} />
          <Button onPress = { this.handleForgotPassword } block style = {{ backgroundColor: '#ff1a1a' }}>
            <Text style = {{ color: '#fff',fontSize: 18, textDecorationLine: 'underline' }}>{GLOBAL[lang].GetThePassword}</Text>
          </Button>
          <View style={{ height:height/54}} />
        </View>
        <View style = {{ justifyContent: 'center', alignItems: 'center' }}>
          <Text style = {{ fontSize: 15}}>{GLOBAL[lang].ProvideEmailAddress}</Text>
        </View>
      </View>
    );
  }
}


const mapStateToProps = state => ({
  lang: state.langReducer
});

export default connect(mapStateToProps)(ForgotPassword);