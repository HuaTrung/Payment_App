import React, { Component } from 'react';
import { 
  View, 
  TouchableOpacity,
  Dimensions,
  Text
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
              <Text>{item}</Text>
            </View>
          )})  
        }
      </Swiper>
    );
  }
}


export default HomePromotionSwiper;