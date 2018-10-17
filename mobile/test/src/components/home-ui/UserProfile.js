import React, { Component } from 'react';
import { View, Text,StyleSheet } from 'react-native';
import { Icon } from 'react-native-elements'

class UserProfile extends Component {

  render() {
    return (
      <View style={styles.container}>
        <Text>This's UserProfile</Text>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#64b5f6',
    flex:1,
  },
});
export default UserProfile;