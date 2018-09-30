import React, { Component } from 'react';
import { StyleSheet, View, ScrollView, TextInput, Text } from 'react-native';


import SignIn from './src/components/login-ui/SignIn';
import SignUp from './src/components/login-ui/SignUp';

import Fumi from './src/components/custom-ui/Fumi';
import Hideo from './src/components/custom-ui/Hideo';

import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';

export default class App extends Component {
  render() {
    return (
      <View style = {{ flex:1 }}>
      <ScrollView
       // style={styles.container}
       // contentContainerStyle={styles.content}
       horizontal
       pagingEnabled
       decelerationRate={0.993}
      >

          <SignUp/>
          <SignIn/>

        {/* <View style={[styles.card2, { backgroundColor: '#a9ceca' }]}>
          <Text style={styles.title}>Fumi</Text>
          <Fumi
            label={'Course Name'}
            labelStyle={{ color: '#a3a3a3' }}
            inputStyle={{ color: '#f95a25' }}
            iconClass={FontAwesomeIcon}
            iconName={'university'}
            iconColor={'#f95a25'}
            iconSize={15}
          />
          <Fumi
            style={styles.input}
            label={'Degree'}
            iconClass={FontAwesomeIcon}
            iconName={'graduation-cap'}
            iconColor={'#77116a'}
          />
        </View>
        <View style={[styles.card2, { backgroundColor: '#6b6b6b' }]}>
          <Text style={styles.title}>Hideo</Text>
          <Hideo
            iconClass={FontAwesomeIcon}
            iconName={'envelope'}
            iconColor={'white'}
            iconBackgroundColor={'#f2a59d'}
            inputStyle={{ color: '#464949' }}
            iconSize={30}
          />
          <Hideo
            style={styles.input}
            iconClass={FontAwesomeIcon}
            iconName={'user'}
            iconColor={'white'}
            iconBackgroundColor={'#f2a59d'}
            inputStyle={{ color: '#464949' }}
          />
        </View> */}
      </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 24,
    backgroundColor: 'white',
  },
  content: {
    // not cool but good enough to make all inputs visible when keyboard is active
    paddingBottom: 300,
  },
  card1: {
    paddingVertical: 16,
  },
  card2: {
    padding: 16,
  },
  input: {
    marginTop: 4,
  },
  title: {
    paddingBottom: 16,
    textAlign: 'center',
    color: '#404d5b',
    fontSize: 20,
    fontWeight: 'bold',
    opacity: 0.8,
  },
});