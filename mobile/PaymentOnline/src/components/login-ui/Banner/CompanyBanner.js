import React, { Component } from 'react';
import { ImageBackground, Image, StyleSheet, Dimensions,View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const bannerImage = require('../../../assets/companybanner.jpg');
const comapnyLogo = require('../../../assets/companylogo.png');

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
companyBannerHeight = (height / 4);
companyIconWidth = (width * 52) / 100;
export default class CompanyBanner extends Component {
  constructor() {
    super();
  
  }

  render() {
    return (
      <View>
        <ImageBackground
          source={bannerImage}
          style={styles.background}
        >
          <Image source={comapnyLogo} resizeMode="contain" style={styles.icon} />
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  background: {
    width, height: companyBannerHeight, alignItems: 'center', justifyContent: 'center',
  },
  icon: {
    position: 'absolute', width: companyIconWidth //, tintColor: mainThemeColor,
  },
});