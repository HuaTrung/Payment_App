import React, { Component } from 'react';
import { View, Button } from 'react-native';    

class Terms extends Component {

    static navigationOptions = ({ navigation, navigationOptions }) => {
        return{
            headerStyle: {},
            headerTitle: 'Terms of use'
        };
    };

    
    render() {
        return (
            <View style = {{ flex: 1 }}>

            </View>
        );
    }
}

export default Terms;