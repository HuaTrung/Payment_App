import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { View, Text, TextInput, StyleSheet, Dimensions, ViewPropTypes } from 'react-native';
import * as Animatable from 'react-native-animatable';
import _ from 'lodash';


export default class PIN extends Component {
  
  constructor(props) {
    super(props);
    
    this.state = {
      codeArr: new Array(this.props.codeLength).fill(''),
      currentIndex: 0, 
      confirm: false,
      firstPin: ""
    };
    
    this.codeInputRefs = [];

    this.shake = this.shake.bind(this);

  }

  shake () {
    return this.refs._ref.shake(650);
  }
  
  clear() {
    this.setState({
      codeArr: new Array(this.props.codeLength).fill(''),
      currentIndex: 0
    });
    this._setFocus(0);
  }
  
  _setFocus(index) {
    this.codeInputRefs[index].focus();
  }
  
  _blur(index) {
    this.codeInputRefs[index].blur();
  }
  
  _onFocus(index) {
    let newCodeArr = _.clone(this.state.codeArr);
    let currentEmptyIndex = _.findIndex(newCodeArr, c => !c);
    if (currentEmptyIndex !== -1 && currentEmptyIndex < index) {
      return this._setFocus(currentEmptyIndex);
    }
    for (let i in newCodeArr) {
      if (i >= index) {
        newCodeArr[i] = '';
      }
    }
    
    this.setState({
      codeArr: newCodeArr,
      currentIndex: index
    });
  }
  
  _getClassStyle(active) {
    let { cellBorderWidth, activeColor, inactiveColor, space } = this.props;
    let classStyle = {
      marginRight: space/2,
      marginLeft: space/2,
      color: activeColor
    };

    return _.merge(classStyle, {
      borderWidth: cellBorderWidth,
      borderColor: (active ? activeColor : inactiveColor)
    });
  }
  
  _onKeyPress(e) {
    if (e.nativeEvent.key === 'Backspace') {
      let { currentIndex } = this.state;
      let nextIndex = currentIndex > 0 ? currentIndex - 1 : 0;
      this._setFocus(nextIndex);
    }
  }
  
  _onInputCode(character, index) {
    let { codeLength, onFulfill, type } = this.props;
    let newCodeArr = _.clone(this.state.codeArr);
    newCodeArr[index] = character;
    
    if (index == codeLength - 1) { // final index
      let code = newCodeArr.join('');
      if(type == "create") { // first time
        // change to confirm and clear the past
        if(!this.state.confirm) {
          this.setState({confirm: true, firstPin: code});
          this.clear();
        } else {
          if(this.state.firstPin == code) { // =>
            onFulfill(code);
          } else {
            this.shake().then(() => this.clear());
          }
        }
      }
      //onFulfill(code); // response to user
      this._blur(this.state.currentIndex);
    } else this._setFocus(this.state.currentIndex + 1);
    
    
    this.setState(prevState => {
      return {
        codeArr: newCodeArr,
        currentIndex: prevState.currentIndex + 1
      };
    });
  }
  
  render() {
    const {
      codeLength,
      codeInputStyle,
      containerStyle,
      autoFocus,
      size,
      activeColor,
      type
    } = this.props;

    const { confirm } = this.state;
    
    const initialCodeInputStyle = {
      width: size,
      height: size
    };
    
    let codeInputs = [];
    for (let i = 0; i < codeLength; i++) {
      let id = i;
      codeInputs.push(
        <TextInput
          key={id}
          ref={ref => (this.codeInputRefs[id] = ref)}
          style={[
            styles.codeInput, 
            {
              width: size,
              height: size
            }, 
            this._getClassStyle(this.state.currentIndex == id),
            codeInputStyle
          ]}
          underlineColorAndroid="transparent"
          selectionColor={activeColor}
          keyboardType={"numeric"}
          // returnKeyType={'done'}
          {...this.props}
          autoFocus={true && id == 0}
          onFocus={() => this._onFocus(id)}
          value={this.state.codeArr[id] ? this.state.codeArr[id].toString() : ''}
          onChangeText={text => this._onInputCode(text, id)}
          onKeyPress={(e) => this._onKeyPress(e)}
          maxLength={1}
        />
      )
    }
    
    return (
      <Animatable.View  ref="_ref" style={{ flex:1, alignItems:"center", flexDirection:"column", justifyContent: 'center' }}>
        <View style = {{ alignItems:"center", justifyContent:"center" , marginTop: 10}} >
        { type == "create" && confirm == false && <Text style={styles.inputLabel2}>CREATE YOUR PIN CODE</Text> }
        { type == "create" && confirm == true && <Text style={styles.inputLabel2}>CONFIRM YOUR PIN CODE</Text> }
        { type == "check" && <Text style={styles.inputLabel2}>WHAT IS YOUR PIN CODE ?</Text> }
        </View>
        <View style={[styles.container, { justifyContent: 'center', height: size }, containerStyle]}>
          {codeInputs}
        </View>
      </Animatable.View>
    );
  }
}

const viewPropTypes = ViewPropTypes || View.propTypes;
PIN.propTypes = {
  type: PropTypes.oneOf([
    'create', 'check'
  ]),
  codeLength: PropTypes.number,
  size: PropTypes.number,
  space: PropTypes.number,
  cellBorderWidth: PropTypes.number,
  activeColor: PropTypes.string,
  inactiveColor: PropTypes.string,
  autoFocus: PropTypes.bool,
  codeInputStyle: TextInput.propTypes.style,
  containerStyle: viewPropTypes.style,
  onFulfill: PropTypes.func,
};
PIN.defaultProps = {
  codeLength: 5,
  autoFocus: true,
  size: 40,
  cellBorderWidth: 1,
  activeColor: 'rgba(255, 255, 255, 1)',
  inactiveColor: 'rgba(255, 255, 255, 0.2)',
  space: 8
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 20
  },
  codeInput: {
    backgroundColor: 'transparent',
    textAlign: 'center',
    padding: 0
  },
  inputLabel2: {
    color: '#31B404',
    fontSize: 14,
    fontWeight: '800',
    textAlign: 'center'
  }
});
