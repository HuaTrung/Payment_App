import React, { Component } from 'react';
import { View, Text,StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements'
import PropTypes from 'prop-types';
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import Entypo from "react-native-vector-icons/Entypo";
import MCIcons from "react-native-vector-icons/MaterialCommunityIcons";
const { width, height } = Dimensions.get('window');

class UserElement extends Component {

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
    }
  }

  render() {
    const { w1, w2, w3, h, textValue, allowBotBorder, botBorderWidth, rightValue } = this.props;
    return (
    <TouchableOpacity style = {{ height: h, backgroundColor: "white"}}>    
      <View style = {{ flexDirection: "row", flex:1 }}>
        <View style = {{ width: w1 , justifyContent: "center", alignItems:"center"}}>                    
          { this.renderIcon() } 
        </View>
        <View style = {{ flex:1 , justifyContent: "center", marginHorizontal:5 }}>
          <View style = {{ flexDirection:"row" }}>
            <Text style = {{ flex: 1 }} >{textValue}</Text>
            { rightValue && <Text style = {{ alignSelf:"flex-end" }} >{rightValue}</Text> }      
          </View>
        </View>
        <View style = {{ width: w3  ,justifyContent: "center", alignItems:"center" }}>
          <Entypo name = "chevron-thin-right" color = "#3b5998" size = {h-h/2-h/8} />
        </View>
      </View>
      {
        allowBotBorder && (
        <View style = {{ width: botBorderWidth, borderBottomWidth:1, alignSelf: "center" }} />
        )
      }
    </TouchableOpacity>
    );
  }
}

UserElement.propTypes = {

  w1: PropTypes.number.isRequired,
  w3: PropTypes.number.isRequired,
  h:PropTypes.number,

  textValue: PropTypes.string.isRequired,
  rightValue: PropTypes.string,
  iconType: PropTypes.string.isRequired,
  iconName: PropTypes.string.isRequired,
  iconSize: PropTypes.number.isRequired,
  iconColor: PropTypes.string.isRequired,

  allowBotBorder: PropTypes.bool,
  botBorderWidth: PropTypes.number
};

UserElement.defaultProps = {
  h: 50,
  iconSize: 30,
  iconColor: "white",
  allowBotBorder: false,
  botBorderWidth: width/1.2
};


export default UserElement;