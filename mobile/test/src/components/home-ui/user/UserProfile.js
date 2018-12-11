import React, { Component } from 'react';
import { View, Text,StyleSheet, Dimensions, TouchableOpacity, ScrollView } from 'react-native';
import { Icon } from 'react-native-elements'
import ProfileElement from "./ProfileElement";
import { Toast } from 'native-base';
import UserElement from "./UserElement";
import { deleteUserLogout, queryUserLoginData} from "../../../realm/userQueries";
const { width, height } = Dimensions.get('window');

const w1 = width / 4.5;
const w11 = width / 7;
const w3 = width / 10;
const h1 = height / 7;

class UserProfile extends Component {

  constructor(props) {
    super(props);
    this._navigateProfileChange = this._navigateProfileChange.bind(this);
    this._handleLogOut = this._handleLogOut.bind(this);

    this.state = { 
      user: {
        name: '',
        phone: '',
        memberAt: '',
      } 
    };

  }

  _navigateProfileChange(_user) {
    this.props.navigation.push('ProfileChangeScreen', {
      user: _user,
      refresh: this._refreshScreen
    })
  }

  _refreshScreen  = () =>  {
    queryUserLoginData().then((listUsers) => this.setState({user: listUsers}));
  }

  _handleLogOut() {
    deleteUserLogout().then(() => {
      this.props.navigation.navigate("SignOutScreen");
      Toast.show({ text: 'Log out successfully', buttonText: 'Okay', type: "success" });
    });
  }
  
  componentDidMount() {
    queryUserLoginData().then((listUsers) => this.setState({user: listUsers}));
  }

  render() {
    
    const { user } = this.state;

    return (
      <View style={styles.container}>
        {/* Top bar */}
        <View style = {{ height:45, backgroundColor: "#1aa3ff",justifyContent: "center",alignItems: "center" }}>       
          <Text style = {{ textAlign : "center", color: "white", fontWeight:"500", fontSize: 18}} >Profile Setting</Text>
        </View>
        <ScrollView>
        <View style = {{ height:10 }} />
        {/* change user information */}
        <ProfileElement 
          name = { user.name }
          phone = { String(user.phone) }
          startMemberAt = { new Date(user.memberAt).toLocaleDateString() }
          onPress = { () => this._navigateProfileChange(user) } 
          w1 = {w1} w3 = {w3} h = {h1} />
        <View style = {{ height:10 }} />

        <UserElement  
          iconType = "Ionicons"
          iconName = "md-settings" 
          w1 = {w11} w3 = {w3}
          textValue = "High Protect Account"
          allowBotBorder = {true}
        />
        {/* Link account to social */}
        <UserElement  
          iconType = "Entypo"
          iconName = "globe" 
          w1 = {w11} w3 = {w3}
          textValue = "Connect Social"
          iconColor = "green"
        />

        <View style = {{ height:10 }} />
        {/* View detail money - add money */}
        <UserElement  
          iconType = "FontAwesome5"
          iconName = "paypal" 
          w1 = {w11} w3 = {w3}
          textValue = "Pay Account"
          rightValue = "123,456 vnđ"
          allowBotBorder = {true}
        />
        {/* View gift list */}
        <UserElement  
          iconType = "FontAwesome5"
          iconName = "gift" 
          w1 = {w11} w3 = {w3}
          textValue = "Gifts List"
        />
        <View style = {{ height:10 }} />
        <UserElement  
          iconType = "FontAwesome"
          iconName = "support" 
          w1 = {w11} w3 = {w3}
          textValue = "Support"
          allowBotBorder = {true}
        />
        <UserElement  
          iconType = "MaterialIcons"
          iconName = "feedback" 
          w1 = {w11} w3 = {w3}
          textValue = "Quick Feedback"
          allowBotBorder = {true}
        />
        <UserElement  
          iconType = "Entypo"
          iconName = "info" 
          w1 = {w11} w3 = {w3}
          textValue = "About App"
        />
        <View style = {{ height:10 }} />
        <TouchableOpacity onPress = { this._handleLogOut } style = {{ height:50, backgroundColor: "#1aa3ff", justifyContent: "center", alignItems: "center" }}>       
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