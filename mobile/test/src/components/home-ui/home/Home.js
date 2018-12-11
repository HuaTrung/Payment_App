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
  updateMoney
} from "../../../realm/userQueries";
import {register_PIN} from "../../../no-redux/securityPIN";
import firebase from "react-native-firebase";
import {
  appStateAddEventListener,
  AppStateRemoveEventListener,
  hasPermission,
  messageListener,
  onTokenRefreshListener,
  onListenerData
} from "../../../no-redux/notification";
import { connect } from "react-redux";
import { updateUserMoney } from "../../../redux/actions/updateUser.action";
import isEmpty from "../../../validations/is-empty.validate";
class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data: ["Promotion 1","Promotion 2","Promotion 3","Promotion 4"],
      isModalVisible: false,
      moneyUser:queryUserMoney()
    }

    this._renderHome = this._renderHome.bind(this);
    this._renderPinCode = this._renderPinCode.bind(this);
    this._toggleModal = this._toggleModal.bind(this);
    this._onFulfill = this._onFulfill.bind(this);
    this._handleUpdateMoney = this._handleUpdateMoney.bind(this);
  }

  navigatePayScan() {
    this.props.navigation.push('PayScanScreen')
  }

  _toggleModal() {
    this.setState({ isModalVisible: !this.state.isModalVisible });
  }

  _handleUpdateMoney (data) {
    this.props.updateUserMoney(data);
  }

  componentDidMount() {
    //appStateAddEventListener();
    hasPermission();
    onTokenRefreshListener();
    messageListener().then( val => {
      if(val == true)  this.props.navigation.navigate("SignOutScreen");
    })
    if(isFirstTimeUsing()) this._toggleModal();

    firebase.database().ref("user/" + queryUserId()).on("child_changed", function(snapshot, prevChildKey) {
      console.log("____________________")
      console.log("Key: " + snapshot.key+" and "+snapshot.val() );
      if(snapshot.key=="money")
        updateMoney(snapshot.val()).then( value=>{
          // console.log(JSON.stringify(value));
          this._handleUpdateMoney(value);
        });
    });
  }

  _onFulfill (code) {
    register_PIN(code).then( data => {
     alert(JSON.stringify(data));
      if(data.status == 0) {
        // update database offline:
        updateIsFirstTime(data.id).then( () => {
          // alert(JSON.stringify(queryUser()));
          this._toggleModal();
          Toast.show({ text: 'Create PIN CODE success', buttonText: 'Okay', type: "success", position: "top",duration:2000 });  
        }).catch(err => alert(err));
      }
    });    
  }

  componentWillReceiveProps(nextProps) {
    console.log(JSON.stringify(nextProps));
    if(!isEmpty(nextProps.money)) {
      this.setState({
        moneyUser:money
      })
    }
  }

  componentWillUnmount() {   
    //AppStateRemoveEventListener();
    onTokenRefreshListener();
    messageListener().then( val => {
      if(val == true)  this.props.navigation.navigate("SignOutScreen");
    })  
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
              iconType = "FontAwesome5"
              iconName = "teamspeak"
              text = {this.state.moneyUser}
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
        {  this._renderHome() }
        { this._renderPinCode() }
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
  }
})

const mapStateToProps = state => ({
  money: state.updatedataReducer
});

export default connect(mapStateToProps,{
  updateUserMoney
})(Home);