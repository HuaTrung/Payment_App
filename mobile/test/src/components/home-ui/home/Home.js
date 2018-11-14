import React, { Component } from 'react';
import { 
  View, 
  Text,
  StyleSheet, 
  Dimensions, 
  StatusBar, 
  TextInput, 
  TouchableOpacity,
  ScrollView
} from 'react-native';

import Swiper from "react-native-swiper";
import HomeSearchBar from "./HomeSearchBar";
import HomePromotionSwiper from "./HomePromotionSwiper"
const { width, height } = Dimensions.get('window');
const searchHeight = height / 13;
const impHeight = height / 8;
const promoHeight = height / 4;
import MCIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Ionicons from "react-native-vector-icons/Ionicons";

import HomeTop from "./HomeTop";

import {HomSearch} from "../../../navigation-config/Route";

import { queryUSerMoney, isEmptyUserLogin } from "../../../realm/userQueries";

class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data: ["Promotion 1","Promotion 2","Promotion 3","Promotion 4"]
    }
  }

  navigatePayScan() {
    this.props.navigation.push('PayScanScreen')
  }

  componentWillMount() {
    let data = queryUSerMoney();
    alert(JSON.stringify(data)); 
    // alert(isEmptyUserLogin());
  }

  render() {
    return (
      <ScrollView >
        <View style = {{ flex:1 }}>
          
          {/*  */}
          <HomeSearchBar/>
          {/*  */}
          <View style = { styles.mainTopWrapper }>
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
              text = "123,456 VND"
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
            backgroundColor: "white", 
            }}
          >
          {/* flat list => split new class */}
            <View style = {{ height: 100, flexDirection: "row" }}>
              <TouchableOpacity onPress = { () => this.props.navigation.push('RechargeScreen') } style = {{ flex: 1, margin: 10}}>
                <View style = {{ justifyContent : "center", alignItems : "center", flex: 1}}>
                <MCIcons
                name='cellphone-arrow-down'
                color='#3b5998'
                style={{width: '100%', justifyContent: 'center',alignItems: 'center',textAlign:'center'}}
                size={45}
                />
                  <Text style = {{ color:"black"}}>Recharge</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity style = {{flex: 1, margin: 10}}>
                <View style = {{ justifyContent : "center", alignItems : "center", flex: 1}}>
                <Ionicons
                  name='ios-repeat'
                  color='#3b5998'
                  
                  style={{width: '100%', justifyContent: 'center',alignItems: 'center',textAlign:'center'}}
                  size={50}/>
                  <Text style = {{ color:"black"}}>Transfer</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity style = {{ flex: 1 , margin: 10}}  >
                <View style = {{ justifyContent : "center", alignItems : "center", backgroundColor: "#4d79ff", flex: 1}}>
                  <Text>receive</Text>
                </View>
              </TouchableOpacity>
            </View>
            <View style = {{ height: 100, flexDirection: "row" }}>
              <TouchableOpacity style = {{ flex: 1, margin: 10}}>
                <View style = {{ justifyContent : "center", alignItems : "center", backgroundColor: "#4d79ff", flex: 1}}>
                  <Text>phone card</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity style = {{flex: 1, margin: 10}}>
                <View style = {{ justifyContent : "center", alignItems : "center", backgroundColor: "#4d79ff", flex: 1}}>
                  <Text>bill</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity style = {{ flex: 1, margin: 10}}>
                <View style = {{ justifyContent : "center", alignItems : "center", backgroundColor: "#4d79ff", flex: 1}}>
                  <Text>movie ticket</Text>
                </View>
              </TouchableOpacity>
            </View>

            <View style = {{ height: 100, flexDirection: "row" }}>
              <TouchableOpacity style = {{ flex: 1, margin: 10}}>
                <View style = {{ justifyContent : "center", alignItems : "center", backgroundColor: "#4d79ff", flex: 1}}>
                  <Text>air ticket</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity style = {{flex: 1, margin: 10}}>
                <View style = {{ justifyContent : "center", alignItems : "center", backgroundColor: "#4d79ff", flex: 1}}>
                  <Text>...</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity style = {{ flex: 1, margin: 10}}>
                <View style = {{ justifyContent : "center", alignItems : "center", backgroundColor: "#4d79ff", flex: 1}}>
                  <Text>...</Text>
                </View>
              </TouchableOpacity>
            </View>

          </View>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  mainTopWrapper : {
    height:impHeight, 
    backgroundColor: "#1aa3ff", 
    justifyContent: "space-around", 
    alignItems: "center" ,
    flexDirection: "row"  
  },
  promotionwrapper: {
    height:promoHeight, 
    backgroundColor: "green"     
  }
})

export default Home;