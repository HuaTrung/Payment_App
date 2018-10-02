import React, { Component } from 'react';
import { View, Button } from 'react-native';    

class Terms extends Component {

    static navigationOptions = {
        title: 'Terms of use',
        headerRight: (
            <Button
              onPress={() => alert('This is a button!')}
              title="Info"
              color="#fff"
            />
        )
    };

    constructor(props) {
        super(props);
        this.state = {  };
    }
    render() {
        return (
            <View style = {{ flex: 1 }}>

            </View>
        );
    }
}

export default Terms;