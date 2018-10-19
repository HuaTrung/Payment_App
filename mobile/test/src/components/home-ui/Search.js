import React, { Component } from 'react';
import { View, Text,StyleSheet } from 'react-native';

class Search extends Component {

  render() {
    return (
      <View style={styles.container}>
        <Text>This's Search</Text>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff59d',
    flex:1,
  },
});
export default Search;