import React, { Component } from 'react';
import { Icon } from 'native-base';

import {
  View,
  TouchableOpacity,
  Text
} from 'react-native';

export class MyKeyboard extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: "#f5f5f5" }} >
        <View style={{ flex: 1, alignSelf: 'center', flexDirection: 'row', }}>
          <TouchableOpacity style={{ width: '33%', alignItems: 'center', justifyContent: 'center' }}
            onPress={() => this.setState({ money: this.state.money + "1" })}
          ><Text style={{ color: "black" }}>1</Text></TouchableOpacity>
          <TouchableOpacity style={{ width: '33%', alignItems: 'center', justifyContent: 'center' }}
            onPress={() => this.setState({ money: this.state.money + "2" })}><Text style={{ color: "black" }}>2</Text></TouchableOpacity>
          <TouchableOpacity style={{ width: '33%', alignItems: 'center', justifyContent: 'center' }}
            onPress={() => this.setState({ money: this.state.money + "3" })}><Text style={{ color: "black" }}>3</Text></TouchableOpacity>
        </View>
        <View style={{ flex: 1, alignSelf: 'center', flexDirection: 'row' }}>
          <TouchableOpacity style={{ width: '33%', alignItems: 'center', justifyContent: 'center' }}
            onPress={() => this.setState({ money: this.state.money + "4" })}><Text style={{ color: "black" }}>4</Text></TouchableOpacity>
          <TouchableOpacity style={{ width: '33%', alignItems: 'center', justifyContent: 'center' }}
            onPress={() => this.setState({ money: this.state.money + "5" })}><Text style={{ color: "black" }}>5</Text></TouchableOpacity>
          <TouchableOpacity style={{ width: '33%', alignItems: 'center', justifyContent: 'center' }}
            onPress={() => this.setState({ money: this.state.money + "6" })}><Text style={{ color: "black" }}>6</Text></TouchableOpacity>
        </View>
        <View style={{ flex: 1, alignSelf: 'center', flexDirection: 'row' }}>
          <TouchableOpacity style={{ width: '33%', alignItems: 'center', justifyContent: 'center' }}
            onPress={() => this.setState({ money: this.state.money + "7" })}><Text style={{ color: "black" }}>7</Text></TouchableOpacity>
          <TouchableOpacity style={{ width: '33%', alignItems: 'center', justifyContent: 'center' }}
            onPress={() => this.setState({ money: this.state.money + "8" })}><Text style={{ color: "black" }}>8</Text></TouchableOpacity>
          <TouchableOpacity style={{ width: '33%', alignItems: 'center', justifyContent: 'center' }}
            onPress={() => this.setState({ money: this.state.money + "9" })}><Text style={{ color: "black" }}>9</Text></TouchableOpacity>
        </View>
        <View style={{ flex: 1, alignSelf: 'center', flexDirection: 'row' }}>
          <TouchableOpacity style={{ width: '33%', alignItems: 'center', justifyContent: 'center' }}
            onPress={() => this.setState({ money: this.state.money + "0" })}><Text style={{ color: "black" }}>0</Text></TouchableOpacity>
          <TouchableOpacity style={{ width: '33%', alignItems: 'center', justifyContent: 'center' }}
            onPress={() => this.setState({ money: this.state.money + "000" })}><Text style={{ color: "black" }}>000</Text></TouchableOpacity>
          <TouchableOpacity style={{ width: '33%', alignItems: 'center', justifyContent: 'center' }}
            onPress={() => this.setState({ money: this.state.money.substring(0, (this.state.money.length - 1)) })}
            onLongPress={() => this.setState({ money: "" })} >
            <Icon type='Ionicons' name='ios-backspace' style={{ color: "black" }} /></TouchableOpacity>
        </View>
      </View>
    );
  }
}