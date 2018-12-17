import React, { Component } from 'react';
import {
  Container, Header, Item, Input, Icon, Button, Text
  , List, ListItem, Left, Body, Right, Thumbnail
} from 'native-base';
import { TouchableOpacity,ScrollView ,RefreshControl, View, StyleSheet, FlatList} from 'react-native';
import { searchTransaction } from '../../no-redux/search';
import { formatCurrency } from "../../validations/util";
import { GLOBAL } from "../../config/language";
import { querySettingLanguage,isEmptyTransHis, updateTransHis,queryTransData, deleteTransHis, queryTempData, queryTransHisId } from "../../realm/userQueries";
import Modal from "react-native-modal";
class Transaction extends Component {

  // static navigationOptions =  ({navigation}) => ({
  //   title: navigation.getParam('TRANSACTION','Transaction')
  // })

  constructor(props) {
    super(props);
    this.state = {
      listTransaction: [],
      valueSearch: "",
      refreshing: false,
      popupTrans: false,
      key: 0,
      listTransaction1: [],
      lang:querySettingLanguage()
    };
    this._renderPopupItem = this._renderPopupItem.bind(this);
  }

  componentDidMount() {
    if(isEmptyTransHis()) { // first time
      console.log("Start fetch transaction history from database");
      searchTransaction().then(status => {
        updateTransHis(status.listTransaction);
        this.setState({
          listTransaction: status.listTransaction
        });
      });
    } else { // no => get from database
      console.log("Start fetch transaction history from LOCAL database");
      queryTempData().then(data => this.setState({ listTransaction: data }));
    }
  }

  _onRefresh = () => {
    this.setState({refreshing: true});
    console.log("Start fetch NEW transaction history from database");
    searchTransaction().then(status => {
      this.setState({
        listTransaction: status.listTransaction,
        refreshing: false
      });
      deleteTransHis().then(()=> updateTransHis(status.listTransaction));
    });
  }

  _renderPopupItem() {
    const { key } = this.state;
    const data = queryTransHisId(key);
    const {lang} = this.state;
    return(
      data != null &&
      <Modal isVisible={this.state.popupTrans}>
          <View style={styles.modalContent}>
            <View style={{flexDirection:"row",borderColor: "#F7F8F9",borderWidth: 0.5,width:"100%",padding:10,backgroundColor:"#F0F4F7"}}> 
              <Icon type='MaterialCommunityIcons' name='check-circle' style={{ color: "#0EB709" ,marginRight:10}} />
              <Text style={{ color: "#0EB709", fontSize: 20 }}>{GLOBAL[lang].DETAIL_TRANSACTION}</Text>
            </View>
            <View style={{alignItems: "center",paddingBottom:10}}>
              <Text style={{ color: "#bdbdbd",  margin:5,fontSize: 15,marginTop:10 }}>{GLOBAL[lang].MONEY_TRANSACTION}</Text>
              <View style={{ flexDirection: "row" }}>
                <Text style={{ color: "#212121", fontSize: 30 }}>{formatCurrency(data.Money)}</Text>
                <Text style={{ color: "#212121", fontSize: 15 }}> VND</Text>
              </View>
            </View>
            <View style={{width:"100%",backgroundColor:"#F0F4F7",padding:5,paddingLeft:10}}> 
             <View style={{flexDirection: 'row'}}>
              <Text style={{ width:"30%",color: "#212121", fontSize: 15,margin:3 }}>{GLOBAL[lang].Name}</Text>
              <Text style={{ width:"70%",color: "#212121", fontSize: 15,margin:3,textAlign: 'right',paddingRight:30 }}>{data.Name}</Text>
             </View>
             <View style={{flexDirection: 'row'}}>
              <Text style={{ width:"30%",color: "#212121", fontSize: 15,margin:3 }}>{GLOBAL[lang].PhoneNumber}</Text>
              <Text style={{ width:"70%",color: "#212121", fontSize: 15,margin:3,textAlign: 'right',paddingRight:30 }}>{data.Phone}</Text>
             </View>
             <View style={{flexDirection: 'row'}}>
              <Text style={{ width:"30%",color: "#212121", fontSize: 15,margin:3 }}>{GLOBAL[lang].Target}</Text>
              <Text style={{ width:"70%",color: "#212121", fontSize: 15,margin:3,textAlign: 'right',paddingRight:30 }}>{data.Target}</Text>
             </View>
             <View style={{flexDirection: 'row'}}>
              <Text style={{ width:"30%",color: "#212121", fontSize: 15,margin:3 }}>{GLOBAL[lang].TranId}</Text>
              <Text style={{ width:"70%",color: "#212121", fontSize: 15,margin:3,textAlign: 'right',paddingRight:30 }}>{data.TranID}</Text>
             </View>
             <View style={{flexDirection: 'row'}}>
              <Text style={{ width:"30%",color: "#212121", fontSize: 15,margin:3 }}>{GLOBAL[lang].Fee}</Text>
              <Text style={{ width:"70%",color: "#212121", fontSize: 15,margin:3,textAlign: 'right',paddingRight:30 }}>{formatCurrency(data.FeeTrans)}</Text>
             </View>
             <View style={{flexDirection: 'row'}}>
              <Text style={{ width:"30%",color: "#212121", fontSize: 15,margin:3 }}>{GLOBAL[lang].DesTrans}</Text>
              <Text style={{ width:"70%",color: "#212121", fontSize: 15,margin:3,textAlign: 'right',paddingRight:30 }}>{data.Description}</Text>
             </View>
             <View style={{flexDirection: 'row'}}>
              <Text style={{ width:"30%",color: "#212121", fontSize: 15,margin:3 }}>{GLOBAL[lang].Date}</Text>
              <Text style={{ width:"70%",color: "#212121", fontSize: 15,margin:3,textAlign: 'right',paddingRight:30 }}>{data.DateTrans}</Text>
             </View>
             <View style={{flexDirection: 'row'}}>
              <Text style={{ width:"30%",color: "#212121", fontSize: 15,margin:3 }}>{GLOBAL[lang].Type}</Text>
              <Text style={{ width:"70%",color: "#212121", fontSize: 15,margin:3,textAlign: 'right',paddingRight:30 }}>{GLOBAL[lang].TypeTransaction[parseInt(data.Type)-1]}</Text>
             </View>
            </View>
            <View style={styles.buttonSuccess}>
              <TouchableOpacity onPress={() => {
                this.setState({ popupTrans: false })
              } }>
                <View style={{padding:5}}>
                 <Text style={{color:"white",fontSize:16}}>{GLOBAL[lang].Close}</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
      </Modal>
    )
  }


  render() {
    const { listTransaction } = this.state;
    let { lang } = this.state;
    const options = [];
    let content1="";
    let content2="";
    for (let i = (listTransaction.length-1); i >=0;i--) {
      content1="";
      content2="";
      icon = "";
      switch (listTransaction[i].Type) {
        case 1:
          content1 = lang == 2 ? listTransaction[i].Name + GLOBAL[lang].TransferTrans : GLOBAL[lang].TransferTrans + listTransaction[i].Name;
          content2 = <Text  style={{color:"red"}}  >- {formatCurrency(listTransaction[i].Money)}</Text>;
          break;
        case 2:
          content1 = lang == 2 ? listTransaction[i].Name + GLOBAL[lang].ReceiveTrans : GLOBAL[lang].ReceiveTrans + listTransaction[i].Name;
          content2 = <Text style = {{ color:"red" }} >- {formatCurrency(listTransaction[i].Money)}</Text>;
          break;
        case 3:
          content1= GLOBAL[lang].RechargeTrans;
          content2=<Text style = {{ color:"#3b5998" }}>+ {formatCurrency(listTransaction[i].Money)}</Text>;
          break;
        case 4:
          content1 = lang == 2 ? listTransaction[i].Name  + GLOBAL[lang].ReceiveTrans : GLOBAL[lang].ReceiveTrans + listTransaction[i].Name;
          content2 = <Text style={{ color: "#64dd17" }} >+ {formatCurrency(listTransaction[i].Money)}</Text>;
          break;
        default:
          content1 = "";
          content2 = <Text  ></Text>;
          break;
      }
      options.push(
        <ListItem avatar onPress = { ()=> this.setState({ popupTrans: true, key: i }) } key={i} style={{padding:5}}>

          <Body>
            <Text>{content1}</Text>
            <Text note>{listTransaction[i].DateTrans}</Text>
          </Body>

          <Right >
            {content2}
          </Right>
        </ListItem>
      )
    }
    return (
      <View style = {{ flex:1 }}>
        <View style = {{ height:45, backgroundColor: "#1aa3ff",justifyContent: "center",alignItems: "center" }}>       
          <Text style = {{ textAlign : "center", color: "white", fontWeight:"500", fontSize: 18}} >{GLOBAL[lang].TransactionHistory}</Text>
        </View>
        <ScrollView style = {{ flex:1 }} refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this._onRefresh}
          />
          }>
          <List >{options}</List>
        </ScrollView>
        { this._renderPopupItem() }
      </View>
    );
  }
}
const styles = StyleSheet.create({
  modalContent: {
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    borderColor: "rgba(0, 0, 0, 0.1)"
  },
  buttonSuccess: {
    backgroundColor: "#0EB709",
    padding: 3,
    margin: 16,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    borderColor: "rgba(0, 0, 0, 0.1)"
  }
})

export default Transaction;