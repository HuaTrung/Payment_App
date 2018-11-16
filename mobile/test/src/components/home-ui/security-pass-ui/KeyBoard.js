import React, { Component } from 'react';
import { View} from 'react-native';
import KbButton from "./KeyboardButton";

class KeyBoard extends Component { 

  constructor(props) {
    super(props);
    this._onKeyboardItemPress = this._onKeyboardItemPress.bind(this);
  }

  _onKeyboardItemPress(e) {
    alert(e);
  }

  render() {
    return(
      <View style={{ flex:1, paddingHorizontal: 30,justifyContent:"space-around"}}>
        <View style = {{ flexDirection: 'row', justifyContent:"space-around" }}>
          <KbButton number="1"/>
          <KbButton number="2"/>
          <KbButton number="3"/>
        </View>
        <View style = {{ flexDirection: 'row', justifyContent:"space-around" }}>
          <KbButton number="4"/>
          <KbButton number="5"/>
          <KbButton number="6"/>  
        </View>
        <View style = {{ flexDirection: 'row', justifyContent:"space-around" }}>
          <KbButton number="7"/>
          <KbButton number="8"/>
          <KbButton number="9"/>
        </View>
        <View style = {{ flexDirection: 'row', justifyContent:"space-around" }}>
          <KbButton number=""/>
          <KbButton number="0"/>
          <KbButton number="_XX"/>
        </View>
      </View>
    );
  }
}

export default KeyBoard;