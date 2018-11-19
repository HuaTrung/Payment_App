import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ViewPropTypes,
} from 'react-native';
import * as Animatable from 'react-native-animatable';

class SecurityPin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      maskDelay: false,
      focused: false,
      code: "",
      checkCreate: false,
      createPinCode:""
    };

    this.shake = this.shake.bind(this);
    this.shake2 = this.shake2.bind(this);

    this.focus = this.focus.bind(this);
    this.blur = this.blur.bind(this);
    this._inputCode = this._inputCode.bind(this);
    this._keyPress = this._keyPress.bind(this);
    this._onFocused = this._onFocused.bind(this);

    this._renderCreateType = this._renderCreateType.bind(this);
    this._renderCheckType = this._renderCheckType.bind(this);
  }


  

  shake () {
    return this.refs._ref.shake(650).then(() => this.setState({ code: '' }));
  }

  shake2 () {
    return this.refs._ref.shake(650);
  }

  focus() {
    return this.refs.inputRef.focus();
  }

  blur() {
    return this.refs.inputRef.blur();
  }

  /**
   * 
   * @param code : each items in password box
   * @description ex: 1, 15, 152, 1538, ...
   */
  _inputCode(codee) {
     
    const { password, codeLength = 6, onTextChange, onFulfill, type } = this.props;
    const { checkCreate , createPinCode } = this.state;
    // Callback function that's called when the text changed
    if (onTextChange) onTextChange(codee); 

    // check input is full and we have onFulfill callback function    
    if (codee.length === codeLength && onFulfill)  {
      // mock isFirstTime login in database
      if(type != "create") onFulfill(codee, type);
      else if(type == "create" && !checkCreate) // we get create pin code:
      {
        // alert(codee);
        this.setState({createPinCode: codee, code:"", checkCreate: true });
      } else if(type == "create" && checkCreate ) {
        if(createPinCode == codee) { // re-write success
          // alert("rewrite success"); // push to server later
          this.refs._ref.shake(650).then( () => onFulfill(codee, type));
        } else this.shake();  // show the error and check again        
      } 
    } else this.setState({code:codee});

    const maskDelay = password &&
      codee.length - 1 > this.state.code.length; // only when input new char
    this.setState({ maskDelay });
    
    if (maskDelay) { // mask password after delay
      setTimeout(() => this.setState({ maskDelay: false }), 200);
}

  }

  // Callback function that's called when the input is empty and the backspace button is pressed
  _keyPress(event) {
    if (event.nativeEvent.key === 'Backspace') {
      const { value, onBackspace } = this.props;
      if (value === '' && onBackspace) onBackspace();
    }
  }

  _onFocused(focused) {
    this.setState({ focused });
  }

  _renderCreateType() {
    if(!this.state.checkCreate) {
      return (
        <Text 
          style = {{ 
            paddingBottom: 10, 
            textAlign: "center", 
            fontSize: 18, 
            color: "black", 
            flexWrap: "wrap" 
        }}>Please create your PIN CODE</Text>
      )
    }
    return (
      <Text 
        style = {{ 
          paddingBottom: 10, 
          textAlign: "center", 
          fontSize: 18, 
          color: "black", 
          flexWrap: "wrap" 
      }}>Please re-write your PIN CODE</Text>
    )
    
  }

  _renderCheckType() {
    return null;
  }

  render() {
    const {
      codeLength, cellSize, cellSpacing,
      placeholder,
      password,
      mask,
      autoFocus,
      cellStyle,
      cellStyleFocused,
      textStyle,
      textStyleFocused,
      keyboardType,
      animationFocused,
    } = this.props;
    const { maskDelay, focused, code, firstPinCode, reFirstCode, type } = this.state;
    return (
      <View style = {{ justifyContent: "center", alignItems:"center" }}>
        { type == "create" ? this._renderCreateType() : this._renderCreateType() }
        <Animatable.View
          ref="_ref"
          style={{ alignItems: 'stretch', flexDirection: 'row', justifyContent: 'center', position: 'relative', 
            width: cellSize * codeLength + cellSpacing * (codeLength - 1),
            height: cellSize,
          }}>
          <View style={{ position: 'absolute', margin: 0, height: '100%', flexDirection: 'row', alignItems: 'center'}}>
            {
              Array.apply(null, Array(codeLength)).map((_, idx) => {
                const cellFocused = focused && idx === code.length;
                const filled = idx < code.length;
                const last = idx == code.length - 1;
                return (
                  <Animatable.View key={idx}
                    style={[
                      cellStyle,
                      cellFocused ? cellStyleFocused : {},
                      {
                        width: cellSize,
                        height: cellSize,
                        marginLeft: cellSpacing / 2,
                        marginRight: cellSpacing / 2,
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }
                    ]}
                    animation={ idx === this.state.code.length && focused ? animationFocused : null }
                    iterationCount="infinite"
                    duration={10}>
                    <Text style={[ textStyle, cellFocused ? textStyleFocused : {}]}>
                      {/* { filled && (password && (!maskDelay || !last)) ? mask : this.state.code.charAt(idx) }
                      { !filled && placeholder } */}
                      { mask }
                    </Text>
                  </Animatable.View>
                );
              })
            }
          </View>
          <TextInput
            {...this.props}
            value={code}
            ref="inputRef"
            onChangeText={this._inputCode}
            onKeyPress={this._keyPress}
            onFocus={() => this._onFocused(true)}
            onBlur={() => this._onFocused(false)}
            spellCheck={false}
            autoFocus={autoFocus}
            keyboardType={keyboardType}
            numberOfLines={1}
            maxLength={codeLength}
            selection={{ start: code.length, end: code.length }}
            style={{ flex: 1,  opacity: 0, textAlign: 'center'}}/>
        </Animatable.View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  containerDefault: {

  },
  cellDefault: {
    borderColor: 'gray',
    borderWidth: 1,
  },
  cellFocusedDefault: {
    borderColor: 'black',
    borderWidth: 2,
  },
  textStyleDefault: {
    color: 'gray',
    fontSize: 24,
  },
  textStyleFocusedDefault: {
    color: 'black',
  },
});

SecurityPin.defaultProps = {
  type: "create",
  codeLength: 4,
  cellSize: 48,
  cellSpacing: 4,
  placeholder: '',
  password: false,
  mask: '*',
  keyboardType: 'numeric',
  autoFocus: false,
  cellStyle: styles.cellDefault,
  cellStyleFocused: styles.cellFocusedDefault,
  textStyle: styles.textStyleDefault,
  textStyleFocused: styles.textStyleFocusedDefault,
  animationFocused: 'pulse',
}

SecurityPin.propTypes = {

  type: PropTypes.oneOf([
    'create', 'check'
  ]),

  codeLength: PropTypes.number,
  cellSize: PropTypes.number,
  cellSpacing: PropTypes.number,

  placeholder: PropTypes.string,
  mask: PropTypes.string,
  password: PropTypes.bool,

  autoFocus: PropTypes.bool,

  cellStyle: ViewPropTypes.style,
  cellStyleFocused: ViewPropTypes.style,
  
  textStyle: Text.propTypes.style,
  textStyleFocused: Text.propTypes.style,

  animationFocused: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
  ]),

  onFulfill: PropTypes.func,
  onTextChange: PropTypes.func,
  onBackspace: PropTypes.func,

  keyboardType: PropTypes.string,
};



export default SecurityPin;
