import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, ImageBackground } from 'react-native';
import { rechargeMoney } from '../../../../no-redux/recharge'
const { width, height } = Dimensions.get('window');
import {  Icon } from 'native-base';

export default class MyKeyBoard extends Component {
  render() {
    return (
      <View style={{
        flex: 1,
        backgroundColor: "#ffffff",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row"
      }}>
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: "#f5f5f5" }} >
          <View style={{ flex: 1, alignSelf: 'center', flexDirection: 'row', }}>
            <TouchableOpacity style={{ width: '33%', alignItems: 'center', justifyContent: 'center' }}
              onPress={() =>  this.props.setMoney("1")}
            ><Text style={{ color: "black" }}>1</Text></TouchableOpacity>
            <TouchableOpacity style={{ width: '33%', alignItems: 'center', justifyContent: 'center' }}
              onPress={() =>  this.props.setMoney("2")}><Text style={{ color: "black" }}>2</Text></TouchableOpacity>
            <TouchableOpacity style={{ width: '33%', alignItems: 'center', justifyContent: 'center' }}
              onPress={() =>  this.props.setMoney("3")}><Text style={{ color: "black" }}>3</Text></TouchableOpacity>
          </View>
          <View style={{ flex: 1, alignSelf: 'center', flexDirection: 'row' }}>
            <TouchableOpacity style={{ width: '33%', alignItems: 'center', justifyContent: 'center' }}
              onPress={() =>  this.props.setMoney("4")}><Text style={{ color: "black" }}>4</Text></TouchableOpacity>
            <TouchableOpacity style={{ width: '33%', alignItems: 'center', justifyContent: 'center' }}
              onPress={() =>  this.props.setMoney("5")}><Text style={{ color: "black" }}>5</Text></TouchableOpacity>
            <TouchableOpacity style={{ width: '33%', alignItems: 'center', justifyContent: 'center' }}
              onPress={() =>  this.props.setMoney("6")}><Text style={{ color: "black" }}>6</Text></TouchableOpacity>
          </View>
          <View style={{ flex: 1, alignSelf: 'center', flexDirection: 'row' }}>
            <TouchableOpacity style={{ width: '33%', alignItems: 'center', justifyContent: 'center' }}
              onPress={() =>  this.props.setMoney("7")}><Text style={{ color: "black" }}>7</Text></TouchableOpacity>
            <TouchableOpacity style={{ width: '33%', alignItems: 'center', justifyContent: 'center' }}
              onPress={() =>  this.props.setMoney("8")}><Text style={{ color: "black" }}>8</Text></TouchableOpacity>
            <TouchableOpacity style={{ width: '33%', alignItems: 'center', justifyContent: 'center' }}
              onPress={() =>  this.props.setMoney("9")}><Text style={{ color: "black" }}>9</Text></TouchableOpacity>
          </View>
          <View style={{ flex: 1, alignSelf: 'center', flexDirection: 'row' }}>
            <TouchableOpacity style={{ width: '33%', alignItems: 'center', justifyContent: 'center' }}
              onPress={() =>  this.props.setMoney("0")}><Text style={{ color: "black" }}>0</Text></TouchableOpacity>
            <TouchableOpacity style={{ width: '33%', alignItems: 'center', justifyContent: 'center' }}
              onPress={() =>  this.props.setMoney("000")}><Text style={{ color: "black" }}>000</Text></TouchableOpacity>
            <TouchableOpacity style={{ width: '33%', alignItems: 'center', justifyContent: 'center' }}
              onPress={() =>  this.props.setMoney("-1")}
              onLongPress={() =>  this.props.setMoney("-2")} >
              <Icon type='Ionicons' name='ios-backspace' style={{ color: "black" }} /></TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}
