import React, { Component } from 'react';
import { View, Text,StyleSheet, Dimensions, TouchableOpacity, Image } from 'react-native';
import { Icon } from 'react-native-elements'
import PropTypes from 'prop-types';
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import Entypo from "react-native-vector-icons/Entypo";
const { width, height } = Dimensions.get('window');

class ProfileElement extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    const { w1, w2, w3, h, onPress, name, phone, startMemberAt, avatar } = this.props;
    return (
      <TouchableOpacity onPress= {onPress} style = {{ flexDirection: "row", height: h, backgroundColor: "white"}}>       
        <View style = {{ width: w1 , justifyContent: "center", alignItems:"center"}}>                    
          <Image
          style={{width: 50, height: 50}}
          source={{uri: avatar}}
        />
        </View>
        <View style = {{ flex:1 , flexDirection: "column", justifyContent: "center", marginHorizontal:5 }}>
          <Text style = {{ fontWeight:"bold", fontSize:16 }} >{name}</Text>
          <Text>{phone}</Text>
          <Text>{startMemberAt}</Text>
        </View>
        <View style = {{ width: w3  ,justifyContent: "center", alignItems:"center" }}>
          <Entypo name = "chevron-thin-right" color = "#3b5998" size = {h-h/2-h/8} />
        </View>
    </TouchableOpacity>
    );
  }
}

ProfileElement.propTypes = {
  w1: PropTypes.number.isRequired,
  w3: PropTypes.number.isRequired,
  h:PropTypes.number.isRequired,
  onPress : PropTypes.func.isRequired,
  name: PropTypes.string.isRequired, 
  phone: PropTypes.string.isRequired, 
  startMemberAt: PropTypes.string.isRequired,
  avatar: PropTypes.string
};

ProfileElement.defaultProps = {
//  w2: width - this.props.w1 - this.props.w3
};


export default ProfileElement;