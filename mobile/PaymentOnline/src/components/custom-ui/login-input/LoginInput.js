import React from 'react';
import PropTypes from 'prop-types';
import {
  Animated,
  TextInput,
  TouchableWithoutFeedback,
  View,
  StyleSheet,
  Text
} from 'react-native';

import BaseInput from '../BaseInput';




export default class LoginInput extends BaseInput {


  render() {
    const {
      label,
      style: containerStyle,
      height: inputHeight,
      inputStyle,
      labelStyle,
      securePassword,
      errorStyle,
      errorMessage,
      slideColor,
      errorSlideColor,
      LABEL_HEIGHT,
      PADDING
    } = this.props;
    const { width, focusedAnim, value } = this.state;



    return (
      <View>
                
        <View
          style={[
            styles.container,
            containerStyle,
            {
              height: inputHeight,
         //     backgroundColor: 'red'
            }
          ]}
          onLayout={this._onLayout}
        >
          <TouchableWithoutFeedback onPress={this.focus}>
            <Animated.View
              style={{
                position: 'absolute',
                bottom: focusedAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, LABEL_HEIGHT],
                }),
              }}
            >
              <Animated.Text
                ref = 'text'
                style={[
                  styles.label,                
                  labelStyle,
                  {                                    
                    fontSize: focusedAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [16, 11],
                    }),
                    color: focusedAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: ['#b8b894', '#1a75ff'],
                    })
                  },
                ]}
              >
                {label}
              </Animated.Text>
            </Animated.View>
          </TouchableWithoutFeedback>
          <TextInput
            ref="input"
            {...this.props}
            style={[
              styles.textInput,
              inputStyle,
              {
                width,
                height: inputHeight /1.5,
                paddingTop: PADDING / 4
              },
            ]}
            value={value}
            secureTextEntry = {securePassword}
            onBlur={this._onBlur}
            onChange={this._onChange}
            onFocus={this._onFocus}
            underlineColorAndroid="rgba(0,0,0,0)"
          />

          {/* bottom border */}
          <View
            style={{            
              flex: 1,  
              position: 'absolute',
              bottom: 5,
              right: 0,
              height: 1,
              width,
              backgroundColor: errorMessage ? errorSlideColor :  slideColor,
            }}
          />
        </View>
        {errorMessage && (
        <View style = {{ height: 10 }}>
          <Text style={[styles.error, errorStyle]}>
            {errorMessage}
          </Text>
        </View>
        
        )}
        
      </View>
    );
  }
}

LoginInput.propTypes = {
  height: PropTypes.number,
  securePassword: PropTypes.bool,
  
  errorStyle: Text.propTypes.style,
  errorMessage: PropTypes.string,

  slideColor: PropTypes.string,
  errorSlideColor: PropTypes.string,

  LABEL_HEIGHT: PropTypes.number,
  PADDING:PropTypes.number,
};

LoginInput.defaultProps = {
  iconColor: 'white',
  height: 48,
  animationDuration: 300,
  iconName: 'pencil',
  securePassword: false,
  slideColor: '#1a75ff',
  errorSlideColor: '#FF2D00',
  LABEL_HEIGHT: 24,
  PADDING: 10
};

const styles = StyleSheet.create({
  container: {
  //  overflow: 'hidden',
  },
  label: {
    marginBottom: 7,
    backgroundColor: 'transparent'
  },
  textInput: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    paddingLeft: 0,
    fontSize: 16,
  },
  error: {
    color: '#FF2D00',
    fontSize: 12,
  },
});
