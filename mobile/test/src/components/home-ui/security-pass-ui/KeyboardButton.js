import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {colors} from "./color";
import Icon from 'react-native-vector-icons/MaterialIcons'
import { View,Text, StyleSheet, TouchableHighlight, TouchableOpacity} from 'react-native';
import isEmpty from '../../../validations/is-empty.validate';

import { onKeyboardButtonClick, onKeyboardButtonDeleteClick } from "../../../redux/actions/security.action";

import { connect } from "react-redux";

class KeyboardButton extends Component { 

  constructor(props) {
    super(props);
    this.state = {
      pressed: false,
      colorDelete: "rgb(211, 213, 218)",
      delDisable: true
    };
    this._onKeyboardPressIn = this._onKeyboardPressIn.bind(this);
    this._onKeyboardPressOut = this._onKeyboardPressOut.bind(this);
    this._onKbDeletePressIn = this._onKbDeletePressIn.bind(this);
    this._onKbDeletePressOut = this._onKbDeletePressOut.bind(this);
    this._renderButton = this._renderButton.bind(this);
    this._onButtonPress = this._onButtonPress.bind(this);
    this._onButtonDeletePress = this._onButtonDeletePress.bind(this);
  }
  
  _onKeyboardPressIn() {
    this.setState({ pressed: true });
  }

  _onKeyboardPressOut() {
    this.setState({ pressed: false});
  }

  _onKbDeletePressIn() {
    this.setState({ colorDelete: colors.kbPress });
  }

  _onKbDeletePressOut() {
    this.setState({ colorDelete: "rgb(211, 213, 218)" });
  }

  _onButtonPress() {
    this.props.onKeyboardButtonClick(this.props.number);
  }

  _onButtonDeletePress() {
    this.props.onKeyboardButtonDeleteClick();
  }

  componentWillReceiveProps(nextProps){
    if(!isEmpty(nextProps.security)) {
      this.setState({ delDisable: nextProps.security.password == "" });
    }
  }
  

  _renderButton () {
    const { pressed, delDisable } = this.state;
    const { number, onpressButton } = this.props;
    switch (number) {
      case "_XX":
        return (
          <TouchableHighlight
          disabled = {delDisable }
            style = {{ 
              flex:1,
              alignItems: "center", 
              justifyContent: "center"
            }}
            onPress={ this._onButtonDeletePress }
            underlayColor="transparent"
            onShowUnderlay = { this._onKbDeletePressIn }
            onHideUnderlay = { this._onKbDeletePressOut }
          >
            <Icon
              name='backspace'
              size ={30}
              color={this.state.colorDelete}
            />
          </TouchableHighlight>
        )
      case "": return null;
      default :
        return (
          <TouchableHighlight  onPress={ this._onButtonPress } onShowUnderlay = { this._onKeyboardPressIn } underlayColor = {colors.kbPress} onHideUnderlay = { this._onKeyboardPressOut } style = {{ 
            backgroundColor: colors.kbUnpress, 
            flex:1,
            alignItems: "center", 
            justifyContent: "center", 
            borderRadius: 100
          }}>
            <Text style = {{ fontSize: 28, fontWeight:'200', color: pressed ? colors.txColorPress : colors.txColorUnpress }} >{ number }</Text>
          </TouchableHighlight> 
        )
    }
  }

  render() {
    const { number } = this.props;
    return( 
      <View style = {{ height: 65, width:65 }}>
        {
          this._renderButton()                      
        }
      </View>
    );
  }
}


KeyboardButton.propTypes = {
  number: PropTypes.string,
  deleteNumber: PropTypes.bool,
}

KeyboardButton.defaultProps = {
  deleteNumber: false
}

const mapStateToProps = state => ({
  security: state.securityPasswordReducer
});

export default connect(mapStateToProps, 
  {
    onKeyboardButtonClick,
    onKeyboardButtonDeleteClick
  }
)(KeyboardButton);