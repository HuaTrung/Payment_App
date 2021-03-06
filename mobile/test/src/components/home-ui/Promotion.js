import React, { Component } from 'react';
import {
  Container, Header, Item, Input, Icon, Button, Text
  , List, ListItem, Left, Body, Right, Thumbnail
} from 'native-base';
import { TouchableOpacity,ScrollView,Image,RefreshControl,FlatList } from 'react-native';
import { searchPromotion } from '../../no-redux/search'
import {  querySettingLanguage } from "../../realm/userQueries"
import { GLOBAL } from "../../config/language";

class Promotion extends Component {

  // static navigationOptions =  ({navigation}) => ({
  //   title: navigation.getParam('PROMOTION','Promotion')
  // })


  constructor(props) {
    super(props);
    this.state = {
      listPromotion: [],
      valueSearch: "",
      refreshing: false,
      lang: querySettingLanguage()
    };
    
    
  }
  _onRefresh = () => {
    console.log("123");
    this.setState({refreshing: true});
    searchPromotion().then(status => {
      this.setState({
        listPromotion: status.listPromotion,
        refreshing: false});
    });
  }
  componentDidMount(){
    console.log("123");
    searchPromotion().then(status => {
      this.setState({
        listPromotion: status.listPromotion
      });
    });
  }
  render() {
    const { listPromotion } = this.state;
    const options = [];
    for (let i =0; i<listPromotion.length;i++) {
      Begin_date=(new Date(listPromotion[i].Start_date*1000));
      End_date=(new Date(listPromotion[i].End_date*1000));
      options.push(<ListItem avatar key={i} style={{padding:5}}>
        <Body>
         <Image style={{width: "100%", height: 180}} source={{uri: listPromotion[i]["Image"]}} ></Image>
          <Text style={{color:"#424242",fontSize:20,marginTop:10}}>Ngày bắt đầu: { Begin_date.getDay()}/{Begin_date.getMonth()}/{Begin_date.getFullYear()} _ Ngày kết thúc: { End_date.getDay()}/{End_date.getMonth()}/{End_date.getFullYear()}</Text>
          <Text style={{color:"#d32f2f"}}>Chỉ còn: {(new Date((listPromotion[i].End_date-listPromotion[i].Start_date)*1000)).getDay()} ngày</Text>
        </Body>
        <Right>
        </Right>
        
      </ListItem>
      )
    }
    return (
      <ScrollView>
        <Container>
          <List refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this._onRefresh}
          />
        }>
          {options}
          </List>
        </Container>
      </ScrollView>
    );
  }
}
export default Promotion;