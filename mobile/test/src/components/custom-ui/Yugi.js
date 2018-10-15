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

import BaseInput from './BaseInput';




export default class Yugi extends BaseInput {


  render() {
    const {
      iconClass,
      iconColor,
      iconName,
      label,
      style: containerStyle,
      height: inputHeight,
      inputStyle,
      labelStyle,
      securePassword,
      errorStyle,
      errorMessage,
      slideColor,
      LABEL_HEIGHT,
      PADDING
    } = this.props;
    const { width, focusedAnim, value } = this.state;
    const AnimatedIcon = Animated.createAnimatedComponent(iconClass);

    return (
      <View>
                
        <View
          style={[
            styles.container,
            containerStyle,
            {
              height: inputHeight + PADDING,
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
                  outputRange: [0, LABEL_HEIGHT + PADDING],
                }),
              }}
            >
              <Animated.Text
                style={[
                  styles.label,                
                  labelStyle,
                  {                                    
                    fontSize: focusedAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [18, 14],
                    }),
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
                height: inputHeight,
                paddingTop: PADDING / 2
              },
            ]}
            value={value}
            secureTextEntry = {securePassword}
            onBlur={this._onBlur}
            onChange={this._onChange}
            onFocus={this._onFocus}
            underlineColorAndroid="rgba(0,0,0,0)"
          />

          <TouchableWithoutFeedback onPress={this.focus}>
            <AnimatedIcon
              name={iconName}
              color={iconColor}
              style={{
                marginBottom: 10,
                position: 'absolute',
                bottom: 0,
                right: focusedAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, width + PADDING],
                }),
                transform: [
                  {
                    rotate: focusedAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: ['0deg', '-90deg'],
                    }),
                  },
                ],
                fontSize: 20,
                backgroundColor: 'transparent',
              }}
            />
          </TouchableWithoutFeedback>
          {/* bottom border */}
          <Animated.View
            style={{
              position: 'absolute',
              bottom: 0,
              right: 0,
              height: 1,
              width: focusedAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [0, width],
              }),
              backgroundColor: errorMessage ? slideColor: iconColor,
            }}
          />
        </View>
        <View style = {{ height: 15 }}>
          {/* Error label */}
          {errorMessage && (
            <Text style={[styles.error, errorStyle]}>
              {errorMessage}
            </Text>
          )}
        
        </View>
      </View>
    );
  }
}

Yugi.propTypes = {
  height: PropTypes.number,
  /*
   * This is the icon component you are importing from react-native-vector-icons.
   * import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
   * iconClass={FontAwesomeIcon}
   */
  iconClass: PropTypes.func.isRequired,
  /*
   * Passed to react-native-vector-icons library as name prop
   */
  iconName: PropTypes.string,
  /*
   * Passed to react-native-vector-icons library as color prop.
   * This is also used as border color.
   */
  iconColor: PropTypes.string,

  securePassword: PropTypes.bool,
  
  errorStyle: Text.propTypes.style,
  errorMessage: PropTypes.string,

  slideColor: PropTypes.string,
  errorSlideColor: PropTypes.string,

  LABEL_HEIGHT: PropTypes.number,
   PADDING:PropTypes.number,
};

Yugi.defaultProps = {
  iconColor: 'white',
  height: 48,
  animationDuration: 300,
  iconName: 'pencil',
  securePassword: false,
  slideColor: '#FF2D00',
  LABEL_HEIGHT: 24,
  PADDING: 10
};

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
  },
  label: {
    marginBottom: 5,
    backgroundColor: 'transparent'
  },
  textInput: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    paddingLeft: 0,
    fontSize: 18,
  },
  error: {
    color: '#FF2D00',
    fontSize: 12,
  },
});
