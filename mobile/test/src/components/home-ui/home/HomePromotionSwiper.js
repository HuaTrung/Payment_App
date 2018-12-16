import React, { Component } from 'react';
import { 
  View, 
  TouchableOpacity,
  StyleSheet,
  Text,
  ImageBackground
} from 'react-native';

import Swiper from "react-native-swiper";
import { searchPromotion } from '../../../no-redux/search'
import { connect } from "react-redux";


class HomePromotionSwiper extends Component {

  constructor(props) {
    super(props);
    this.state = {
      listPromotion: []
    };
    searchPromotion().then((status) => {
      this.setState({
        listPromotion: status.listPromotion});
    });
  }

  render() {
    const { listPromotion } = this.state;
    const options = [];
    for (let i =0; i<listPromotion.length;i++) {
      console.log(listPromotion[i]);
      options.push(<View style = {{ flex: 1, justifyContent : "center", alignItems : "center", backgroundColor: "#9dd6eb" }}>
      <ImageBackground source={{uri:listPromotion[i].Image}} style={styles.backgroundImage}></ImageBackground>
     </View>)
    }
    return (
      <Swiper showsButtons={true} autoplay={true} autoplayTimeout={2}>
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#9dd6eb" }}>
          <ImageBackground source={{ uri: "https://res.cloudinary.com/dzzyu5ejs/image/upload/Promotion2.png" }} style={styles.backgroundImage}></ImageBackground>
        </View>
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#9dd6eb" }}>
          <ImageBackground source={{ uri: "https://res.cloudinary.com/dzzyu5ejs/image/upload/Promotion3.png" }} style={styles.backgroundImage}></ImageBackground>
        </View>
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#9dd6eb" }}>
          <ImageBackground source={{ uri: "https://res.cloudinary.com/dzzyu5ejs/image/upload/Promotion4.png" }} style={styles.backgroundImage}></ImageBackground>
        </View>
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