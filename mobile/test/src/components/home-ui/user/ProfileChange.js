import React, { Component } from 'react';
import { View ,ScrollView, Text,StyleSheet, Dimensions, TouchableOpacity, TextInput } from 'react-native';
import Ionicons from "react-native-vector-icons/Ionicons";
import { Radio, DatePicker, CheckBox } from "native-base";
import { Alert } from 'react-native';
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import MCIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Input from "./Input";
import { queryUserLoginData } from "../../../realm/userQueries";
import isEmpty from '../../../validations/is-empty.validate';
import isEmail from '../../../validations/email.validate';
import { 
  EMAIL_INVALID, EMAIL_EMPTY, NAME_EMPTY, ADDRESS_EMPTY, BIRTHDAY_LESS_CURRENT_DATE, BIRTHDAY_GREATER_FIFTEEN
} from '../../../validations/errors-name';

import { updateInformationUser } from "../../../no-redux/updateInformationUser"

const { width, height } = Dimensions.get('window');

const w1 = width / 4.5;
const w11 = width / 10;
const w3 = width / 6;
const h1 = height / 7;
const h2 = height/8;
class ProfileChange extends Component {

  constructor(props) {
    super(props);

    const { name, phone, address, gender, email, birthday } = this.props.navigation.getParam('user');

    this.state = {
      name: name,
      phone: phone,
      address: address,
      gender: gender,
      email: email,
      isOpenPass: false,
      birthday: birthday,
      errors: ''
    }
    this._onGenderPress = this._onGenderPress.bind(this);
    this._onChangePassPress = this._onChangePassPress.bind(this);
    this._onChangeDate = this._onChangeDate.bind(this);
  }

  _onGenderPress = () => {
    this.setState({gender: !this.state.gender})
  }

  _goBackScreen() {
    this.props.navigation.state.params.refresh();
    this.props.navigation.goBack();
  }

  _onChangeDate(newDate) {
    
    if(!isEmpty(this.state.errors.birthday)) {
      let { errors } = this.state;
      delete errors.birthday;
      this.setState({ birthday: newDate.toString().substr(4, 12), errors }); 
    } else this.setState({ birthday: newDate.toString().substr(4, 12) }); 

  }

  _onChangePassPress() {
    this.setState({ isOpenPass: !this.state.isOpenPass});
  }

  _checkErrorBeforeSave(data) {
    let errors = {};

    if(isEmpty(data.name)) 
      errors.name = NAME_EMPTY;

    if(isEmpty(data.address)) 
      errors.address = ADDRESS_EMPTY;

    let today = new Date();
    let dateUser = new Date(data.birthday);
    let age = calcAge(data.birthday);

    if(dateUser.getTime() > today.getTime() )
      errors.birthday = BIRTHDAY_LESS_CURRENT_DATE;
    else if (age < 15)
      errors.birthday = BIRTHDAY_GREATER_FIFTEEN;
      
    if(isEmpty(data.email)) 
      errors.email = EMAIL_EMPTY;
    else if(isEmail(data.email) == false )
      errors.email = EMAIL_INVALID;

    return errors;
  }

  onChangeTextName(text) {
    if(!isEmpty(this.state.errors.name)) {
      let { errors } = this.state;
      delete errors.name;
      this.setState({ name: text, errors }); 
    } else this.setState({ name: text }); 
  }

  onChangeTextEmail(text) {
    if(!isEmpty(this.state.errors.email)) {
      let { errors } = this.state;
      delete errors.email;
      this.setState({ email: text, errors }); 
    } else this.setState({ email: text }); 
  }

  onChangeTextAddress(text) {
    if(!isEmpty(this.state.errors.address)) {
      let { errors } = this.state;
      delete errors.address;
      this.setState({ address: text, errors }); 
    } else this.setState({ address: text }); 
  }


  _saveInformationUser() {

    const {name, phone, gender, address, email, birthday} = this.state;
    
    data = {
      "name": name,
      "phone": phone,
      "gender": gender,
      "address": address,
      "email": email,
      "birthday": birthday
    }

    let resultCheckErrorBeforeSave = this._checkErrorBeforeSave(data);
    if(!isEmpty(resultCheckErrorBeforeSave)) {
      this.setState({errors: resultCheckErrorBeforeSave})
      return;
    }

    updateInformationUser(data).then( result  => {

      if(result.type) {
        queryUserLoginData().then((listUsers) => {
 
          const {name, phone, gender, address, email, birthday} = listUsers;
          this.setState({
            name: name,
            phone: phone,
            address: address,
            gender: gender,
            email: email,
            isOpenPass: false,
            birthday: birthday,
          })

          alert("Saved Successfully!");
        });
        
      }
      else {
        Alert.alert("Failed to save data", result.errors.phone);
      } 
    })
    .catch((error) => {
      console.error("Error at UpdateInformationUser: ", error);
    })
  }

  render() {
    const { name, phone, email, gender, address, isOpenPass, birthday, errors } = this.state;
    
    return (
      <View style={styles.container}>
        {/* Top bar */}
        <View style = {styles.wrapper}>
          <TouchableOpacity onPress = { ()=> this._goBackScreen() } style = {{ marginLeft: 10 }} >
            <Ionicons              
              name = "ios-arrow-back" 
              size = {40}
              color = "white"
            />
          </TouchableOpacity>          
          <Text style = { [{flex: 1},styles.textStyle] } >User Information</Text>
          <TouchableOpacity style = {{ justifyContent:"flex-end", marginRight: 10 }}>
            <Text 
              style = {[{ textDecorationLine: "underline"},styles.textStyle]}
              onPress = { () => this._saveInformationUser() } 
              >Save</Text>
          </TouchableOpacity>
        </View>
        {/* main */}

        <ScrollView style = {{ flex:1 }}>
        
          {/* user image */}
          <View style = {{ height: h2 , justifyContent: "center", alignItems:"center"}}>                    
            <FontAwesome5 name = "user-astronaut" color = "#3b5998" size = {h2-h2/3} />
            <Text>Change</Text>
          </View>

          {/* <View style = {{ height:10 }} /> */}

          <Input  
            iconType = "MCIcons"
            iconName = "human-greeting" 
            placeholder = "name"
            onChangeText={ (text) => {this.onChangeTextName(text)} }
            value = { name }
            errorMessage = { errors.name }
            widthMessError = {width/1.2}
            style = {{color:'#ff0000'}}
          />

          <Input  
            iconType = "Entypo"
            iconName = "phone" 
            placeholder = "phone number"
            value = { String(phone) }
            // onChangeText={ (text) => {this.setState({phone: text})} }
          />

          <Input  
            iconType = "MCIcons"
            iconName = "email-check" 
            placeholder = "email"
            value = { email }
            errorMessage = { errors.email }
            widthMessError = {width/1.2}
            onChangeText={ (text) => {this.onChangeTextEmail(text)} }
            rightValue = "send"
          />

          <Input  
            iconType = "Entypo"
            iconName = "address" 
            errorMessage = { errors.address }
            widthMessError = {width/1.2}
            onChangeText={ (text) => {this.onChangeTextAddress(text)} }
            placeholder = "address"
            value = { address }
          />

          <View>
            <View style = {{ flexDirection: "row" , justifyContent: "flex-start", marginVertical: 5}} >
              <TouchableOpacity  onPress = { this._onGenderPress } style = {{ flexDirection: "row" , marginHorizontal: 10}} >
                <Radio selected={gender == true} onPress = { this._onGenderPress } />
                <Text> male</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress = { this._onGenderPress } style = {{ flexDirection: "row" , marginHorizontal: 10 }} >
                <Radio onPress = { this._onGenderPress } selected={gender == false} />
                <Text> female</Text>
              </TouchableOpacity>
            </View>
            <View style = {{ width: width/1.2, borderBottomWidth:1, alignSelf: "center" }} />
          </View>
          
          <View>
            <View style = {{ flexDirection: "row",alignItems: "center"}}>
              <MCIcons 
                name = "cupcake"
                size = {30}
                color = "#3b5998"
              />
              <DatePicker 
              placeHolderTextStyle={{ color: "#C7C7CD" }}
              onDateChange={this._onChangeDate}
              maximumDate = {new Date()}
              animationType={"fade"}
              defaultDate={ new Date(birthday) }
              androidMode={"default"}/>
            </View>
            <View style = {{ width: width/1.2, borderBottomWidth:1, alignSelf: "center" }} />
            {
            errors.birthday && 
              (
                <View >
                  <Text style={[styles.textinvalid, {alignSelf: "center", width: width/1.2}]}>
                    { errors.birthday }
                  </Text>
                </View>
              )
            }
          </View>

          {
            isOpenPass == false ? (
              <View style = {{ flexDirection: "row",justifyContent: "center", marginTop: 5}}>
                <CheckBox color="#3b5998" onPress = { this._onChangePassPress }  checked = { isOpenPass } />
                <Text style = {{ marginHorizontal: 10 }}> change password</Text>
              </View>
            ) : (
              <View>
                <Input  
                  iconType = "FontAwesome"
                  iconName = "unlock-alt" 
                  placeholder = "current password"
                />
                <Input  
                  iconType = "Entypo"
                  iconName = "lock" 
                  placeholder = "new password"
                />
                <Input  
                  iconType = "Entypo"
                  iconName = "lock" 
                  placeholder = "confirm password"
                />
              </View>
            )
          }

        </ScrollView>

      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: "white"
  },
  wrapper: {
    height:50,  
    backgroundColor: "#1aa3ff",  
    justifyContent: "center",  
    alignItems: "center" , 
    flexDirection: "row" 
  },
  textStyle: {
    textAlign : "center", 
    color: "white", 
    fontWeight:"500", 
    fontSize: 18
  },
  textinvalid: {
    color: '#FF2D00',
    fontSize: 12
  }
});

function calcAge(dateString) {
    var birthday = +new Date(dateString);
    return~~ ((Date.now() - birthday) / (31557600000));
}
export default ProfileChange;