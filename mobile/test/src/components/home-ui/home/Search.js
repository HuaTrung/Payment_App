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
          height:searchHeight + 10, 
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
              size = {38}
              color = "white"
            />
          </TouchableOpacity>
          <View style = {{ 
            marginTop:8,
            marginBottom:8,
            // marginVertical: 8, 
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
            <TextInput style = {{ flex: 1, paddingHorizontal: 3, backgroundColor: "red"}}
                placeholder = "search"
                placeholderTextColor = "#c2c2a3"
                selectionColor = "#4d94ff"
                // onFocus = { () => this.props.navigation.push("SearchScreen")}
                underlineColorAndroid = 'rgba(0,0,0,0)'
                multiline = {false}
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