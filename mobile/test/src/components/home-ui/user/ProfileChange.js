import React, { Component } from 'react';
import { View ,ScrollView, Text,StyleSheet, Dimensions, TouchableOpacity, TextInput } from 'react-native';
import Ionicons from "react-native-vector-icons/Ionicons";
import { Radio, DatePicker, CheckBox } from "native-base";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import MCIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Input from "./Input";

const { width, height } = Dimensions.get('window');

const w1 = width / 4.5;
const w11 = width / 10;
const w3 = width / 6;
const h1 = height / 7;
const h2 = height/8;
class ProfileChange extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isGenderSelected: false,
      isOpenPass: false,
      chosenDate: new Date(2018,1,1)
    }
    this._onGenderPress = this._onGenderPress.bind(this);
    this._onChangePassPress = this._onChangePassPress.bind(this);
    this._setDate = this._setDate.bind(this);
  }

  _onGenderPress = () => {
    this.setState({isGenderSelected: !this.state.isGenderSelected})
  }

  _setDate(newDate) {
    this.setState({ chosenDate: newDate });
  }

  _onChangePassPress() {
    this.setState({ isOpenPass: !this.state.isOpenPass});
  }

  render() {
    const { isGenderSelected, isOpenPass } = this.state;
    return (
      <View style={styles.container}>
        {/* Top bar */}
        <View style = {styles.wrapper}>
          <TouchableOpacity onPress = { ()=> this.props.navigation.goBack() } style = {{ marginLeft: 10 }} >
            <Ionicons              
              name = "ios-arrow-back" 
              size = {40}
              color = "white"
            />
          </TouchableOpacity>          
          <Text style = { [{flex: 1},styles.textStyle] } >User Information</Text>
          <TouchableOpacity style = {{ justifyContent:"flex-end", marginRight: 10 }}>
            <Text style = {[{ textDecorationLine: "underline"},styles.textStyle]} >Save</Text>
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
            value = "Lê Xuân Tiến"
          />
          <Input  
            iconType = "Entypo"
            iconName = "phone" 
            placeholder = "phone number"
            value = "0932-311-434"
          />
          <Input  
            iconType = "MCIcons"
            iconName = "email-check" 
            placeholder = "email"
            value = "tienlx97@gmail.com"
            rightValue = "send"
          />
          <Input  
            iconType = "Entypo"
            iconName = "address" 
            placeholder = "your address"
          />
          <View>
            <View style = {{ flexDirection: "row" , justifyContent: "flex-start", marginVertical: 5}} >
              <TouchableOpacity  onPress = { this._onGenderPress } style = {{ flexDirection: "row" , marginHorizontal: 10}} >
                <Radio selected={isGenderSelected == true} onPress = { this._onGenderPress } />
                <Text> male</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress = { this._onGenderPress } style = {{ flexDirection: "row" , marginHorizontal: 10 }} >
                <Radio onPress = { this._onGenderPress } selected={isGenderSelected == false} />
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
              placeHolderText="select birthdate"
              onDateChange={this._setDate}  
              animationType={"fade"}
              androidMode={"default"}/>
            </View>
            <View style = {{ width: width/1.2, borderBottomWidth:1, alignSelf: "center" }} />
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
  }
});
export default ProfileChange;