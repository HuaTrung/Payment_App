import React, { Component } from 'react';
import { Container, Header, Item, Input, Icon, Button, Text } from 'native-base';
import {TouchableOpacity } from 'react-native';
import RNEventSource from 'react-native-event-source'

export default class TransferFriend extends Component {
  constructor(props) {
    super(props);
    this.state = {
      money: "",
      modalVisible: false,
      passWord: "",
      sucessOrNot: null
    };
  }
  componentDidMount() {
    this.eventSource = new RNEventSource('http://192.168.226.1:8080/updates');

    this.eventSource.addEventListener('connected', (e) => {
        console.log('Connection is established');
    });
    
    // listens to all the messages. The only way to catch unnamed events (with no `event` name set)
    this.eventSource.addEventListener('message', (e) => {
      console.log(e.data);
  });
  }
  componentWillUnmount() {
    this.eventSource.removeAllListeners();
    this.eventSource.close();
  }
  render() {
    return (
      <Container>
        <Header searchBar rounded androidStatusBarColor="#1aa3ff" style={{backgroundColor:"#1aa3ff"}}>
            
          <Item >
            <Icon onPress={() => this.props.navigation.goBack()}
            type='Ionicons' name='ios-arrow-back' style={{ color: "#1aa3ff"}} fontSize={35} />
            <Icon name="ios-search" />
            <Input placeholder="Nhập số điện thoại"/>
            <Icon name="ios-people" />
          </Item>
          <Button transparent>
            <Text>Search</Text>
          </Button>
        </Header>
      </Container>
    );
  }
}