import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, Alert } from 'react-native';
import { rechargeMoney } from '../../../../no-redux/recharge'
const { width, height } = Dimensions.get('window');
import { Form, Item, Input, Label, Button, Icon } from 'native-base';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import Ionicons from 'react-native-vector-icons/Ionicons';

export default class Transfer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      money: "",
      modalVisible: false,
      passWord: "",
      sucessOrNot: null
    };
  }
    

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: "white" }}>
        <View style={{
          height: 50,
          backgroundColor: "#1aa3ff",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "row"
        }}>
          <TouchableOpacity style={{ marginLeft: 7 }} onPress={() => this.props.navigation.goBack()} >
            <Icon type='Ionicons' name='ios-arrow-back' style={{ color: "#fafafa" }} fontSize={35} />
          </TouchableOpacity>
          <View style={{ flex: 1 }}>
            <Text style={{ textAlign: "center", color: "white", fontWeight: "500", fontSize: 18 }} >Transfer</Text>
          </View>
        </View>

        <View style={{ marginTop: 5 }}>
          <TouchableOpacity onPress = { () => this.props.navigation.push('TransferFriendScreen')}>
            <View style={{ flexDirection: "row", borderColor: "#e0e0e0", borderBottomWidth: 1, width: "100%", padding: 15 }}>
              <View style={{ width: "10%", alignItems: 'center', justifyContent: 'center' }}><FontAwesome5 name="user-friends" size={30} color="#20A8D8" /></View>
              <View style={{width:"80%"}}>
                <Text style={{ fontSize: 15, marginLeft: 15 }}>Chuyển tiền đến bạn bè</Text>
                <Text style={{ fontSize: 12, marginLeft: 15 }}>Số điện thoại, danh bạ</Text>
              </View>
              <View style={{width:"10%",alignItems: 'flex-end', justifyContent: 'flex-end'}}>
              <Ionicons name="ios-arrow-forward" size={20} color="#20A8D8" />
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity>
            <View style={{ flexDirection: "row", borderColor: "#e0e0e0", borderBottomWidth: 1, width: "100%", padding: 15 }}>
              <View style={{ width: "10%", alignItems: 'center', justifyContent: 'center' }}><FontAwesome5 name="university" size={30} color="#20A8D8" /></View>
              <View style={{width:"80%"}}>
                <Text style={{ fontSize: 15, marginLeft: 15 }}>Chuyển tiền đến ngân hàng</Text>
                <Text style={{ fontSize: 12, marginLeft: 15 }}>Tài khoản của 41 ngân hàng nội địa  </Text>
              </View>
              <View style={{width:"10%",alignItems: 'flex-end', justifyContent: 'flex-end'}}>
                <Ionicons name="ios-arrow-forward" size={20} color="#20A8D8" />
              </View>
            </View>
          </TouchableOpacity>
          <Text style={{ fontSize: 12, margin: 15 }}>GIAO DỊCH GẦN ĐÂY</Text>

        </View>
      </View>

    );
  }
}
