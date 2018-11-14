import React, { Component } from 'react';
import { Icon  } from 'native-base';

import {
  View,
  TouchableOpacity,
  Text
} from 'react-native';

export class MyKeyboard extends Component {

  render() {
    const data = [1, 2, 3, 4, 5];
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' ,backgroundColor: "#f5f5f5"}} >
        <View style={{ flex: 1, alignSelf: 'center',flexDirection: 'row' ,}}>
          <TouchableOpacity style={{width:'33%', alignItems: 'center' , justifyContent: 'center'}}
          ><Text style={{color:"black"}}>1</Text></TouchableOpacity>
          <TouchableOpacity style={{ width:'33%', alignItems: 'center', justifyContent: 'center' }}><Text style={{color:"black"}}>2</Text></TouchableOpacity>
          <TouchableOpacity style={{ width:'33%', alignItems: 'center' , justifyContent: 'center'}}><Text style={{color:"black"}}>3</Text></TouchableOpacity>
        </View>
        <View style={{ flex: 1, alignSelf: 'center', flexDirection: 'row' }}>
          <TouchableOpacity style={{ width:'33%', alignItems: 'center', justifyContent: 'center' }}><Text style={{color:"black"}}>4</Text></TouchableOpacity>
          <TouchableOpacity style={{ width:'33%', alignItems: 'center', justifyContent: 'center' }}><Text style={{color:"black"}}>5</Text></TouchableOpacity>
          <TouchableOpacity style={{ width:'33%', alignItems: 'center', justifyContent: 'center'}}><Text style={{color:"black"}}>6</Text></TouchableOpacity>
        </View>
        <View style={{ flex: 1, alignSelf: 'center', flexDirection: 'row' }}>
          <TouchableOpacity style={{ width:'33%' , alignItems: 'center', justifyContent: 'center'}}><Text style={{color:"black"}}>7</Text></TouchableOpacity>
          <TouchableOpacity style={{ width:'33%' , alignItems: 'center', justifyContent: 'center'}}><Text style={{color:"black"}}>8</Text></TouchableOpacity>
          <TouchableOpacity style={{ width:'33%' , alignItems: 'center', justifyContent: 'center'}}><Text style={{color:"black"}}>9</Text></TouchableOpacity>
        </View>
        <View style={{ flex: 1, alignSelf: 'center', flexDirection: 'row' }}>
          <TouchableOpacity style={{ width:'33%' , alignItems: 'center', justifyContent: 'center'  }}><Text style={{color:"black"}}>0</Text></TouchableOpacity>
          <TouchableOpacity style={{ width:'33%' , alignItems: 'center', justifyContent: 'center' }}><Text style={{color:"black"}}>000</Text></TouchableOpacity>
          <TouchableOpacity style={{ width:'33%' , alignItems: 'center', justifyContent: 'center'}}>
          <Icon type='Ionicons' name='ios-backspace' style={{color:"black"}}/></TouchableOpacity>
        </View>
        <ModalExample visible="true"></ModalExample>
      </View>
    );
  }
}