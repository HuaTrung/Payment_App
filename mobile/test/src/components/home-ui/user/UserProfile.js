import React, { Component } from 'react';
import { View, Text,StyleSheet, Dimensions, TouchableOpacity, ScrollView } from 'react-native';
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
          <Text style = {{ textAlign : "center", color: "white", fontWeight:"500", fontSize: 18}} >Profile Setting</Text>
        </View>
        <ScrollView>
        <View style = {{ height:10 }} />
        {/* change user information */}
        <ProfileElement w1 = {width / 4.5} w3 = {width / 10} h = {height / 7} />
        <View style = {{ height:10 }} />

        <UserElement  
          iconType = "Ionicons"
          iconName = "md-settings" 
          w1 = {width / 7} w3 = {width / 10}
          textValue = "Protect Account"
          allowBotBorder = {true}
        />
        {/* Link account to social */}
        <UserElement  
          iconType = "Entypo"
          iconName = "globe" 
          w1 = {width / 7} w3 = {width / 10}
          textValue = "Connect Social"
          iconColor = "green"
        />

        <View style = {{ height:10 }} />
        {/* View detail money - add money */}
        <UserElement  
          iconType = "FontAwesome5"
          iconName = "paypal" 
          w1 = {width / 7} w3 = {width / 10}
          textValue = "Pay Account"
          rightValue = "123,456 vnđ"
          allowBotBorder = {true}
        />
        {/* View gift list */}
        <UserElement  
          iconType = "FontAwesome5"
          iconName = "gift" 
          w1 = {width / 7} w3 = {width / 10}
          textValue = "Gifts List"
        />
        <View style = {{ height:10 }} />
        <UserElement  
          iconType = "FontAwesome"
          iconName = "support" 
          w1 = {width / 7} w3 = {width / 10}
          textValue = "Support"
          allowBotBorder = {true}
        />
        <UserElement  
          iconType = "MaterialIcons"
          iconName = "feedback" 
          w1 = {width / 7} w3 = {width / 10}
          textValue = "Quick Feedback"
          allowBotBorder = {true}
        />
        <UserElement  
          iconType = "Entypo"
          iconName = "info" 
          w1 = {width / 7} w3 = {width / 10}
          textValue = "About App"
        />
        <View style = {{ height:10 }} />
        <TouchableOpacity style = {{ height:50, backgroundColor: "#1aa3ff", justifyContent: "center", alignItems: "center" }}>       
          <Text style = {{ color: "white", fontWeight:"500", fontSize: 20 }} >Sign out</Text>
        </TouchableOpacity>
        <View style = {{ height:10 }} />
        </ScrollView>
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