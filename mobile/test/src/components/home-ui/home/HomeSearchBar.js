import React, { Component } from 'react';
import { 
  View, 
  TextInput, 
  TouchableOpacity,
  ScrollView,
  Dimensions
} from 'react-native';
import EvilIcons from "react-native-vector-icons/EvilIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import { withNavigation } from "react-navigation";
const { width, height } = Dimensions.get('window');
const searchHeight = height / 13;

class HomeSearchBar extends Component {
  render() {
    return (
      <View style = {{ 
        height:  searchHeight,
        backgroundColor: "#1aa3ff", 
        justifyContent: "center", 
        alignItems: "center" ,
        flexDirection: "row",  
        paddingHorizontal:10
      }}>
        <View style = {{ 
          flex: 1 ,
          flexDirection:"row",
          justifyContent: "center",
          alignItems: "center" ,
        }}> 
          <View style = {{ 
            flex:1,
            borderRadius: 5, 
            backgroundColor: 'white'  ,
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center" ,
            marginVertical: 5,
          }}>
            <EvilIcons 
              name = "search"
              size = {32}
              color = "#c2c2a3"
            />
            <TextInput style = {{ flex: 1, paddingHorizontal: 3}}
              placeholder = "search"
              placeholderTextColor = "#c2c2a3"
              selectionColor = "#4d94ff"
              onFocus = { () => this.props.navigation.navigate("SearchScreen")}
              underlineColorAndroid = 'rgba(0,0,0,0)'
              multiline = {false}
            />
          </View>
          <TouchableOpacity style = {{ marginLeft: 4, justifyContent: "center", alignItems:"center" }}>
            <Ionicons       
              style = {{alignSelf:'center'}}       
              name = "ios-notifications" 
              size = {32}
              color = "white"
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default withNavigation(HomeSearchBar);