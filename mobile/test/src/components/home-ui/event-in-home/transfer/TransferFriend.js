import React, { Component } from 'react';
import {
  Container, Header, Item, Input, Icon, Button, Text
  , List, ListItem, Left, Body, Right, Thumbnail
} from 'native-base';
import { TouchableOpacity } from 'react-native';
import { queryUserAvatar, queryUserPhone, querySettingLanguage } from "../../../../realm/userQueries";
import { searchUserByPhone } from '../../../../no-redux/search'
import { GLOBAL } from "../../../../config/language";
export default class TransferFriend extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listFriends: [],
      valueSearch: "",
      lang: querySettingLanguage()
    };
  }
 

  searchUser() {
    searchUserByPhone(this.state.valueSearch).then(status => {
      this.setState({
        listFriends: status.listUser
      });
    });
  }
  render() {
    const { listFriends, lang } = this.state;
    const options = [];
    
    for (let i = 0; i < listFriends.length; i++) {
      if(listFriends[i].name=="null"){
        options.push(<Text style={{marginTop:20,fontSize:20,color:"#c62828",textAlign: 'center'}}>Không tìm được kết quả</Text>);
        break;
      }
      if(listFriends[i].phone!=queryUserPhone())
      options.push(<ListItem avatar key={i}>
     
        <Left>
          <Thumbnail source={{uri: listFriends[i].avatar}} />
        </Left>
        <Body>
        <TouchableOpacity onPress = { () => this.props.navigation.push('ActionTransferFriend',{target:listFriends[i]})}>
          <Text>{listFriends[i].name}</Text>
          <Text note>{listFriends[i].phone}</Text>
          </TouchableOpacity>
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
            <Input placeholder={GLOBAL[lang].EnterPhone}
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