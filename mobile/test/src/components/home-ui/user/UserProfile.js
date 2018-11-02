import React, { Component } from 'react';
import { View, Text,StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements'
import ProfileElement from "./ProfileElement";
import UserElement from "./UserElement";
const { width, height } = Dimensions.get('window');

const w1 = width / 4.5;
const w3 = width / 10;

const h1 = height / 7;

class UserProfile extends Component {

  render() {
    return (
      <View style={styles.container}>
        {/* Top bar */}
        <View style = {{ height:45, backgroundColor: "#1aa3ff",justifyContent: "center",alignItems: "center" }}>       
          <Text style = {{ textAlign : "center", color: "white", fontWeight:"500", fontSize: 18}} >User Profile Setting</Text>
        </View>
         
        <View style = {{ height:10 }} />
        {/* change user information */}
        <ProfileElement w1 = {width / 4.5} w3 = {width / 10} h = {height / 7} />
        <View style = {{ height:10 }} />

        {/* Link account to social */}
        <UserElement  
          iconType = "MCIcons"
          iconName = "qrcode-scan" 
          w1 = {width / 7} w3 = {width / 10}
          textValue = "Connect social"
        />

        <View style = {{ height:10 }} />
        {/* View detail money - add money */}
        <UserElement  
          iconType = "MCIcons"
          iconName = "qrcode-scan" 
          w1 = {width / 7} w3 = {width / 10}
          textValue = "Pay Account"
          rightValue = "123,456 vnđ"
          allowBotBorder = {true}
        />
        <UserElement  
          iconType = "MCIcons"
          iconName = "qrcode-scan" 
          w1 = {width / 7} w3 = {width / 10}
          textValue = "Support"
        />
        <View style = {{ height:10 }} />
        <TouchableOpacity style = {{ height:50, backgroundColor: "#1aa3ff", justifyContent: "center", alignItems: "center" }}>       
          <Text style = {{ color: "white", fontWeight:"500", fontSize: 20 }} >Sign out</Text>
        </TouchableOpacity>

      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
   // backgroundColor: '#64b5f6',
    flex:1,
  }
});
export default UserProfile;