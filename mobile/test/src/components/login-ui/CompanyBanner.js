import React, { Component } from 'react';
import { ImageBackground, Image, StyleSheet, Dimensions,View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const bannerImage = require('../../assets/companybanner.jpg');
const comapnyLogo = require('../../assets/companylogo.png');

const width = Dimensions.get('window').width;
companyIconWidth = (width * 52) / 100;

export default class CompanyBanner extends Component {

  render() {
    
    const { companyBannerHeight } = this.props;

    return (
      <View style = {{ flex: 1 }}>
        <ImageBackground
          source={bannerImage}
          style={[styles.background, {height: companyBannerHeight } ]}
        >
        <LinearGradient colors={["#42A5F5DC","#42A5F5DC"]}  style={[styles.background, {height: companyBannerHeight } ]} />
          <Image source={comapnyLogo} resizeMode="contain" style={[styles.icon , { height: companyBannerHeight }]} />
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  background: {
    width : "100%", alignItems: 'center', justifyContent: 'center',
  },
  icon: {
    position: 'absolute',  width: "100%" 
  },
});