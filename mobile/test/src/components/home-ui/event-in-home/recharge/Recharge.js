import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions, StatusBar, TextInput, TouchableOpacity, Modal, TouchableHighlight, Alert } from 'react-native';
import Ionicons from "react-native-vector-icons/Ionicons";
const { width, height } = Dimensions.get('window');
import { Container, Header, Content, Form, Item, Input, Label, Button, Icon } from 'native-base';
import { MyKeyboard } from "./MyKeyboard"
const searchHeight = height / 13;
const moneyHeight = height / 3
class Recharge extends Component {
  constructor(props) {
    super(props);
    this.state = {
      money: "",
      modalVisible: false,
      passWord: "",
    };
  }
  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }

  setPassword(value) {
    this.setState({ passWord: value });
  }
  render() {
    const { money } = this.state;
    return (
      <View style={{ flex: 1 }}>
        {/* Top bar */}
        <View style={{
          height: 50,
          backgroundColor: "#1aa3ff",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "row"
        }}>
          <TouchableOpacity style={{ marginLeft: 7 }} onPress={() => this.props.navigation.goBack()} >
            {/* <Ionicons
              name="ios-arrow-back"
              size={35}
              color="white"
            /> */}
            <Icon type='Ionicons' name='ios-arrow-back' style={{ color: "#fafafa" }} fontSize={35} />
          </TouchableOpacity>
          <View style={{ flex: 1 }}>
            <Text style={{ textAlign: "center", color: "white", fontWeight: "500", fontSize: 18 }} >Recharge</Text>
          </View>
        </View>
        <View style={{
          height: moneyHeight,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#EDEDED"
        }}>
          <Text style={{ textAlign: "center", color: "#1565c0", fontWeight: "300", fontSize: 15, color: "#616161" }} >Số dư hiện tại</Text>
          <Text style={{ textAlign: "center", color: "#1565c0", fontWeight: "500", fontSize: 40 }} >74.500</Text>
        </View>
        <View style={{
          flex: 1,
          backgroundColor: "#ffffff"
        }} >
          <Form style={{
            marginTop: 10
          }}>
            <Item floatingLabel>
              <Label>Nhập số tiền</Label>
              <Input keyboardType={'none'} value={this.state.money} />
            </Item>
          </Form>
          <Button style={{
            width: width - 20,
            marginTop: 30,
            marginLeft: 10,
            marginRight: 10
          }} block bordered iconRight textStyle="#1aa3ff"
            onPress={() => {
              this.setModalVisible(!this.state.modalVisible);
            }}>
            <Icon type='MaterialCommunityIcons' name='verified' style={{ color: "#1565c0" }} />
            <Text style={{ color: "#1565c0" }}>Xác nhận</Text>
          </Button>
        </View>
        <View style={{
          flex: 1,
          backgroundColor: "#ffffff",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "row"
        }}>
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: "#f5f5f5" }} >
            <View style={{ flex: 1, alignSelf: 'center', flexDirection: 'row', }}>
              <TouchableOpacity style={{ width: '33%', alignItems: 'center', justifyContent: 'center' }}
                onPress={() => this.setState({ money: this.state.money + "1" })}
              ><Text style={{ color: "black" }}>1</Text></TouchableOpacity>
              <TouchableOpacity style={{ width: '33%', alignItems: 'center', justifyContent: 'center' }}
                onPress={() => this.setState({ money: this.state.money + "2" })}><Text style={{ color: "black" }}>2</Text></TouchableOpacity>
              <TouchableOpacity style={{ width: '33%', alignItems: 'center', justifyContent: 'center' }}
                onPress={() => this.setState({ money: this.state.money + "3" })}><Text style={{ color: "black" }}>3</Text></TouchableOpacity>
            </View>
            <View style={{ flex: 1, alignSelf: 'center', flexDirection: 'row' }}>
              <TouchableOpacity style={{ width: '33%', alignItems: 'center', justifyContent: 'center' }}
                onPress={() => this.setState({ money: this.state.money + "4" })}><Text style={{ color: "black" }}>4</Text></TouchableOpacity>
              <TouchableOpacity style={{ width: '33%', alignItems: 'center', justifyContent: 'center' }}
                onPress={() => this.setState({ money: this.state.money + "5" })}><Text style={{ color: "black" }}>5</Text></TouchableOpacity>
              <TouchableOpacity style={{ width: '33%', alignItems: 'center', justifyContent: 'center' }}
                onPress={() => this.setState({ money: this.state.money + "6" })}><Text style={{ color: "black" }}>6</Text></TouchableOpacity>
            </View>
            <View style={{ flex: 1, alignSelf: 'center', flexDirection: 'row' }}>
              <TouchableOpacity style={{ width: '33%', alignItems: 'center', justifyContent: 'center' }}
                onPress={() => this.setState({ money: this.state.money + "7" })}><Text style={{ color: "black" }}>7</Text></TouchableOpacity>
              <TouchableOpacity style={{ width: '33%', alignItems: 'center', justifyContent: 'center' }}
                onPress={() => this.setState({ money: this.state.money + "8" })}><Text style={{ color: "black" }}>8</Text></TouchableOpacity>
              <TouchableOpacity style={{ width: '33%', alignItems: 'center', justifyContent: 'center' }}
                onPress={() => this.setState({ money: this.state.money + "9" })}><Text style={{ color: "black" }}>9</Text></TouchableOpacity>
            </View>
            <View style={{ flex: 1, alignSelf: 'center', flexDirection: 'row' }}>
              <TouchableOpacity style={{ width: '33%', alignItems: 'center', justifyContent: 'center' }}
                onPress={() => this.setState({ money: this.state.money + "0" })}><Text style={{ color: "black" }}>0</Text></TouchableOpacity>
              <TouchableOpacity style={{ width: '33%', alignItems: 'center', justifyContent: 'center' }}
                onPress={() => this.setState({ money: this.state.money + "000" })}><Text style={{ color: "black" }}>000</Text></TouchableOpacity>
              <TouchableOpacity style={{ width: '33%', alignItems: 'center', justifyContent: 'center' }}
                onPress={() => this.setState({ money: this.state.money.substring(0, (this.state.money.length - 1)) })}
                onLongPress={() => this.setState({ money: "" })} >
                <Icon type='Ionicons' name='ios-backspace' style={{ color: "black" }} /></TouchableOpacity>
            </View>
          </View>
        </View>
        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.modalVisible}
          style={{ marginTop: 100 }}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
          }}>
          <View style={{ height: "50%", backgroundColor: 'rgba(0,0,0,0.5)' }}>

          </View>
          <View backgroundColor="#ffffff" style={{ height: "50%" }}>
            <View style={{ marginTop: 10, flexDirection: "row", alignItems: 'center', justifyContent: 'center' }}>
              <Text>Nhập mật khẩu để nạp tiền</Text>
            </View>
            <View style={{ flexDirection: "row", alignItems: 'center', justifyContent: 'center' }}>
              <View style={this.state.passWord.length >0 ? styles.circleRounded : styles.circle} />
              <View style={this.state.passWord.length >1 ? styles.circleRounded : styles.circle} />
              <View style={this.state.passWord.length >2 ? styles.circleRounded : styles.circle} />
              <View style={this.state.passWord.length >3 ? styles.circleRounded : styles.circle} />
              <View style={this.state.passWord.length >4 ? styles.circleRounded : styles.circle} />
              <View style={this.state.passWord.length >5 ? styles.circleRounded : styles.circle} />
            </View>
            <View style={{
              flex: 1,
              backgroundColor: "#ffffff",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "row"
            }}>
              <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: "#f5f5f5" }} >
                <View style={{ flex: 1, alignSelf: 'center', flexDirection: 'row', }}>
                  <TouchableOpacity style={{ width: '33%', alignItems: 'center', justifyContent: 'center' }}
                    onPress={() => {
                      this.setState({ passWord: this.state.passWord + "1" })
                    }}
                  ><Text style={{ color: "black" }}>1</Text></TouchableOpacity>
                  <TouchableOpacity style={{ width: '33%', alignItems: 'center', justifyContent: 'center' }}
                    onPress={() => this.setState({ passWord: this.state.passWord + "2" })}><Text style={{ color: "black" }}>2</Text></TouchableOpacity>
                  <TouchableOpacity style={{ width: '33%', alignItems: 'center', justifyContent: 'center' }}
                    onPress={() => this.setState({ passWord: this.state.passWord + "3" })}><Text style={{ color: "black" }}>3</Text></TouchableOpacity>
                </View>
                <View style={{ flex: 1, alignSelf: 'center', flexDirection: 'row' }}>
                  <TouchableOpacity style={{ width: '33%', alignItems: 'center', justifyContent: 'center' }}
                    onPress={() => this.setState({ passWord: this.state.passWord + "4" })}><Text style={{ color: "black" }}>4</Text></TouchableOpacity>
                  <TouchableOpacity style={{ width: '33%', alignItems: 'center', justifyContent: 'center' }}
                    onPress={() => this.setState({ passWord: this.state.passWord + "5" })}><Text style={{ color: "black" }}>5</Text></TouchableOpacity>
                  <TouchableOpacity style={{ width: '33%', alignItems: 'center', justifyContent: 'center' }}
                    onPress={() => this.setState({ passWord: this.state.passWord + "6" })}><Text style={{ color: "black" }}>6</Text></TouchableOpacity>
                </View>
                <View style={{ flex: 1, alignSelf: 'center', flexDirection: 'row' }}>
                  <TouchableOpacity style={{ width: '33%', alignItems: 'center', justifyContent: 'center' }}
                    onPress={() => this.setState({ passWord: this.state.passWord + "7" })}><Text style={{ color: "black" }}>7</Text></TouchableOpacity>
                  <TouchableOpacity style={{ width: '33%', alignItems: 'center', justifyContent: 'center' }}
                    onPress={() => this.setState({ passWord: this.state.passWord + "8" })}><Text style={{ color: "black" }}>8</Text></TouchableOpacity>
                  <TouchableOpacity style={{ width: '33%', alignItems: 'center', justifyContent: 'center' }}
                    onPress={() => this.setState({ passWord: this.state.passWord + "9" })}><Text style={{ color: "black" }}>9</Text></TouchableOpacity>
                </View>
                <View style={{ flex: 1, alignSelf: 'center', flexDirection: 'row' }}>
                  <TouchableOpacity style={{ width: '33%', alignItems: 'center', justifyContent: 'center', backgroundColor: "#e0e0e0" }}
                  onPress={() => alert(this.state.passWord.length)}>
                  </TouchableOpacity>
                  <TouchableOpacity style={{ width: '33%', alignItems: 'center', justifyContent: 'center' }}
                    onPress={() => this.setState({ passWord: this.state.passWord + "0" })}><Text style={{ color: "black" }}>0</Text></TouchableOpacity>
                  <TouchableOpacity style={{ width: '33%', alignItems: 'center', backgroundColor: "#e0e0e0", justifyContent: 'center' }}
                    onPress={() => this.setState({ passWord: this.state.passWord.substring(0, (this.state.passWord.length - 1)) })}>
                    <Icon type='Ionicons' name='ios-backspace' style={{ color: "black" }} /></TouchableOpacity>
                </View>
              </View>
            </View>

          </View>
        </Modal>

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
    borderColor: '#0d47a1',
  },
  circleRounded: {
    marginTop: 20,
    marginBottom: 20,
    marginLeft: 15,
    width: 15,
    height: 15,
    borderRadius: 100 / 2,
    backgroundColor: '#0d47a1',
    borderWidth: 1.5,
    borderColor: '#0d47a1',
  }
})
export default Recharge;