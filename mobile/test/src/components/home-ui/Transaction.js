import React, { Component } from 'react';
import {
  Container, Header, Item, Input, Icon, Button, Text
  , List, ListItem, Left, Body, Right, Thumbnail
} from 'native-base';
import { TouchableOpacity,ScrollView } from 'react-native';
import { searchTransaction } from '../../no-redux/search'
import { formatCurrency } from "../../validations/util"

import { connect } from "react-redux";
import { GLOBAL } from "../../config/language";
class Transaction extends Component {

  // static navigationOptions =  ({navigation}) => ({
  //   title: navigation.getParam('TRANSACTION','Transaction')
  // })

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
    let { lang } = this.props.lang;
    const options = [];
    let content1="";
    let content2="";
    for (let i = 0; i < listTransaction.length; i++) {
      content1="";
      content2="";
      switch (listTransaction[i].Type) {
        case 1:
          content1 = GLOBAL[lang].TransferTrans + listTransaction[i].Name;
          content2 = <Text  style={{color:"red"}}  >- {formatCurrency(listTransaction[i].Money)}</Text>;
          break;
        case 2:
          content1 = GLOBAL[lang].ReceiveTrans + listTransaction[i].Name;
          content2 = <Text style = {{ color:"red" }} >- {formatCurrency(listTransaction[i].Money)}</Text>;
          break;
        case 3:
          content1= GLOBAL[lang].RechargeTrans;
          content2=<Text style = {{ color:"#3b5998" }}>+ {formatCurrency(listTransaction[i].Money)}</Text>;
          break;
        case 4:
          content1 = GLOBAL[lang].ReceiveTrans + listTransaction[i].Name;
          content2 = <Text style={{ color: "#64dd17" }} >+ {formatCurrency(listTransaction[i].Money)}</Text>;
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
const mapStateToProps = state => ({
  lang: state.langReducer
});
export default connect(mapStateToProps)(Transaction);