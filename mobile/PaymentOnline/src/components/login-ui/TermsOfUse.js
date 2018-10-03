import React, { Component } from 'react';
import { View, Button } from 'react-native';    

class Terms extends Component {

    static navigationOptions = ({ navigation, navigationOptions }) => {
        return{
            headerStyle: {
                backgroundColor:'#42A5F5DC',
                height: 40
            },
            headerTitle: 'Terms of use',
            headerTintColor: 'white'
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