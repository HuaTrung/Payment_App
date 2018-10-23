import React, { Component } from 'react';
import { View, Text,StyleSheet } from 'react-native';

class Promotion extends Component {

  render() {
    return (
      <View style={styles.container}>
        <Text>This's Promotion</Text>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#9fa8da',
    flex:1,
  },
});
export default Promotion;