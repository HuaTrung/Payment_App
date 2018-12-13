import React, { Component } from 'react';
import { 
  View, 
  TouchableOpacity,
  Dimensions,
  Text
} from 'react-native';
import EvilIcons from "react-native-vector-icons/EvilIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import MCIcons from "react-native-vector-icons/MaterialCommunityIcons";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import Zocial from "react-native-vector-icons/Zocial";
import { withNavigation } from "react-navigation";
const { width, height } = Dimensions.get('window');
const impHeight = height / 8;

class HomeTop extends Component {

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
      case "Zocial":
        return <Zocial name = { iconName } size = { iconSize } color = { iconColor }/>
    }
    
  }

  render() {

    const { _onPress, text } = this.props;

    return (
      <TouchableOpacity style = {{ 
        width: impHeight, 
        height: impHeight -10, 
        // backgroundColor: "#4d79ff", 
        marginBottom: 5,
        alignItems :"center",
        justifyContent: "center" 
      }} 
        onPress = { _onPress }
      >
        { this.renderIcon() }
        <Text style = {{ color:"white", fontSize: 12 }} >{text}</Text>
      </TouchableOpacity>
    );
  }
}

HomeTop.defaultProps = {
  iconColor: 'white',
  iconSize: 40,
};

export default HomeTop;