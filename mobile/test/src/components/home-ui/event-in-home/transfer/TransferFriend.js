import React, { Component } from 'react';
import {
  Container, Header, Item, Input, Icon, Button, Text
  , List, ListItem, Left, Body, Right, Thumbnail
} from 'native-base';
import { TouchableOpacity } from 'react-native';
import RNEventSource from 'react-native-event-source'
import { queryUserAvatar } from "../../../../realm/userQueries";
import { searchUserByPhone } from '../../../../no-redux/search'

export default class TransferFriend extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listFriends: [],
      valueSearch: ""
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
  searchUser() {
    searchUserByPhone(this.state.valueSearch).then(status => {
      this.setState({
        listFriends: status.listUser
      });
    });
  }
  render() {
    const { listFriends } = this.state;
    const options = [];
    for (let i = 0; i < listFriends.length; i++) {
      options.push(<ListItem avatar>
        <Left>
          <Thumbnail source={{uri: listFriends[i].avatar}} />
        </Left>
        <Body>
          <Text>{listFriends[i].name}</Text>
          <Text note>{listFriends[i].phone}</Text>
        </Body>
        <Right>
          <Icon name="ios-arrow-forward" />
        </Right>
      </ListItem>
      )
    }
    return (
      <Container>
        <Header searchBar rounded androidStatusBarColor="#1aa3ff" style={{ backgroundColor: "#1aa3ff" }}>
          <Item >
            <Icon onPress={() => this.props.navigation.goBack()}
              type='Ionicons' name='ios-arrow-back' style={{ color: "#1aa3ff" }} fontSize={35} />
            <Icon onPress={() => { this.searchUser() }} name="ios-search" />
            <Input placeholder="Nhập số điện thoại"
              onChangeText={(valueSearch) => this.setState({ valueSearch })}
              value={this.state.username} />
            <Icon name="ios-people" />
          </Item>
          <Button transparent>
          <Icon onPress={() => { this.searchUser() }} name="ios-search" />
          </Button>
        </Header>
        <List>
        {options}
        </List>
      </Container>
    );
  }
}