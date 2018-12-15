import { View, Text } from 'react-native';
import React, { Component } from 'react';


class Splash extends Component {



  render() {
    return (
      <View style = {{ flex:1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#4d94ff' }}>
        <Text>This is splash screen</Text>
      </View>
    );
  }
}

export default Splash;