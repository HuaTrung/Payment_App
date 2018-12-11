import React, { Component } from 'react';
import { 
  View, 
  TouchableOpacity,
  StyleSheet,
  Text,
  ImageBackground
} from 'react-native';

import Swiper from "react-native-swiper";

class HomePromotionSwiper extends Component {

  constructor(props) {
    super(props);
    // alert(JSON.stringify(this.props));
  }

  render() {
    return (
      <Swiper showsButtons = {true}>
        {
          this.props.data.map((item, key) => {
          return (
            <View key={key} style = {{ flex: 1, justifyContent : "center", alignItems : "center", backgroundColor: "#9dd6eb" }}>
             <ImageBackground source={{uri:"http://res.cloudinary.com/dzzyu5ejs/image/upload/Promotion.jpg"}} style={styles.backgroundImage}></ImageBackground>
            </View>
          )})  
        }
      </Swiper>
    );
  }
}

const styles = StyleSheet.create({
  backgroundImage:{
    flex:1,
    alignItems:'center',
    justifyContent:'center',
    width:"100%",
    height:"100%"
  }
})

export default HomePromotionSwiper;