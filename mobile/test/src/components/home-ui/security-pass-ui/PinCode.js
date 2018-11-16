import React, { Component } from 'react';
import { View, StyleSheet, Text} from 'react-native';
import isEmpty from '../../../validations/is-empty.validate';
import { connect } from "react-redux";

class PinCode extends Component { 

  constructor(props) {
    super(props);
    this.state = {
      password: ""
    };
  }

  componentWillReceiveProps(nextProps){
    if(!isEmpty(nextProps.security)) {
      this.setState({ password: nextProps.security.password });
    }
  }
  
  render() {
    const { password } = this.state;
    return(
      <View style={{ height: 50, flexDirection: "row", alignItems: 'flex-end', justifyContent: 'center' }}>
        <View style={password.length > 0 ? styles.circleRounded : styles.circle} />
        <View style={password.length > 1 ? styles.circleRounded : styles.circle} />
        <View style={password.length > 2 ? styles.circleRounded : styles.circle} />
        <View style={password.length > 3 ? styles.circleRounded : styles.circle} />
        <View style={password.length > 4 ? styles.circleRounded : styles.circle} />
        <View style={password.length > 5 ? styles.circleRounded : styles.circle} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  circle: {
    marginTop: 20, 
    marginBottom: 20,
    marginLeft: 15,
    width: 15,
    height: 15,
    borderRadius: 100 / 2,
    backgroundColor: 'white',
    borderWidth: 1.5,
    borderColor: '#A9E0E1',
  },
  circleRounded: {
    marginTop: 20,
    marginBottom: 20,
    marginLeft: 15,
    width: 15,
    height: 15,
    borderRadius: 100 / 2,
    backgroundColor: '#6EC7C9',
    borderWidth: 1.5,
    borderColor: '#6EC7C9',
  }
});

const mapStateToProps = state => ({
  security: state.securityPasswordReducer,
});

export default connect(mapStateToProps)(PinCode);