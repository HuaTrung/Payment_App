import React, { Component } from 'react';
import { View, Text,StyleSheet, Dimensions, StatusBar, TextInput, TouchableOpacity } from 'react-native';
import EvilIcons from "react-native-vector-icons/EvilIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
const { width, height } = Dimensions.get('window');

const searchHeight = height / 13;

class Search extends Component {

  
  render() {
    return (
      <View>
        <View style = {{ 
          height:searchHeight, 
          backgroundColor: "#1aa3ff", 
          justifyContent: "center", 
          alignItems: "center" ,
          flexDirection: "row" 
        }}>
          <TouchableOpacity 
            style = {{ marginLeft: 7 }}
            onPress = { ()=> this.props.navigation.goBack() }
            >
            <Ionicons              
              name = "ios-arrow-back" 
              size = {35}
              color = "white"
            />
          </TouchableOpacity>
          <View style = {{ 
            marginVertical: 8, 
            marginHorizontal: 15,
            borderRadius: 5, 
            backgroundColor: 'white', 
            flex: 1 ,
            justifyContent: "center",
            alignItems: "center" ,
            marginHorizontal: 10,
            flexDirection: "row"
          }}>
            <EvilIcons 
              // style = {{ backgroundColor: "red" }}
              name = "search"
              size = {32}
              color = "#c2c2a3"
            />
            <TextInput style = {{ flex: 1, paddingHorizontal: 3}}
              placeholder = "search"
              placeholderTextColor = "#c2c2a3"
              selectionColor = "#4d94ff"
              autoFocus = {true}
            />
          </View>
        </View>  
        <View style = {{ 
          flex: 1,
           }}>
          <Text>Search</Text>
        </View>
      </View>

    );
  }
}

export default Search;