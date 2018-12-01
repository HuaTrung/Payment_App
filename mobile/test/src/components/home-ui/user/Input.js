import React, { Component } from 'react';
import { View, Text,StyleSheet, Dimensions, TouchableOpacity, TextInput } from 'react-native';
import { Icon } from 'react-native-elements'
import PropTypes from 'prop-types';
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Entypo from "react-native-vector-icons/Entypo";
import MCIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
const { width, height } = Dimensions.get('window');

const w1 = width / 4.5;
const w11 = width / 10;
const w3 = width / 6;
const h1 = height / 7;

class Input extends Component {

  constructor(props) {
    super(props);
  }

  renderIcon () {
    let {iconType, iconName, iconSize, iconColor} = this.props;
    switch (iconType) {
      case "MCIcons":
        return <MCIcons name = { iconName } size = { iconSize } color = { iconColor }/>
      case "FontAwesome5":
        return <FontAwesome5 name = { iconName } size = { iconSize } color = { iconColor }/>
      case "Ionicons":
        return <Ionicons name = { iconName } size = { iconSize } color = { iconColor }/>
      case "Entypo":
        return <Entypo name = { iconName } size = { iconSize } color = { iconColor }/>
      case "FontAwesome":
        return <FontAwesome name = { iconName } size = { iconSize } color = { iconColor }/>
      case "MaterialIcons":
        return <MaterialIcons name = { iconName } size = { iconSize } color = { iconColor }/>
    }
  }

  isEditAble() {
    if (this.props.iconName == "phone") {
      return false;
    }
    return true;
  }

  render() {
    const { w1, w2, w3, h, botBorderWidth, placeholder, rightValue, value, onChangeText, errorMessage, widthMessError } = this.props;
    return (
    <View style = {{ height: h, backgroundColor: "white"}}>    
      <View style = {{ flexDirection: "row", flex:1 }}>       
        <View style = {{ width: w1 , justifyContent: "center", alignItems:"center"}}>                    
          { this.renderIcon() } 
        </View>
        <TextInput 
          style = {[
            { flex: 1,  padding: 0, justifyContent: "center", marginHorizontal:5 }
          ]}
          onChangeText={onChangeText} 
          placeholder = {placeholder} 
          editable = { this.isEditAble() }
          underlineColorAndroid="rgba(0,0,0,0)"
          >{value}</TextInput>
        <View style = {{ width: w3 ,justifyContent: "center", alignItems:"center" }}>
          { rightValue && 
            (
            <TouchableOpacity>
              <Text style = {{color: "#4d94ff", alignSelf:"center", textDecorationLine:"underline" }} >{rightValue}</Text> 
            </TouchableOpacity>
            )
          }
        </View>
        
      </View>

      <View style = {[
                      { width: botBorderWidth, borderBottomWidth:1, alignSelf: "center" }
                    ]} />
      {
      errorMessage && 
        (
          <View >
            <Text style={[stylesInput.textinvalid, {alignSelf: "center", width: widthMessError}]}>
              { errorMessage }
            </Text>
          </View>
        )
      }
      
    </View>
    );
  }
}



const stylesInput = StyleSheet.create({
  textinvalid: {
    color: '#FF2D00',
    fontSize: 12
  },
  textvalid: {
    // color: 'red',
    // borderColor: 'red'
  },
});

Input.propTypes = {

  w1: PropTypes.number,
  w3: PropTypes.number,
  h: PropTypes.number,
  value: PropTypes.string,
  placeholder: PropTypes.string.isRequired,
  rightValue: PropTypes.string,
  iconType: PropTypes.string.isRequired,
  iconName: PropTypes.string.isRequired,
  iconSize: PropTypes.number.isRequired,
  iconColor: PropTypes.string.isRequired,
  onChangeText: PropTypes.func,
  errorMessage: PropTypes.string,
  widthMessError: PropTypes.number,
  botBorderWidth: PropTypes.number
};

Input.defaultProps = {
  h: 45,
  w1: width / 10,
  w3: width / 6,
  iconSize: 30,
  iconColor: "#3b5998",
  botBorderWidth: width/1.2
};


export default Input;