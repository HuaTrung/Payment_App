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

import HomeTop from "./HomeTop";

import {HomSearch} from "../../../navigation-config/Route";

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

  render() {
    return (
      <ScrollView >
        <View style = {{ flex:1 }}>
          <StatusBar backgroundColor = "#1aa3ff" />
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
              <TouchableOpacity style = {{ flex: 1, margin: 10}}>
                <View style = {{ justifyContent : "center", alignItems : "center", backgroundColor: "#4d79ff", flex: 1}}>
                  <Text>send gift</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity style = {{flex: 1, margin: 10}}>
                <View style = {{ justifyContent : "center", alignItems : "center", backgroundColor: "#4d79ff", flex: 1}}>
                  <Text>transfer</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity style = {{ flex: 1 , margin: 10}}>
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