import React, { Component } from 'react';
import { 
  View, 
  Text,
  StyleSheet, 
  Dimensions, 
  StatusBar, 
  TextInput, 
  TouchableOpacity,
  ScrollView,
  AppState
} from 'react-native';
import Modal from "react-native-modal";
import Swiper from "react-native-swiper";
import HomeSearchBar from "./HomeSearchBar";
import HomePromotionSwiper from "./HomePromotionSwiper"
const { width, height } = Dimensions.get('window');
const searchHeight = height / 13;
const impHeight = height / 8;
const promoHeight = height / 4;
import PIN from "../security-pass-ui/PIN";
import MCIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Toast } from "native-base";
import HomeTop from "./HomeTop";
import {HomSearch} from "../../../navigation-config/Route";
import {
  queryUserId, 
  isFirstTimeUsing, 
  isEmptyUserLogin,
  updateIsFirstTime , 
  queryUser, 
  queryUserMoney,
  updateMoney,
  queryUserTypeMoney
} from "../../../realm/userQueries";
import {register_PIN} from "../../../no-redux/securityPIN";
import firebase from "react-native-firebase";
import {
  appStateAddEventListener,
  AppStateRemoveEventListener,
  hasPermission,
  onMessageListener,
  onTokenRefreshListener,
  onListenerData
} from "../../../no-redux/notification";
import { connect } from "react-redux";
import isEmpty from "../../../validations/is-empty.validate";
import { formatCurrency } from "../../../validations/util";
import { Icon} from 'native-base';
import store from '../../../redux/store';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: ["Promotion 1","Promotion 2","Promotion 3","Promotion 4"],
      isModalVisible: false,
      moneyUser: queryUserMoney(),
      popupTrans: false,
      tranID: "",
      money:0,
      description:""
    };
    this._renderHome = this._renderHome.bind(this);
    this._renderPinCode = this._renderPinCode.bind(this);
    this._toggleModal = this._toggleModal.bind(this);
    this._onFulfill = this._onFulfill.bind(this);
    this._renderReceiveTransaction = this._renderReceiveTransaction.bind(this);
  }

  navigatePayScan() {
    this.props.navigation.push('PayScanScreen')
  }

  _toggleModal() {
    this.setState({ isModalVisible: !this.state.isModalVisible });
  }

  _renderReceiveTransaction() {
    return(
      <Modal isVisible={this.state.popupTrans}>
          <View style={styles.modalContent}>
            <View style={{flexDirection:"row",borderColor: "#F7F8F9",borderWidth: 0.5,width:"100%",padding:10,backgroundColor:"#F0F4F7"}}> 
              <Icon type='MaterialCommunityIcons' name='check-circle' style={{ color: "#0EB709" ,marginRight:10}} />
              <Text style={{ color: "#0EB709", fontSize: 20 }}>BẠN ĐÃ NHẬN ĐƯỢC TIỀN </Text>
            </View>
            <View style={{alignItems: "center",paddingBottom:10}}>
              <Text style={{ color: "#bdbdbd",  margin:5,fontSize: 15,marginTop:10 }}>SỐ TIỀN GIAO DỊCH </Text>
              <View style={{ flexDirection: "row" }}>
                <Text style={{ color: "#212121", fontSize: 30 }}>{this.state.money}</Text>
                <Text style={{ color: "#212121", fontSize: 15 }}> VND</Text>
              </View>
            </View>
            <View style={{width:"100%",backgroundColor:"#F0F4F7",padding:5,paddingLeft:10}}> 
             <View style={{flexDirection: 'row'}}>
              <Text style={{ width:"70%",color: "#212121", fontSize: 15,margin:3 }}>Mã giao dịch</Text>
              <Text style={{ width:"30%",color: "#212121", fontSize: 15,margin:3,textAlign: 'right',paddingRight:30 }}>{this.state.tranID}</Text>
             </View>
             <View style={{flexDirection: 'row'}}>
              <Text style={{ width:"60%",color: "#212121", fontSize: 15,margin:3 }}>Mô tả</Text>
              <Text style={{ width:"40%",color: "#212121", fontSize: 15,margin:3,textAlign: 'right',paddingRight:30 }}>{this.state.description}</Text>
             </View>
            </View>
            <View style={styles.buttonSuccess}>
              <TouchableOpacity onPress={() => {
                store.dispatch({
                  type: "UNPOPUP_TRANSACTION"
                })
                this.setState({ popupTrans: false })
              } }>
                <View style={{padding:5}}>
                 <Text style={{color:"white",fontSize:16}}>Đóng</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
      </Modal>
    )
  }


  componentDidMount() {
    hasPermission();
    onTokenRefreshListener();
    onMessageListener();
    if(isFirstTimeUsing()) this._toggleModal();
    onListenerData().then(val => {     
      if(val == 1)  {
        console.log("blockkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk");
        this.props.navigation.navigate("SignOutScreen"); // blocked
        Toast.show({ text: 'Sorry you was BLOCKED', buttonText: 'Okay', type: "danger", position: "bottom",duration:5000 });  
      }
      else if(val == 2)  // update security pass success
        Toast.show({ text: 'Create PIN CODE success', buttonText: 'Okay', type: "success", position: "center",duration:3000 });  
    });

  }

  _onFulfill (code) {
    register_PIN(code).then( data => {
      if(data.status == 0) {
        // update database offline:
        updateIsFirstTime(data.id).then( () => {
          // alert(JSON.stringify(queryUser()));
          this._toggleModal();
          
        }).catch(err => alert(err));
      }
    });    
  }

  componentWillReceiveProps(nextProps) {
    console.log("next props is " + JSON.stringify(nextProps));
    if(nextProps.userData.money )
      this.setState({
        moneyUser: nextProps.userData.money
      })

    if(nextProps.popupTrans.trans == true) {
      this.setState({
        popupTrans: true,
        tranID: nextProps.popupTrans.tranID,
        money: nextProps.popupTrans.money,
        description:  nextProps.popupTrans.description
      })
    }
  }

  componentWillUnmount() {   
    //AppStateRemoveEventListener();
    onTokenRefreshListener();
    onMessageListener();
  }

  _renderPinCode() {
    return (
      <Modal isVisible={this.state.isModalVisible}  
        // animationIn="slideInLeft"
        // animationOut="slideOutRight"
        // onSwipe={() => this.setState({ isModalVisible: null })}
        swipeDirection="down"
        scrollTo={this.handleScrollTo}
        scrollOffset={this.state.scrollOffset}
        scrollOffsetMax={400 - 300} // content height - ScrollView height
        style={styles.bottomModal}
        >
        <View style={{  
          // paddingVertical: 50,
          // paddingHorizontal: 20,
          backgroundColor: '#E0F8F1',
          // backgroundColor: "white",
          height:"35%" ,
          justifyContent: "center",
          alignItems: "center",
          borderRadius: 4,
          borderColor: "rgba(0, 0, 0, 0.1)" }}
        >
          <PIN
            type = "create"
            ref="codeInputRef1"
            secureTextEntry
            activeColor='rgba(49, 180, 4, 1)'
            inactiveColor='rgba(49, 180, 4, 1.3)'
            autoFocus={true}
            size={50}
            onFulfill={(code) => this._onFulfill(code)}
            containerStyle={{ marginTop: 30 }}
            codeInputStyle={{ borderWidth: 1.5 }}
          />          
          {/* <TouchableOpacity onPress={this._toggleModal}>
            <Text>Hide me!</Text>
          </TouchableOpacity> */}
        </View>
      </Modal>
    );
  };

  _renderHome() {
    const formatCurr = formatCurrency(this.state.moneyUser);
    return(
      <ScrollView style={{backgroundColor: "white"}} >
        <View style = {{ flex:1}}>
          
          {/*  */}
          {/* <HomeSearchBar/> */}
          {/*  */}
          <View style = { styles.mainTopWrapper  }>
            <HomeTop 
              _onPress = { this.navigatePayScan.bind(this) }
              iconType = "MCIcons"
              iconName = "qrcode-scan"
              text = "QR Pay"
              />

            <HomeTop 
              _onPress = { this.navigatePayScan.bind(this) }
              iconType = "Zocial"
              iconName = "bitcoin"
              text = { formatCurr }
            />

            <HomeTop 
              _onPress = { this.navigatePayScan.bind(this) }
              iconType = "MCIcons"
              iconName = "credit-card-scan"
              text = "Connect"
            />

          </View>
          {/*  */}
          <View style = { styles.promotionwrapper }>
            <HomePromotionSwiper data = { this.state.data} />
          </View>  

          {/*  */}

          <View style = {{ 
            flex:1,
            backgroundColor: "white"
            }}
          >
          {/* flat list => split new class */}
            <View style = {{ height: 120, flexDirection: "row" ,marginTop:20}}>
              <TouchableOpacity onPress = { () => this.props.navigation.push('RechargeScreen') } style = {{ flex: 1 }}>
                <View style = {{ justifyContent : "center", alignItems : "center", flex: 1,borderColor:"#9e9e9e",borderRightWidth:1,borderTopWidth:1 }}>
                <MCIcons
                name='cellphone-arrow-down'
                color='#3b5998'
                style={{width: '100%', justifyContent: 'center',alignItems: 'center',textAlign:'center'}}
                size={45}
                />
                  <Text style = {{ color:"black"}}>Recharge</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity onPress = { () => this.props.navigation.push('TransferScreen') } style = {{flex: 1}}>
                <View style = {{ justifyContent : "center", alignItems : "center", flex: 1,borderColor:"#9e9e9e",borderRightWidth:1,borderTopWidth:1 }}>
                <Ionicons
                  name='ios-repeat'
                  color='#3b5998'
                  
                  style={{width: '100%', justifyContent: 'center',alignItems: 'center',textAlign:'center'}}
                  size={50}/>
                  <Text style = {{ color:"black"}}>Transfer</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity style = {{ flex: 1 }} >
                <View style = {{ justifyContent : "center", alignItems : "center",borderColor:"#9e9e9e",borderColor:"#9e9e9e",borderRightWidth:1,borderTopWidth:1 , flex: 1}}>
                  <Text>receive</Text>
                </View>
              </TouchableOpacity>
            </View>
            <View style = {{ height: 120, flexDirection: "row"}}>
              <TouchableOpacity style = {{ flex: 1}}>
                <View style = {{ justifyContent : "center", alignItems : "center",borderColor:"#9e9e9e",borderColor:"#9e9e9e",borderRightWidth:1,borderTopWidth:1  ,flex: 1}}>
                  <Text>phone card</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity style = {{flex: 1}}>
                <View style = {{ justifyContent : "center", alignItems : "center",borderColor:"#9e9e9e",borderRightWidth:1,borderTopWidth:1 , flex: 1}}>
                  <Text>bill</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity style = {{ flex: 1}}>
                <View style = {{ justifyContent : "center", alignItems : "center",borderColor:"#9e9e9e",borderRightWidth:1,borderTopWidth:1 , flex: 1}}>
                  <Text>movie ticket</Text>
                </View>
              </TouchableOpacity>
            </View>
            <View style = {{ height: 120, flexDirection: "row",marginBottom:10}}>
              <TouchableOpacity style = {{ flex: 1}}>
                <View style = {{ justifyContent : "center", alignItems : "center",borderColor:"#9e9e9e",borderRightWidth:1,borderTopWidth:1,borderBottomWidth:1 , flex: 1}}>
                  <Text>air ticket</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity style = {{flex: 1}}>
                <View style = {{ justifyContent : "center", alignItems : "center",borderColor:"#9e9e9e",borderRightWidth:1,borderTopWidth:1,borderBottomWidth:1 , flex: 1}}>
                  <Text>...</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity style = {{ flex: 1}}>
                <View style = {{ justifyContent : "center", alignItems : "center",borderColor:"#9e9e9e",borderRightWidth:1,borderTopWidth:1 ,borderBottomWidth:1 , flex: 1}}>
                  <Text>...</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    )
  }

  render() {
    return (
      <View style = {{ flex:1 }}>
        { this._renderHome() }
        { this._renderPinCode() }
        { this._renderReceiveTransaction() }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainTopWrapper : {
    height:impHeight, 
    backgroundColor: "#1aa3ff", 
    justifyContent: "space-around", 
    alignItems: "center" ,
    flexDirection: "row",
    borderBottomWidth:4,
    borderTopWidth:2,
    borderColor:"white"
  },
  promotionwrapper: {
    height:promoHeight, 
    backgroundColor: "green"     
  },
  bottomModal: {
    justifyContent: "flex-end",
    margin: 0
  },
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

const mapStateToProps = state => ({
  userData: state.updatedataReducer,
  popupTrans: state.popupTransReducer
});

export default connect(mapStateToProps)(Home);