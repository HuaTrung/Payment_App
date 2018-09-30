// import { Component } from 'react';
// import PropTypes from 'prop-types';

// import { Animated, Text, View, ViewPropTypes } from 'react-native';

// export default class Hideo extends Component {
    
//     constructor(props) {
//         super(props);
//         this.state = {
//           value,
//           focusedAnim: new Animated.Value(0),
//         };
//     }

//     componentWillReceiveProps(newProps) {
//         const newValue = newProps.value;        
//         // TODO: improve performance
//         if (newProps.hasOwnProperty('value') && newValue !== this.state.value) {
//           this.setState({
//             value: newValue,
//           });
//       }
//       // animate input if it's active state has changed with the new value
//       // and input is not focused currently.
//       const isFocused = this.refs.input.isFocused();
//       if (!isFocused) {
//         const isActive = Boolean(newValue);
//         if (isActive !== this.isActive) {
//           this._toggle(isActive);
//         }
//       }
//     }

//     /**
//      * Start animate the animation:
//      */
//     _toggle(isActive) {
//         const { animationDuration, easing, useNativeDriver } = this.props;
//         this.isActive = isActive;
//         Animated.timing(this.state.focusedAnim, {
//           toValue: isActive ? 1 : 0,
//           duration: animationDuration,
//           easing,
//           useNativeDriver,
//         }).start();
//       }

//     render() {
//         const {
//           iconClass,
//           iconColor,
//           iconSize,
//           iconName,
//           iconBackgroundColor,
//           style: containerStyle,
//           inputStyle,
//           height: inputHeight,
//         } = this.props;
//         const {
//           focusedAnim,
//           value,
//         } = this.state;
//         const AnimatedIcon = Animated.createAnimatedComponent(iconClass);
    
//         return (
//           <View
//             style={[styles.container, containerStyle]}
//         //    onLayout={this._onLayout}
//           >
//             <TouchableWithoutFeedback onPress={this.focus}>
//               <Animated.View
//                 style={{
//                   backgroundColor: iconBackgroundColor,
//                   justifyContent: 'center',
//                   alignItems: 'center',
//                   height: inputHeight,
//                   width: focusedAnim.interpolate({
//                     inputRange: [0, 1],
//                     outputRange: [60, 40],
//                   }),
//                 }}
//               >
//                 <AnimatedIcon
//                   name={iconName}
//                   color={iconColor}
//                   style={{
//                     fontSize: focusedAnim.interpolate({
//                       inputRange: [0, 1],
//                       outputRange: [iconSize, iconSize * 0.6],
//                     }),
//                   }}
//                 />
//               </Animated.View>
//             </TouchableWithoutFeedback>
//             <TextInput
//               ref="input"
//               {...this.props}
//               style={[styles.textInput, inputStyle]}
//               value={value}
//               onBlur={this._onBlur}
//               onChange={this._onChange}
//               onFocus={this._onFocus}
//               underlineColorAndroid={'transparent'}
//             />
//           </View>
//         );
//     }
// }


// Hideo.propTypes = {
//     /*
//      * this is applied as background color of icon
//      */
//     iconBackgroundColor: PropTypes.string,

//     /*
//      * This is the icon component you are importing from react-native-vector-icons.
//      * import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
//      * iconClass={FontAwesomeIcon}
//      */
//     iconClass: PropTypes.func.isRequired,
//     /*
//      * Passed to react-native-vector-icons library as name prop
//      */
//     iconName: PropTypes.string.isRequired,
//     /*
//      * Passed to react-native-vector-icons library as color prop
//      */
//     iconColor: PropTypes.string,
//     /*
//      * Passed to react-native-vector-icons library as size prop.
//      */
//     iconSize: PropTypes.number,
// };

// Hideo.defaultProps = {
//     iconColor: 'white',
//     iconSize: 25,
//     iconBackgroundColor: '#899dda',
//     height: 48,
//     animationDuration: 200,
// };

// const styles = StyleSheet.create({
//     container: {
//       flex: 1,
//       flexDirection: 'row',
//     },
//     textInput: {
//       flex: 1,
//       paddingHorizontal: 16,
//       paddingVertical: 0,
//       color: 'black',
//       backgroundColor: 'white',
//       fontSize: 18,
//     },
//   });
  