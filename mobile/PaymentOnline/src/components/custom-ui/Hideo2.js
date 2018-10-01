import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { 
    Animated, 
    Text, 
    View, 
    ViewPropTypes , 
    TextInput,
    TouchableOpacity,
    StyleSheet
} from 'react-native';

export default class Hideo extends Component {
    
    constructor(props) {
        super(props);
        this._onChange = this._onChange.bind(this);
        this._onBlur = this._onBlur.bind(this);
        this._onFocus = this._onFocus.bind(this);

        const value = props.value || props.defaultValue;
        this.state = {
          inputRef: null,
          value,
          focusedAnim: new Animated.Value(0),
        };
    }

    componentWillReceiveProps(newProps) {
        const newValue = newProps.value;        
        // TODO: improve performance
        if (newProps.hasOwnProperty('value') && newValue !== this.state.value) {
          this.setState({
            value: newValue,
          });
      }
    }

    _toggle(isActive) {
        // Config for animation timing
        const { animationDuration, easing, useNativeDriver } = this.props;
        this.isActive = isActive;
        Animated.timing(this.state.focusedAnim, {
          toValue: isActive ? 1 : 0,
          duration: animationDuration,
          easing,
          useNativeDriver,
        }).start();
    }

    _onFocus(event) {
        // animated
        this._toggle(true);
    
        const onFocus = this.props.onFocus;
        if (onFocus) {
          onFocus(event);
        }
    }

    _onChange(event) {
        this.setState({
          value: event.nativeEvent.text,
        });
    
        const onChange = this.props.onChange;
        if (onChange) {
          onChange(event);
        }
    }

    
  _onBlur(event) {
//    if (!this.state.value) {
      this._toggle(false);
  //  }

    const onBlur = this.props.onBlur;
    if (onBlur) {
      onBlur(event);
    }
  }

    focusTextInput() {
     //   alert(this.state.inputRef);
        this.state.inputRef._root.focus();
    }

    render() {
        const {
          iconClass,
          iconColor,
          iconSize,
          iconName,
          iconBackgroundColor,
          style: containerStyle,
          inputStyle,
          height: inputHeight,
        } = this.props;
        const {
          focusedAnim,
          value,
        } = this.state;
        const AnimatedIcon = Animated.createAnimatedComponent(iconClass);
    
        return (
            <TouchableOpacity onPressIn = { this.focusTextInput }>
        <View
            style={[styles.container, containerStyle]}
            // onLayout={this._onLayout}
          >
          
            <Animated.View
              style={{
                backgroundColor: iconBackgroundColor,
                justifyContent: 'center',
                alignItems: 'center',
                height: inputHeight,
                width: focusedAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [60, 40],
                }),
            }}
            >
            <AnimatedIcon
                name={iconName}
                color={iconColor}
                style={{
                fontSize: focusedAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [iconSize, iconSize * 0.6],
                }),
                }}
            />
            </Animated.View>
            <TextInput
              ref= { (ref) => { this.state.inputRef = ref; } }
              {...this.props}
              style={[styles.textInput, inputStyle]}
              value={value}
              onBlur={this._onBlur}
              onChange={this._onChange}
              onFocus={this._onFocus}
              underlineColorAndroid={'transparent'}
            />       
              
          </View>
          </TouchableOpacity>  
          
        );
    }
}


Hideo.propTypes = {
    /*
     * this is applied as background color of icon
     */
    iconBackgroundColor: PropTypes.string,

    /*
     * This is the icon component you are importing from react-native-vector-icons.
     * import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
     * iconClass={FontAwesomeIcon}
     */
    iconClass: PropTypes.func.isRequired,
    /*
     * Passed to react-native-vector-icons library as name prop
     */
    iconName: PropTypes.string.isRequired,
    /*
     * Passed to react-native-vector-icons library as color prop
     */
    iconColor: PropTypes.string,
    /*
     * Passed to react-native-vector-icons library as size prop.
     */
    iconSize: PropTypes.number,
   
  
    value: PropTypes.string,
    defaultValue: PropTypes.string,
    style: ViewPropTypes ? ViewPropTypes.style : View.propTypes.style,
    inputStyle: Text.propTypes.style,
    
    easing: PropTypes.func,
    animationDuration: PropTypes.number,
    useNativeDriver: PropTypes.bool,

    editable: PropTypes.bool,

    /* those are TextInput props which are overridden
    * so, i'm calling them manually
    */
    onBlur: PropTypes.func,
    onFocus: PropTypes.func,
    onChange: PropTypes.func
};

Hideo.defaultProps = {
    iconColor: 'white',
    iconSize: 25,
    iconBackgroundColor: '#899dda',
    height: 48,
    animationDuration: 200,
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'row',
    },
    textInput: {
      flex: 1,
      paddingHorizontal: 16,
      paddingVertical: 0,
      color: 'black',
      backgroundColor: 'white',
      fontSize: 18,
    },
  });
  