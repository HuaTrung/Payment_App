import React, { Component } from 'react';
import {
  Container, Header, Item, Input, Icon, Button, Text
  , List, ListItem, Left, Body, Right, Thumbnail
} from 'native-base';
import { TouchableOpacity,ScrollView,Image } from 'react-native';
import { searchPromotion } from '../../no-redux/search'

export default class Promotion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listPromotion: [],
      valueSearch: ""
    };
    
    searchPromotion().then(status => {
      this.setState({
        listPromotion: status.listPromotion
      });
    });
  }

  render() {
    const { listPromotion } = this.state;
    const options = [];
    for (let i = 0; i < listPromotion.length; i++) {
      console.log(listPromotion[i].Image);
      options.push(<ListItem avatar key={i} style={{padding:5}}>
        <Body>
         <Image style={{width: "100%", height: 180}} source={{uri: listPromotion[i]["Image"]}} ></Image>
          <Text>{listPromotion[i].Query}</Text>
        </Body>
        <Right>
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