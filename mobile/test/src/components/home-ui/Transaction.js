import React, { Component } from 'react';
import {
  Container, Header, Item, Input, Icon, Button, Text
  , List, ListItem, Left, Body, Right, Thumbnail
} from 'native-base';
import { TouchableOpacity,ScrollView } from 'react-native';
import { searchTransaction } from '../../no-redux/search'

export default class Promotion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listTransaction: [],
      valueSearch: ""
    };
    
    searchTransaction().then(status => {
      this.setState({
        listTransaction: status.listTransaction
      });
    });
  }

  render() {
    const { listTransaction } = this.state;
    const options = [];
    let content1="";
    let content2="";
    for (let i = 0; i < listTransaction.length; i++) {
      content1="";
      content2="";
      switch (listTransaction[i].Type) {
        case 1:
          content1 = "Chuyển tiền tới " + listTransaction[i].Name;
          content2 = <Text  >{listTransaction[i].Money}</Text>;
          break;
        case 2:
          content1 = "Chuyển tiền tới " + listTransaction[i].Name;
          content2 = <Text >{listTransaction[i].Money}</Text>;
          break;
        case 3:
          content1="Nạp tiền vào tài khoản ZolaPay";
          content2=<Text style={{color:"#64dd17"}} >+ {listTransaction[i].Money}</Text>;
          break;
        case 4:
          content1 = "Nhận tiền từ " + listTransaction[i].Name;
          content2 = <Text style={{ color: "#64dd17" }} >+ {listTransaction[i].Money}</Text>;
          break;
        default:
          content1 = "";
          content2 = <Text  ></Text>;
          break;
      }
      options.push(<ListItem avatar key={i} style={{padding:5}}>
        <Body>
          <Text>{content1}</Text>
          <Text note>{listTransaction[i].DateTrans}</Text>
        </Body>
        <Right>
          {content2}
        </Right>
        
      </ListItem>
      )
    }
    return (
      <ScrollView>
        <Container>
          <List>
          {options}
          </List>
        </Container>
      </ScrollView>
    );
  }
}